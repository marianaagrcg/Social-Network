import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserDetail({ route }) {
    const { userId } = route.params;
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    Alert.alert('Error', 'No token found');
                    return;
                }
                const response = await fetch(`https://social-network-v7j7.onrender.com/api/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setUserData(data); // Set the user data state
                } else {
                    setError('Failed to load user details.');
                }
            } catch (error) {
                setError('An error occurred while fetching user details.');
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            {userData ? (
                <>
                    <Text style={styles.username}>Username: {userData.username}</Text>
                    <Text>Follower Count: {userData.follower_count}</Text>
                    <Text>Following Count: {userData.following_count}</Text>
                    <Text>Is Following: {userData.is_following ? 'Yes' : 'No'}</Text>
                </>
            ) : (
                <Text>No user data available</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
    },
});
