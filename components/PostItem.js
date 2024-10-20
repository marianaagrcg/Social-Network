import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import UserAvatar from './UserAvatar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { formatTimestamp } from '../utils/timeFormatter';

const PostItem = ({ item, onLikePress, onUsernamePress, currentUser, onEditPress, onDeletePress }) => {
  const hasLiked = item.likes.includes(currentUser?.id);
  const isCurrentUserPost = item.user_id === currentUser?.id;

  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <UserAvatar username={item.username} />
        <TouchableOpacity onPress={() => onUsernamePress(item.user_id)}>
          <Text style={styles.username}>{item.username}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.content}>{item.content}</Text>

      <View style={styles.footer}>
        <View style={styles.likesContainer}>
          <TouchableOpacity onPress={() => onLikePress(item.id, item.likes)}>
            <Icon name={hasLiked ? 'heart' : 'heart-o'} size={20} color={hasLiked ? '#e74c3c' : '#555'} />
          </TouchableOpacity>
          <Text style={styles.likeText}>
            {item.likes.length} {item.likes.length === 1 ? 'like' : 'likes'}
          </Text>
        </View>
        <Text style={styles.timestamp}>{formatTimestamp(item.created_at)}</Text>
      </View>

      {isCurrentUserPost && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => onEditPress(item)}>
            <Icon name="edit" size={20} color="#555" style={styles.actionIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDeletePress(item.id)}>
            <Icon name="trash" size={20} color="#e74c3c" style={styles.actionIcon} />
          </TouchableOpacity>
        </View>
      )}
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
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 10,
    },
    actionIcon: {
      marginHorizontal: 10,
    },
  
  });

export default PostItem;
