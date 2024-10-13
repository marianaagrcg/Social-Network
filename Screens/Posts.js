import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';

export default Posts = ({ navigation }) => {
  const [posts, setPosts] = useState([]);  
  const [error, setError] = useState(null); 

  const handlePosts = async () => {
    try {
      const response = await fetch(
        'https://social-network-v7j7.onrender.com/api/posts?page=1&limit=10',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI5LCJpYXQiOjE3Mjg4NDYxODgsImV4cCI6MTcyODg1MzM4OH0.FqXusqR74OmMsGDGcmbeGUWnZXbEz5SM46oRONzSKmY',
          },
        }
      );

      const contentType = response.headers.get('Content-Type');
      const responseBody = await response.text();  

      console.log('Response Body:', responseBody);

      if (response.ok) {
        if (contentType && contentType.includes('application/json')) {
          const data = JSON.parse(responseBody);  
          setPosts(data); 
        } else {
          setError('Unexpected response format');
        }
      } else {
        Alert.alert('Failed to fetch posts', responseBody || 'Something went wrong');
      }
    } catch (error) {
      setError('An error occurred while fetching posts.');
      console.log(error);
    }
  };

  // Llamar a handlePosts cuando el componente se monta
  useEffect(() => {
    handlePosts();
  }, []);

  // Renderizar cada post individualmente
  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.username}>{item.username}</Text>
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
          keyExtractor={(item) => item.id.toString()} // Usar el ID del post como key
          renderItem={renderPost}
        />
      )}
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
});
