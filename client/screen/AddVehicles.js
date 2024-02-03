import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const AddVehicleScreen = () => {
  const navigation = useNavigation();

  const [idCounter, setIdCounter] = useState(1); // Initial ID counter
  const [vehicleData, setVehicleData] = useState({
    id: idCounter,
    vehiclePlateNumber: "",
    vehicleRenewalDate: new Date(),
    roadFundRenewalDate: new Date(),
  });

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDateType, setSelectedDateType] = useState("");

  const showDatePicker = (dateType) => {
    setDatePickerVisible(true);
    setSelectedDateType(dateType);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
    setSelectedDateType("");
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    if (date && selectedDateType) {
      setVehicleData({
        ...vehicleData,
        [selectedDateType]: date,
      });
    }
  };

  const handleAddVehicle = () => {
    // Handle logic to add the vehicle and schedule the notification
    // For demonstration purposes, we'll just display the entered data
    alert(
      `ID: ${vehicleData.id}\nVehicle Plate Number: ${vehicleData.vehiclePlateNumber}\nVehicle Renewal Date: ${vehicleData.vehicleRenewalDate}\nRoad Fund Renewal Date: ${vehicleData.roadFundRenewalDate}\nOther Document Renewal Date: ${vehicleData.otherDocumentRenewalDate}`
    );

    // Increment ID counter for the next entry
    setIdCounter((prevId) => prevId + 1);
    // Reset other data for the next entry
    setVehicleData({
      id: idCounter + 1,
      vehiclePlateNumber: "",
      vehicleRenewalDate: new Date(),
      roadFundRenewalDate: new Date(),
      otherDocumentRenewalDate: new Date(),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Vehicle</Text>


      <TextInput
        style={styles.input}
        placeholder="Vehicle Plate Number"
        value={vehicleData.vehiclePlateNumber}
        onChangeText={(text) => setVehicleData({ ...vehicleData, vehiclePlateNumber: text })}
      />

      {/* Date Input for Vehicle Renewal */}
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => showDatePicker("vehicleRenewalDate")}
      >
        <Text>Select Vehicle Renewal Date</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      {/* Add more date inputs as needed for other renewals */}
      {/* Example: Road Fund Renewal */}
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => showDatePicker("roadFundRenewalDate")}
      >
        <Text>Select Road Fund Renewal Date</Text>
      </TouchableOpacity>

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
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#ff6738",
      textAlign: "center",
      marginBottom: 20,
    },
    input: {
      height: 40,
      borderColor: "gray",
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
      marginBottom: 20,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "gray",
    },
    pickerContainer: {
      height: 40,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "gray",
      marginBottom: 20,
      overflow: "hidden", // Ensure border is visible
    },
    pickerItem: {
      fontSize: 16,
    },
    datePickerButton: {
      height: 40,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 5,
      marginBottom: 20,
      justifyContent: "center",
      padding: 10,
    },
    addButton: {
      backgroundColor: "#ff6738",
      padding: 15,
      borderRadius: 5,
      marginTop: 20,
    },
    addButtonText: {
      color: "#fff",
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
    },
  });
  

export default AddVehicleScreen;
