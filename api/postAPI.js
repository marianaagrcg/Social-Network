// src/api/postAPI.js
import { API_URL } from './config';
import { getToken } from './authAPI';

// Función para obtener todos los posts (de allPostsAPI.js)
export const getAllPosts = async (page = 1, limit = 15) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/posts?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Función para crear un nuevo post (de createPost.js)
export const createPost = async (content) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// Funciones para dar like y unlike a un post (de likeAPI.js)
export const likePost = async (postId) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/posts/${postId}/like`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error('Failed to like post');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const unlikePost = async (postId) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/posts/${postId}/like`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error('Failed to unlike post');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Función para obtener los posts de los usuarios que sigues (de following.js)
export const getFollowingPosts = async (page = 1, limit = 15) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/feed?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error('Failed to fetch following posts');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Función para obtener los posts de un usuario específico (de userPostsAPI.js)
export const getUserPosts = async (userId, page = 1, limit = 15) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/users/${userId}/posts?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error('Failed to fetch user posts');
    }

    return data;
  } catch (error) {
    throw error;
  }
};
