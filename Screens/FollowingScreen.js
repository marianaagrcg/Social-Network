import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getFollowingPosts, likePost, unlikePost } from '../api/postAPI';
import { getUserProfile } from '../api/authAPI';
import PostItem from '../components/PostItem';

export default function FollowingScreen({ navigation }) {
  const [followingPosts, setFollowingPosts] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        try {
          const userProfile = await getUserProfile();
          if (isActive) {
            setUser(userProfile);
          }

          const data = await getFollowingPosts();
          if (isActive) {
            setFollowingPosts(data);
          }
        } catch (error) {
          if (isActive) {
            setError(error.message);
          }
        }
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const handleLike = async (postId, likes) => {
    if (!user) return;

    try {
      if (likes.includes(user.id)) {
        await unlikePost(postId);
        setFollowingPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? { ...post, likes: post.likes.filter((id) => id !== user.id) }
              : post
          )
        );
      } else {
        await likePost(postId);
        setFollowingPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, likes: [...post.likes, user.id] } : post
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUsernamePress = (userId) => {
    navigation.navigate('UserDetail', { userId });
  };

  return (
    <FlatList
      data={followingPosts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PostItem
          item={item}
          onLikePress={handleLike}
          onUsernamePress={handleUsernamePress}
          currentUser={user}
        />
      )}
      ListHeaderComponent={<Text style={styles.title}>Posts from Users You're Following</Text>}
      ListEmptyComponent={<Text style={styles.noPostsText}>No posts to display</Text>}
      contentContainerStyle={styles.flatListContent}
    />
  );
}

// Estilos
const styles = StyleSheet.create({
  flatListContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});
