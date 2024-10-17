import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createPost } from '../api/createPost';

export default CreatePost = ({ navigation }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'El contenido no puede estar vacío');
      return;
    }
    
    try {
      setLoading(true);
      const newPost = await createPost(content); 
      Alert.alert('Éxito', 'El post ha sido creado con éxito.');
      setContent(''); 
      navigation.goBack(); 
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al crear el post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu post aquí..."
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleCreatePost}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Publicando...' : 'Post'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: '40%',
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    textAlignVertical: 'top',  
    alignContent: 'center'
  },
  button: {
    backgroundColor: '#1E90FF', 
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    margin: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
