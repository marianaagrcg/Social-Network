import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { editPost } from '../api/postAPI';

export default function EditPostScreen({ route, navigation }) {
  const { post } = route.params;
  const [content, setContent] = useState(post.content);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Content cannot be empty');
      return;
    }

    setLoading(true);
    try {
      await editPost(post.id, content);
      Alert.alert('Success', 'Post updated successfully', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        value={content}
        onChangeText={setContent}
        placeholder="Edit your post..."
      />
      <Button title={loading ? 'Saving...' : 'Save'} onPress={handleSave} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textInput: {
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
});
