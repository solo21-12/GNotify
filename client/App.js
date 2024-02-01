import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    // Email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation for empty fields
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format: abc@xyz.def');
      return;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    } else {
      setPasswordError('');
    }

    // Dummy data for demonstration
    const dummyEmail = 'user@example.com';
    const dummyPassword = 'password123';

    if (email === dummyEmail && password === dummyPassword) {
      // Redirect to the home screen or any other screen upon successful login
      alert('correct email or password. next page is under development');
    } else {
      // Handle login error, display a message to the user, etc.
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.image} />
      <Text style={styles.title}>Login</Text>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={[styles.input, { borderColor: emailError ? 'red' : 'gray' }]}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <TextInput
        style={[styles.input, { borderColor: passwordError ? 'red' : 'gray' }]}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <View style={styles.button}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      <Text style={styles.registerText}>
        If you don't have an account.{' '}
        <TouchableOpacity onPress={() => alert('Redirect to Register page')}>
          <Text style={styles.linkText}>Register</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: '#ff5400',
    width: 250,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  registerText: {
    marginTop: 20,
    fontSize: 16,
  },
  linkText: {
    color: '#3498db', // You can choose your desired link color
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
