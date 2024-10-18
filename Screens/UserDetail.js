import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getUser } from '../api/userAPI';
import { getUserPosts } from '../api/userPostsAPI';

const getRandomColor = (username) => {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#8e44ad', '#e67e22'];
    const charCodeSum = username.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charCodeSum % colors.length];
}

export default function UserDetail({ route }) {
    const { userId } = route.params;
    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);  // Posts del usuario
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const data = await getUser(userId);
                const posts = await getUserPosts(userId);  // Obtener posts
                setUserData(data);
                setUserPosts(posts);  // Guardar posts
                setLoading(false);  
            } catch (error) {
                setError(error.message);
                setLoading(false);  
            }
        };

        fetchUserDetails();
    }, [userId]);

    const renderPost = ({ item }) => (
        <View style={styles.postContainer}>
            <View style={styles.header}>
                <View style={[styles.avatar, { backgroundColor: getRandomColor(item.username) }]}>
                    <Text style={styles.avatarText}>{item.username[0].toUpperCase()}</Text>
                </View>
                <Text style={styles.username}>{item.username}</Text>
            </View>

            <Text style={styles.content}>{item.content}</Text>

            <View style={styles.footer}>
                <Icon name="heart-o" size={20} color="#555" />
                <Text style={styles.likeText}>
                    {Array.isArray(item.likes) ? item.likes.length : 0} {item.likes?.length === 1 ? 'like' : 'likes'}
                </Text>
            </View>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    const avatarBackgroundColor = userData ? getRandomColor(userData.username) : '#8e44ad';

    return (
        <FlatList
            data={userPosts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPost}
            ListHeaderComponent={(
                <View style={styles.profileSection}>
                    <View style={[styles.avatarLarge, { backgroundColor: avatarBackgroundColor }]}>
                        <Text style={styles.avatarTextLarge}>{userData.username[0].toUpperCase()}</Text>
                    </View>
                    <Text style={styles.usernameLarge}>{userData.username}</Text>
                    <View style={styles.followInfo}>
                        <Text style={styles.followText}>Followers: {userData.follower_count}</Text>
                        <Text style={styles.followText}>Following: {userData.following_count}</Text>
                    </View>
                    <Text style={styles.postsTitle}>Posts</Text>
                </View>
            )}
            ListEmptyComponent={() => (
                <Text style={styles.noPostsText}>No more posts</Text>
            )}
            contentContainerStyle={styles.flatListContent}
        />
    );
}

const styles = StyleSheet.create({
    flatListContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    profileSection: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 30,
    },
    avatarLarge: {
        width: 70,
        height: 70,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatarTextLarge: {
        color: '#fff',
        fontSize: 36,
        fontWeight: 'bold',
    },
    usernameLarge: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    followInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        marginVertical: 10,
    },
    followText: {
        fontSize: 16,
        color: '#555',
    },
    postsSection: {
        flexGrow: 1,
        width: '100%',
        marginTop: 20,
    },
    postsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
        alignSelf: 'flex-start',
        marginBottom: -10,
        marginTop: 30,
    },
    postContainer: {
        marginBottom: 10,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    avatarText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    content: {
        fontSize: 14,
        marginBottom: 10,
        color: '#333',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    likeText: {
        fontSize: 14,
        color: '#555',
        marginLeft: 5,
    },
    noPostsText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
});
