import * as SecureStore from 'expo-secure-store';

export const follow = async (userId) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await fetch(`https://social-network-v7j7.onrender.com/api/users/${userId}/follow`, {
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

  export const unfollow = async (userId) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await fetch(`https://social-network-v7j7.onrender.com/api/users/${userId}/follow`, {
        method: 'DELETE',
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