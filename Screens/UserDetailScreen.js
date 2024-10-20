import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getUser, followUser, unfollowUser } from '../api/userAPI';
import { getUserPosts, likePost, unlikePost } from '../api/postAPI';
import { getUserProfile } from '../api/authAPI';
import UserAvatar from '../components/UserAvatar';
import PostItem from '../components/PostItem';

export default function UserDetailScreen({ route, navigation }) {
  const { userId } = route.params;
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      setLoading(true);

      const fetchUserDetails = async () => {
        try {
          const currentUser = await getUserProfile();
          if (isActive) {
            setCurrentUserId(currentUser.id);
          }

          const data = await getUser(userId);
          const posts = await getUserPosts(userId);
          if (isActive) {
            setUserData(data);
            setUserPosts(posts);
            setIsFollowing(data.is_following);
          }
        } catch (error) {
          console.error(error.message);
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      fetchUserDetails();

      return () => {
        isActive = false;
      };
    }, [userId])
  );

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(userId);
        setIsFollowing(false);
        setUserData((prevData) => ({
          ...prevData,
          is_following: false,
          follower_count: +prevData.follower_count - 1, // Asegura que sea número
        }));
      } else {
        await followUser(userId);
        setIsFollowing(true);
        setUserData((prevData) => ({
          ...prevData,
          is_following: true,
          follower_count: +prevData.follower_count + 1, // Asegura que sea número
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async (postId, likes) => {
    if (!currentUserId) return;
  
    try {
      if (likes.includes(currentUserId)) {
        await unlikePost(postId);
        setUserPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? { ...post, likes: post.likes.filter((id) => id !== currentUserId) }
              : post
          )
        );
      } else {
        await likePost(postId);
        setUserPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, likes: [...post.likes, currentUserId] } : post
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleUsernamePress = (userId) => {
    // Navegar a otro perfil si se desea
    if (userId !== currentUserId) {
      navigation.push('UserDetail', { userId });
    } else {
      navigation.navigate('Profile');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!userData) {
    return <Text style={styles.errorText}>User not found</Text>;
  }

  return (
    <FlatList
      data={userPosts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PostItem
          item={item}
          onLikePress={handleLike}
          onUsernamePress={handleUsernamePress}
          currentUser={{ id: currentUserId }}
        />
      )}
      ListHeaderComponent={
        <View style={styles.profileSection}>
          <UserAvatar username={userData.username} size={70} />
          <Text style={styles.usernameLarge}>{userData.username}</Text>
          <View style={styles.followInfo}>
            <Text style={styles.followText}>Followers: {userData.follower_count}</Text>
            <Text style={styles.followText}>Following: {userData.following_count}</Text>
          </View>
          {currentUserId !== userId && (
            <TouchableOpacity
              style={[
                styles.followButton,
                { backgroundColor: isFollowing ? '#808080' : '#1DA1F2' },
              ]}
              onPress={handleFollowToggle}
            >
              <Text style={styles.followButtonText}>{isFollowing ? 'Following' : 'Follow'}</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.postsTitle}>Posts</Text>
        </View>
      }
      ListEmptyComponent={<Text style={styles.noPostsText}>No posts to display</Text>}
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
  followButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
  },
  followButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
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