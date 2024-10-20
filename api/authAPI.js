import { API_URL } from './config';
import * as SecureStore from 'expo-secure-store';

// Función para registrar un nuevo usuario
export const signUp = async (username, email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.msg || data.message || 'Signup failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Función para iniciar sesión
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Guardar el token de manera segura
    await SecureStore.setItemAsync('token', data.token);

    return data;
  } catch (error) {
    throw error;
  }
};

// Función para obtener el perfil del usuario autenticado
export const getUserProfile = async () => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch user profile');
    }

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
