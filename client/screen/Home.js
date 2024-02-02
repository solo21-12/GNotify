import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  // Placeholder data
  const userInfo = {
    name: "John Doe",
    phoneNumber: "123-456-7890",
  };

  const vehicles = [
    { id: 1, plateNumber: "AB12345" },
    { id: 2, plateNumber: "CD67891" },
    { id: 3, plateNumber: "CD67891" },
    // Add more vehicles as needed
  ];

  const reminders = [
    { id: 1, text: "Reminder 1: Service due on Car A" },
    { id: 2, text: "Reminder 2: Insurance renewal for Car B" },
    // Add more reminders as needed
  ];

  const handleSetNotification = () => {
    // Implement logic to set notifications for vehicles
    navigation.navigate("AddVehicle");

  };

  const handleViewAllVehicles = () => {
    // Navigate to the AllVehiclesScreen
    navigation.navigate("Vehicles");
  };

  const renderVehicleItem = ({ item }) => (
    <View style={styles.vehicleItem}>
      <Text style={styles.notificationButtonText}>{item.plateNumber}</Text>
    </View>
  );

  const renderReminderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.reminderListButton}
      onPress={handleSetNotification}
    >
      <Text style={styles.reminderListButtonText}>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={vehicles}
      style= {styles.container}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <>
          <Image
            source={require("../assets/logo.png")}
            style={styles.image}
          />

          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoText}>Name: {userInfo.name}</Text>
            <Text style={styles.userInfoText}>
              Phone Number: {userInfo.phoneNumber}
            </Text>
          </View>
          <View style={styles.horizontalLine} />

          <TouchableOpacity
            style={styles.notificationButton}
            onPress={handleSetNotification}
          >
            <Text style={styles.notificationButtonText}>
              Set Notification for Vehicles
            </Text>
          </TouchableOpacity>

          <View style={styles.horizontalLine} />

          <Text style={styles.sectionTitle}>Vehicles List</Text>
        </>
      }
      ListFooterComponent={
        <>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={handleViewAllVehicles}
          >
            <Text style={styles.moreButtonText}>View All Vehicles</Text>
          </TouchableOpacity>

          <View style={styles.horizontalLine} />
          <View style = {styles.reminder}>
          <Text style={styles.sectionTitle}>Latest Reminders</Text>
          <FlatList
            data={reminders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderReminderItem}
          />
          </View>
        </>
      }
      renderItem={renderVehicleItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  userInfoContainer: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#808080",
  },
  userInfoText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  notificationButton: {
    backgroundColor: "#ff6738",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  notificationButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "light",
    marginBottom: 10,
  },
  vehicleItem: {
    borderWidth: 1,
    backgroundColor: "#111111",
    borderRadius: 5,
    color: "#fff",
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    margin: 10,
  },
  reminder:{
    marginBottom : 50
  },
  reminderListButton: {
    backgroundColor: "#ff6738",
    padding: 10,
    borderRadius: 5,
    height: 50,
    marginBottom: 5,
  },
  reminderListButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  moreButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  moreButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  horizontalLine: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default HomeScreen;