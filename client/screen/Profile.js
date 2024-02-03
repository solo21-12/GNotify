import React, { useState } from 'react';
import { View, Text, StyleSheet,ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [firstName, setFirstName] = useState('John');
  const [middleName, setMiddleName] = useState('Doe');
  const [lastName, setLastName] = useState('Smith');
  const [gender, setGender] = useState('Male');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');

  const handleEditProfile = () => {
    setIsEditMode(!isEditMode);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logged out');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerBackground}></View>
          <View style={styles.header}>
            <Text style={styles.fullName}>{`${firstName} ${middleName} ${lastName}`}</Text>
          </View>
        </View>

        <View style={styles.profileItems}>
          <ProfileItem icon="person" label="First Name" value={firstName} editable={isEditMode} onChangeText={setFirstName} />
          <ProfileItem icon="person" label="Middle Name" value={middleName} editable={isEditMode} onChangeText={setMiddleName} />
          <ProfileItem icon="person" label="Last Name" value={lastName} editable={isEditMode} onChangeText={setLastName} />
          <ProfileItem icon="transgender" label="Gender" value={gender} editable={isEditMode} onChangeText={setGender} />
          <ProfileItem icon="mail" label="Email" value={email} editable={isEditMode} onChangeText={setEmail} />
          <ProfileItem icon="call" label="Phone Number" value={phoneNumber} editable={isEditMode} onChangeText={setPhoneNumber} />
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.buttonText}>{isEditMode ? 'Save' : 'Edit Profile'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const ProfileItem = ({ icon, label, value, editable, onChangeText }) => {
  return (
    <View style={styles.profileItem}>
      <Ionicons name={icon} size={24} color="#2c3e50" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        {editable ? (
          <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
        ) : (
          <Text style={styles.value}>{value}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
      },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40
  },
  headerContainer: {
    position: 'relative',
    height: 120,
    marginBottom: 20,
  },
  headerBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#3498db',
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
    zIndex: -1,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  fullName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ecf0f1',
    zIndex: 1,
  },

  profileItems: {
    marginTop: 20,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Adjusted alignItems to flex-start
    marginBottom: 15,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10, // Added marginLeft to create space between icon and text
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#34495e',
  },
  input: {
    flex: 1,
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#95a5a6',
    color: '#34495e',
    paddingVertical: 8,
    minHeight: 40,
    marginBottom: 15,
  },
  buttons: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;