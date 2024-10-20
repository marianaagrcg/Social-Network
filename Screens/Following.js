import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAllFollowingPosts } from '../api/followingAPI';
import { getRandomColor } from '../utils/colorUtils';


export default Following = ({ navigation }) =>
{
  const [followingPosts, setFollowingPosts] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() =>
  {
    const fetchFollowingPosts = async () =>
    {
      try
      {
        const data = await getAllFollowingPosts();
        setFollowingPosts(data);
      } catch
      {
        setError(error.message);
      }
    };

    fetchFollowingPosts();
  }, []);

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

  return (
    <FlatList
      data={followingPosts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderAllFollowingPost}
      ListHeaderComponent={(
        <Text style={styles.title}>Recent Posts</Text>
      )}

      ListEmptyComponent={() => (
        <Text style={styles.noPostsText}>No more posts</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
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
