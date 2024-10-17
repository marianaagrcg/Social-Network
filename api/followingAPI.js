import * as SecureStore from 'expo-secure-store';

export const getAllFollowingPosts = async (page = 1, limit = 15) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await fetch(`https://social-network-v7j7.onrender.com/api/feed?page=${page}&limit=${limit}`, {
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