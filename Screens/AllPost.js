import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getAllPosts } from '../api/allPostsAPI'; 

export default AllPost = ({ navigation }) => {  
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPosts();
  }, []);

  const renderAllPost = ({ item }) => (
    <View style={styles.postContainer}>
      <TouchableOpacity  onPress={() => navigation.navigate('UserDetail', { userId: item.user_id })}>
        <Text style={styles.username}>{item.username}</Text>
      </TouchableOpacity>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.timestamp}>{new Date(item.created_at).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Posts</Text>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={renderAllPost}
        />
      )}

      {/* Botón para crear un nuevo post */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreatePost')}  // Usa navigation prop
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  postContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  }, 
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
