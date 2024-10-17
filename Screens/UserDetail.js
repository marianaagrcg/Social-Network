import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { getUser } from '../api/userAPI';

const getRandomColor = (username) => {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#8e44ad', '#e67e22'];
    const charCodeSum = username.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charCodeSum % colors.length];
}

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

    const avatarBackgroundColor = userData ? getRandomColor(userData.username) : '#8e44ad';

    return (
        <View style={styles.container}>
            {userData ? (
                <View style = {styles.profileSection}>
                        <View style={[styles.avatar, { backgroundColor: avatarBackgroundColor }]}>
                            <Text style={styles.avatarText}>{userData.username[0].toUpperCase()}</Text>
                        </View>
                    <Text style={styles.username}>{userData.username}</Text>
                    <View style={styles.followInfo}>
                            <Text style={styles.followText}>Followers: {userData.follower_count}</Text>
                            <Text style={styles.followText}>Following: {userData.following_count}</Text>
                    </View>
                    {/* <Text>Is Following: {userData.is_following ? 'Yes' : 'No'}</Text> */}

                    <View style={styles.postsSection}>
                        <Text style={styles.postsTitle}>Posts</Text>
                    </View>
                </View>
            ) : (
                <Text>No user data available</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    profileSection: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar:{
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatarText: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
    },
    followInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        paddingHorizontal: 20,
    },
    followText: {
        fontSize: 16,
        color: '#555',
    },
    postsSection: {
        width: '100%',
        marginTop: 30,
    },
    postsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'flex-start',
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
