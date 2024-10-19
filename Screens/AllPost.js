import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAllPosts } from '../api/allPostsAPI';
import { useFocusEffect } from '@react-navigation/native';

const getRandomColor = (username) => {
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#8e44ad', '#e67e22'];
  const charCodeSum = username.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colors[charCodeSum % colors.length];
};

export default AllPost = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // Función para obtener los posts
  const fetchPosts = async () => {
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Ejecuta fetchPosts cada vez que se vuelve a enfocar la pantalla
  useFocusEffect(
    useCallback(() => {
      fetchPosts();  // Actualiza los posts cuando la pantalla está activa
    }, [])
  );

  const renderAllPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: getRandomColor(item.username) }]}>
          <Text style={styles.avatarText}>{item.username[0].toUpperCase()}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('UserDetail', { userId: item.user_id })}>
          <Text style={styles.username}>{item.username}</Text>
        </TouchableOpacity>
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

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreatePost')}
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
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
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