import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet,ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const ProfileScreen = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  

  useEffect(() => {
    // Fetch user data from local storage when the component mounts
    fetchAccessToken();
  }, []);

  
  const fetchAccessToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      
      if (accessToken) {
        const [header, payload, signature] = accessToken.split('.');
        
        const decodedPayload = JSON.parse(atob(payload)); // Decode base64 payload
        
        // Use the decoded payload to access user information
        console.log('Decoded Payload:', decodedPayload);

        // Fetch additional user information using the decoded user id
        const userInfoResponse = await fetchUserInfo(decodedPayload.sub);

        if (userInfoResponse.status === 200) {
          const userInfo = userInfoResponse.data;
          // Update state with user information
          setFirstName(userInfo.firstName);
          setMiddleName(userInfo.middleName);
          setLastName(userInfo.lastName);
          setGender(userInfo.gender);
          setEmail(userInfo.email);
          setPhoneNumber(userInfo.phoneNumber);
        } else {
          console.error('Error fetching user information:', userInfoResponse.data);
        }
      } else {
        console.error('Access token not found.');
      }
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  const fetchUserInfo = async (userId, accessToken) => {
    try {
      console.log('Access Token:', accessToken);
      const ui = "fdcb7183-c0b0-4978-8c01-b89031f79cbf"
      const apiUrl = `https://localhost:7138/api/Authentication/user/${ui}`;
      const ac = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhOTI5OWJhMi05MTgzLTQ0ZjctYmE5Ny1iYzNhZjAxZTVjY2IiLCJzdWIiOiJmZGNiNzE4My1jMGIwLTQ5NzgtOGMwMS1iODkwMzFmNzljYmYiLCJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiZXhwIjoxNzA3MDc5ODA3LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTM4In0.FiSvtsYjCw0QqsWBmmvbneyjzZts9Sx5ClE6AsEvaLY"
      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${ac}`,
          'Content-Type': 'application/json',
        },
      });
  
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized: Access token may be expired or invalid.');
      } else {
        console.error('Error fetching user information:', error);
      }
      throw error;
    }
  };
  
  

  const handleEditProfile = async () => {
    // Save user data to local storage when in edit mode
    if (isEditMode) {
      const userData = {
        firstName,
        middleName,
        lastName,
        gender,
        email,
        phoneNumber,
      };

      try {
        await AsyncStorage.setItem('accessToken', JSON.stringify(userData));
        console.log('User data saved successfully');
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    }

    setIsEditMode(!isEditMode);
  };

  const handleLogout = () => {
    // Add your logout logic here
    navigation.navigate("LoginScreen");
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
    alignItems: 'flex-start', 
    marginBottom: 15,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
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