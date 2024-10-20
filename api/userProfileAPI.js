import * as SecureStore from 'expo-secure-store';

export const userProfile = async () => {
    try {
        const token = await SecureStore.getItemAsync('token');
        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch('https://social-network-v7j7.onrender.com/api/users/me', {
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
