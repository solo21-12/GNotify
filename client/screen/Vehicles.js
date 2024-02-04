// VehiclesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const VehiclesScreen = () => {
  const navigation = useNavigation();

  const [vehicles, setVehicles] = useState([]);

  useEffect((userId) => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7269/api/UserVehicle/fdcb7183-c0b0-4978-8c01-b89031f79cbf`);
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const handleVehiclePress = (vehicle) => {
    // Navigate to the details screen or perform other actions
    // For now, display an alert with the vehicle details
    alert(`Vehicle Details:\nName: ${vehicle.name}\nModel: ${vehicle.model}\nPlate Number: ${vehicle.plateNumber}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicles</Text>
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.vehicleItem}
            onPress={() => handleVehiclePress(item)}
          >
            <Text>{item.name}</Text>
            <Text>{item.model}</Text>
            <Text>{item.plateNumber}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6738',
    textAlign: 'center',
    marginBottom: 20,
  },
  vehicleItem: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default VehiclesScreen;
