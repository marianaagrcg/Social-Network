// src/api/authAPI.js
import { API_URL } from './config';
import * as SecureStore from 'expo-secure-store';

export const signUp = async (username, email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al registrarse.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al iniciar sesión.');
    }

    const data = await response.json();

    // Guardar el token de manera segura
    await SecureStore.setItemAsync('token', data.token);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');

    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('No se pudo obtener el perfil del usuario.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Función para obtener el token almacenado
export const getToken = async () => {
  const token = await SecureStore.getItemAsync('token');
  return token;
};

// Función para cerrar sesión
export const logout = async () => {
  await SecureStore.deleteItemAsync('token');
};
