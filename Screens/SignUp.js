import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

export default SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(''); 

  const handleSignUp = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(
        'https://social-network-v7j7.onrender.com/api/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Mostrar mensaje de éxito
        setSuccessMessage('Signup successful! Please login');
        console.log('Token:', data.token);
        // Después de mostrar el mensaje, podrías navegar al login
        navigation.navigate('Login');
      } else {
        // Mostrar el mensaje de error recibido desde el servidor
        if (data.errors && data.errors.length > 0) {
          setErrorMessage(data.errors[0].msg); // Muestra el primer error de validación
        } else {
          setErrorMessage(data.message || 'Something went wrong');
        }
      }
    } catch (error) {
      setErrorMessage('An error occurred while creating the account.');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
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
      
      {/* Mostrar mensaje de error en rojo si existe */}
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {/* Mostrar mensaje de éxito en verde si existe */}
      {successMessage ? (
        <Text style={styles.successText}>{successMessage}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
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
    backgroundColor: '#46a65e', // Color de fondo del botón
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    margin: 12,
  },
  buttonText: {
    color: '#fff', // Color del texto del botón
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  successText: {
    color: 'green', 
    marginBottom: 10,
    textAlign: 'center',
  },
});
