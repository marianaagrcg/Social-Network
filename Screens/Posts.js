import { View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native';
import { useState } from 'react';

export default Posts = ({ navigation }) => {

  const handlePosts = async () => {


    try {
      const response = await fetch(
        'https://social-network-v7j7.onrender.com/api/posts?page=1&limit=10',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Login Success', `Welcome ${data.username}`);
        console.log('Token:', data.token);
      } else {
        Alert.alert('Login Failed', data.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while trying to log in.');
      console.log(error);
    }



    
  };

  return(
    <View>
      <Text>
        Post
      </Text>
    </View>
  );
};