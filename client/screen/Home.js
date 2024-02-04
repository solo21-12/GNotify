import React, { useState } from "react";
import { View, Text,Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons'; // Make sure to install '@expo/vector-icons'

const HomeScreen = ({ navigation }) => {
  const userInfo = {
    name: "John Doe",
  };

  const handleAddVehicle = () => {
    navigation.navigate("AddVehicleScreen");
  };

  const handleViewAllVehicles = () => {
    navigation.navigate("VehiclesScreen");
  };

  const handleNotificationPress = () => {
    navigation.navigate("NotificationsScreen");
  };

  const handleVehiclePress = (vehicleId) => {
    // You can navigate to a specific screen with the vehicle details using the vehicleId
    console.log("Pressed on vehicle with ID:", vehicleId);
  };

  const handleDeadlinePress = (deadlineId) => {
    // You can navigate to a specific screen with the deadline details using the deadlineId
    console.log("Pressed on deadline with ID:", deadlineId);
  };

  const [vehiclesColumns, setVehiclesColumns] = useState(2);
  const [deadlinesColumns, setDeadlinesColumns] = useState(1);

  // Dummy data for the vehicle list
  const vehicleData = [
    { id: 1, plateNumber: "AB12345" },
    { id: 2, plateNumber: "CD67890" },
    { id: 3, plateNumber: "EF11223" },
    { id: 4, plateNumber: "GH44556" },
    { id: 5, plateNumber: "GH44556" },
  ];

  const filteredVehicleData = vehicleData.slice(0, 4);
  // Dummy data for the deadline list
  const deadlineData = [
    { id: 1, deadline: "2024-02-10" },
    { id: 2, deadline: "2024-02-15" },
    { id: 3, deadline: "2024-02-20" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.userInfoText}> {userInfo.name}!</Text>
      </View>

      {/* Section: Vehicles List */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Vehicles</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddVehicle}>
          <AntDesign name="plus" size={24} color="#007bff" />
        </TouchableOpacity>

        {/* Render up to 4 vehicles */}
        <FlatList
          data={filteredVehicleData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.vehicleItem}
              onPress={() => handleVehiclePress(item.id)}
            >
              <Text style={styles.vehicleItemText}>{item.plateNumber}</Text>
            </TouchableOpacity>
          )}
          numColumns={vehiclesColumns}
          key={vehiclesColumns} // Force re-render when changing columns
        />

        {/* Navigation link to Vehicles page if there are more than 4 vehicles */}
        {vehicleData.length > 4 && (
          <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllVehicles}>
            <Text style={styles.viewAllButtonText}>View All</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Section: Latest Deadlines */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Latest Deadlines</Text>
        {/* Render 1 deadline per row */}
        <FlatList
          data={deadlineData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.deadlineItem}
              onPress={() => handleDeadlinePress(item.id)}
            >
              <Text style={styles.deadlineItemText}>{item.deadline}</Text>
            </TouchableOpacity>
          )}
          numColumns={deadlinesColumns}
          key={deadlinesColumns} // Force re-render when changing columns
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff", // Background Color
    paddingTop: 50,
    width: "100%",
  },
  userInfoContainer: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row", 
    alignItems: "center",
  },
  logo : {
    width: 60,
    height:60
  },
  userInfoText: {
    fontSize: 18,
    color: "#333333", // Text Color
    marginBottom: 10,
  },
  sectionContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007bff", // Primary Color
  },
  addButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  vehicleItem: {
    backgroundColor: "#007bff", // Primary Color
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    flex: 1,
    margin: 5,
  },
  vehicleItemText: {
    color: "#ffffff", // Text Color
  },
  viewAllButton: {
    marginTop: 10,
  },
  viewAllButtonText: {
    color: "#007bff", // Primary Color
    fontSize: 16,
    fontWeight: "bold",
  },
  deadlineItem: {
    backgroundColor: "#ff6738", // Secondary Color
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  deadlineItemText: {
    color: "#ffffff", // Text Color
  },
});

export default HomeScreen;