import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

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

  return (
    <FlatList
      data={[{ id: 1, plateNumber: "AB12345" }]}
      style={styles.container}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <>
          <Image source={require("../assets/logo.png")} style={styles.image} />
          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoText}>Welcome {userInfo.name}!</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.body}>
            <TouchableOpacity style={styles.button} onPress={handleAddVehicle}>
              <Text style={styles.buttonText}>Add Vehicle</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleViewAllVehicles}>
              <Text style={styles.buttonText}>View Vehicles</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleNotificationPress}>
              <Text style={styles.buttonText}>Notifications</Text>
            </TouchableOpacity>
          </View>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    padding : 20,
    width: "100%",
    marginTop: 100
  },
  body: {
    margin: 10,
    padding: 10,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfoContainer: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
  },
  userInfoText: {
    fontSize: 18,
    color: "#000",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: "#007bff",
    textAlign: "center",
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    margin: 10,
  },
  horizontalLine: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default HomeScreen;