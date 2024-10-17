import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { getUser } from '../api/userAPI';

export default function UserDetail({ route }) {
    const { userId } = route.params;
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const data = await getUser(userId);
                setUserData(data);
                setLoading(false);  
            } catch {
                setError(error.message);
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
