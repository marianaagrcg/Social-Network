// src/api/userAPI.js
import { API_URL } from './config';
import { getToken } from './authAPI';

// Función para obtener la información de un usuario (de userAPI.js)
export const getUser = async (userId) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch user');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// Funciones para seguir y dejar de seguir a un usuario (de followAPI.js)
export const followUser = async (userId) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/users/${userId}/follow`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error('Failed to follow user');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const unfollowUser = async (userId) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/users/${userId}/follow`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error('Failed to unfollow user');
    }

    return data;
  } catch (error) {
    throw error;
  }
};
