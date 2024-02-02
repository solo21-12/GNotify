// AddVehicleScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, DatePickerIOS } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddVehicleScreen = () => {
  const navigation = useNavigation();

  const [vehicleName, setVehicleName] = useState('');
  const [notificationType, setNotificationType] = useState('Service'); // Default to Service
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddVehicle = () => {
    // Handle logic to add the vehicle and schedule the notification
    // For demonstration purposes, we'll just display the entered data
    alert(`Vehicle: ${vehicleName}\nNotification Type: ${notificationType}\nDate: ${selectedDate}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Vehicle</Text>

      <TextInput
        style={styles.input}
        placeholder="Vehicle Name"
        value={vehicleName}
        onChangeText={(text) => setVehicleName(text)}
      />

      <Text style={styles.label}>Select Notification Type:</Text>
      <TouchableOpacity
        style={styles.notificationTypeButton}
        onPress={() => {
          // Toggle between Service and Insurance for simplicity
          setNotificationType(notificationType === 'Service' ? 'Insurance' : 'Service');
        }}
      >
        <Text style={styles.notificationTypeButtonText}>{notificationType}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Select Date for Notification:</Text>
      <DatePickerIOS
        date={selectedDate}
        onDateChange={(date) => setSelectedDate(date)}
        mode="datetime"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddVehicle}>
        <Text style={styles.addButtonText}>Add Vehicle</Text>
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
  notificationTypeButton: {
    backgroundColor: '#ff6738',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  notificationTypeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#ff6738',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddVehicleScreen;
