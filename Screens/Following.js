import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getAllFollowingPosts } from '../api/followingAPI';

export default Following = ({ navigation }) => {
    const [followingPosts, setFollowingPosts] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchFollowingPosts = async () => {
          try {
            const data = await getAllFollowingPosts();
            setFollowingPosts(data);
          } catch {
            setError(error.message);
          }
        };
        
        fetchFollowingPosts();
    }, []);

    const renderAllFollowingPost = ({ item }) => (
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
          data={followingPosts}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={renderAllFollowingPost}
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
  