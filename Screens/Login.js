import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { login } from '../api/loginAPI'; 
import * as SecureStore from 'expo-secure-store';

export default Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      Alert.alert('Login Success', `Welcome ${data.username}`);

      // Guardar el token de manera segura
      await SecureStore.setItemAsync('token', data.token);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome Back!</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password"
        secureTextEntry 
        value={password}
        onChangeText={setPassword}
      />
      
      {/* Botón de login personalizado en azul */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View>
        <Text>
          Don't have an account?{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('SignUp')}>
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    color: '#333',
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
  link: {
    marginTop: 20,
    color: 'blue',
  },
});