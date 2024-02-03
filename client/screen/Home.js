import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

const HomeScreen = ({ navigation }) => {
  const userInfo = {
    name: "John Doe",
  };

  const handleAddVehicle = () => {
    navigation.navigate("AddVehicle");
  };

  const handleViewAllVehicles = () => {
    navigation.navigate("Vehicles");
  };

  return (
    <FlatList
      data={[{ id: 1, plateNumber: "AB12345" }]} // You can add more data if needed
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
              <Text style={styles.buttonText}>Add Vehicles</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleViewAllVehicles}>
              <Text style={styles.buttonText}>Vehicles List</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleViewAllVehicles}>
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
  },
  body: {
    margin: 10,
    padding: 10,
    backgroundColor: "#ff6738",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    height: "70%",
  },
  userInfoContainer: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
  },
  userInfoText: {
    fontSize: 16,
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
  },
  buttonText: {
    color: "#000",
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
