import { API_URL } from './config';
import { getToken } from './authAPI';

// Función para obtener todos los posts
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

// Función para crear un nuevo post
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

// Función para editar un post
export const editPost = async (postId, content) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to edit post');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// Función para borrar un post
export const deletePost = async (postId) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete post');
    }

    return { message: 'Post deleted successfully.' };
  } catch (error) {
    throw error;
  }
};

// Funciones para dar like y unlike a un post
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

// Función para obtener los posts de los usuarios que sigues
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

// Función para obtener los posts de un usuario específico
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
