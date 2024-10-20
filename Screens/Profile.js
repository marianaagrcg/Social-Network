import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { userProfile } from '../api/userProfileAPI';
import { getUserPosts } from '../api/userPostsAPI';
import { getRandomColor } from '../utils/colorUtils';

export default function Profile()
{
    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>
    {
        const fetchUserProfile = async () =>
        {
            try
            {
                const data = await userProfile();
                console.log(data);
                const posts = await getUserPosts(data.id);
                setUserData(data);
                setUserPosts(posts);
                setLoading(false);
            } catch (error)
            {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

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
                <View style={styles.likesContainer}>
                    <Icon name="heart-o" size={20} color="#555" />
                    <Text style={styles.likeText}>
                        {Array.isArray(item.likes) ? item.likes.length : 0} {item.likes?.length === 1 ? 'like' : 'likes'}
                    </Text>
                </View>
                <Text style={styles.timestamp}>
                    {new Date(item.created_at).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    })}
                </Text>
            </View>
        </View>
    );

    if (loading)
    {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error)
    {
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
                        <Text style={styles.followText}> Following: {userData.following_count}</Text>
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
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
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
        justifyContent: 'space-between',
        marginTop: 10,
    },
    likeText: {
        fontSize: 14,
        color: '#555',
        marginLeft: 10,
    },
    likesContainer: {
        flexDirection: 'row',
    },
    timestamp: {
        fontSize: 12,
        color: '#888',
        marginLeft: 10,
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
