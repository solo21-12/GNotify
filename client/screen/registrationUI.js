import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import the new Picker

const RegistrationScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Male');

  const handleRegistration = () => {
    // You can perform registration logic here
    console.log('Registration Data:', {
      firstName,
      middleName,
      lastName,
      email,
      phone,
      gender,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Middle Name"
        value={middleName}
        onChangeText={setMiddleName}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Gender:</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(value) => setGender(value)}
        style={styles.picker}
      >
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegistration}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6738',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#ff6738',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegistrationScreen;