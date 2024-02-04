// VehiclesScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VehiclesScreen = () => {
  const navigation = useNavigation();

  const [vehicles, setVehicles] = useState([
    { id: 1, name: 'Car A', model: 'Model X', plateNumber: 'ABC123' },
    { id: 2, name: 'Car B', model: 'Model Y', plateNumber: 'XYZ789' },
    // Add more vehicles as needed
  ]);

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
