import * as SecureStore from 'expo-secure-store';

export const createPost = async (content) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch('https://social-network-v7j7.onrender.com/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({content})
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error('Failed to post post');
    }
    return data;
  } catch (error) {
    throw error;
  }
};
