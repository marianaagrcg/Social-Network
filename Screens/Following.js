import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAllFollowingPosts } from '../api/followingAPI';
import { userProfile } from '../api/userProfileAPI'; 
import { likePost, unlikePost } from '../api/likeAPI'; 

const getRandomColor = (username) => {
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#8e44ad', '#e67e22'];
  const charCodeSum = username.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colors[charCodeSum % colors.length];
};

export default Following = ({ navigation }) => {
  const [followingPosts, setFollowingPosts] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await userProfile();
        setUser(profile); 
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchFollowingPosts = async () => {
      try {
        const data = await getAllFollowingPosts();
        setFollowingPosts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserProfile(); 
    fetchFollowingPosts(); 
  }, []);

  const handleLike = async (postId, likes) => {
    if (!user) return; 

    if (likes.includes(user.id)) {
     
      try {
        await unlikePost(postId);
        const updatedPosts = followingPosts.map((post) => {
          if (post.id === postId) {
            return { ...post, likes: post.likes.filter((id) => id !== user.id) }; 
          }
          return post;
        });
        setFollowingPosts(updatedPosts);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await likePost(postId);
        const updatedPosts = followingPosts.map((post) => {
          if (post.id === postId) {
            return { ...post, likes: [...post.likes, user.id] }; 
          }
          return post;
        });
        setFollowingPosts(updatedPosts);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderAllFollowingPost = ({ item }) => (
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
          <TouchableOpacity onPress={() => handleLike(item.id, item.likes)}>
            <Icon name={item.likes.includes(user?.id) ? 'heart' : 'heart-o'} size={20} color={item.likes.includes(user?.id) ? '#e74c3c' : '#555'} />
          </TouchableOpacity>
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

  return (
    <FlatList
      data={followingPosts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderAllFollowingPost}
      ListHeaderComponent={(
        <Text style={styles.title}>Posts from Users You're Following</Text>
      )}
      ListEmptyComponent={() => (
        <Text style={styles.noPostsText}>No posts to display</Text>
      )}
      contentContainerStyle={styles.flatListContent}
    />
  );
};

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
