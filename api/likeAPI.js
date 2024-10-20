import * as SecureStore from 'expo-secure-store';

export const likePost = async (postId) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`https://social-network-v7j7.onrender.com/api/posts/${postId}/like`, {
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
    const token = await SecureStore.getItemAsync('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`https://social-network-v7j7.onrender.com/api/posts/${postId}/like`, {
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
