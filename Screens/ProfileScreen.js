import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getUser } from '../api/userAPI';
import { getUserPosts, likePost, unlikePost, deletePost } from '../api/postAPI';
import UserAvatar from '../components/UserAvatar';
import PostItem from '../components/PostItem';
import { getUserProfile } from '../api/authAPI';

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      setLoading(true);

      const fetchUserProfile = async () => {
        try {
          // Obtener el ID del usuario actual
          const currentUser = await getUserProfile();
          if (isActive) {
            setCurrentUserId(currentUser.id);
          }

          // Obtener datos completos del usuario
          const data = await getUser(currentUser.id);
          const posts = await getUserPosts(currentUser.id);
          if (isActive) {
            setUserData(data);
            setUserPosts(posts);
          }
        } catch (error) {
          if (isActive) {
            setError(error.message);
          }
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      fetchUserProfile();

      return () => {
        isActive = false;
      };
    }, [])
  );

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
    // Estamos en el perfil del usuario actual, no es necesario navegar
  };

  const handleEdit = (post) => {
    navigation.navigate('EditPost', { post });
  };

  const handleDelete = (postId) => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePost(postId);
              setUserPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
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
          onEditPress={handleEdit}
          onDeletePress={handleDelete}
        />
      )}
      ListHeaderComponent={
        <View style={styles.profileSection}>
          <UserAvatar username={userData.username} size={70} />
          <Text style={styles.usernameLarge}>{userData.username}</Text>
          <View style={styles.followInfo}>
            <Text style={styles.followText}>Followers: {userData.follower_count}</Text>
            <Text style={styles.followText}> Following: {userData.following_count}</Text>
          </View>
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
