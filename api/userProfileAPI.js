import * as SecureStore from 'expo-secure-store';

export const userProfile = async () => {
    try {
        // Obtener el token de autenticación
        const token = await SecureStore.getItemAsync('token');
        if (!token) {
            throw new Error('No token found');
        }

        // Primera llamada para obtener el ID del usuario
        const responseMe = await fetch('https://social-network-v7j7.onrender.com/api/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const userData = await responseMe.json();
        if (!responseMe.ok) {
            throw new Error(userData.message || 'Failed to fetch user data');
        }

        // Ahora que tenemos el ID del usuario, hacemos otra llamada para obtener más detalles
        const userId = userData.id; // Obtener el ID del usuario

        const responseUserProfile = await fetch(`https://social-network-v7j7.onrender.com/api/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const userProfileData = await responseUserProfile.json();
        if (!responseUserProfile.ok) {
            throw new Error(userProfileData.message || 'Failed to fetch user profile');
        }

        return userProfileData;
    } catch (error) {
        throw error;
    }
};
