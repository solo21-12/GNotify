import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AddVehicleScreen = () => {
  const navigation = useNavigation();

  const [idCounter, setIdCounter] = useState(1); // Initial ID counter
  const [vehicleData, setVehicleData] = useState({
    id: idCounter,
    vehiclePlateNumber: "",
    vehicleRenewalDate: new Date(),
    roadFundRenewalDate: new Date(),
    otherDocumentRenewalDate: new Date(),
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

  const renderDateText = (dateType) => {
    const selectedDate = vehicleData[dateType];
    return selectedDate ? selectedDate.toLocaleDateString() : `Select ${dateType}`;
  };

  const handleAddVehicle = async () => {
    try {
      const requestData = {
        id: idCounter + 1,
        vehiclePlateNumber: vehicleData.vehiclePlateNumber,
        vehicleRenewalDate: vehicleData.vehicleRenewalDate.toISOString(),
        roadFundRenewalDate: vehicleData.roadFundRenewalDate.toISOString(),
        boloRenewalDate: vehicleData.otherDocumentRenewalDate.toISOString(),
      };
  
      const response = await fetch("https://localhost:7269/api/vehicle", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const responseData = await response.json();
  
        // Assuming your backend sends the VehicleId and other details in the response
        const { VehicleId, PlateNumber, InsuranceRenewalDate, BoloRenewalData, RoadFundRenewalData } = responseData;
  
        // Update UI or show a success message
        alert(`Vehicle added successfully!\nVehicle ID: ${VehicleId}\nPlate Number: ${PlateNumber}`);
  
        // Increment ID counter for the next entry
        setIdCounter((prevId) => prevId + 1);
  
        // Reset other data for the next entry
        setVehicleData({
          id: idCounter + 2,
          vehiclePlateNumber: "",
          vehicleRenewalDate: new Date(),
          roadFundRenewalDate: new Date(),
          otherDocumentRenewalDate: new Date(),
        });
      } else {
        // Handle error case
        alert('Failed to add vehicle. Please try again.');
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Vehicle</Text>

      <TextInput
        style={styles.input}
        placeholder="Vehicle Plate Number"
        value={vehicleData.vehiclePlateNumber}
        onChangeText={(text) =>
          setVehicleData({ ...vehicleData, vehiclePlateNumber: text })
        }
      />

      {/* Date Input for Vehicle Renewal */}
      <View style={styles.dateInputContainer}>
        <Text style={styles.label}>Insurance Last Paid Date</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => showDatePicker("vehicleRenewalDate")}
        >
          <Text>{renderDateText("vehicleRenewalDate")}</Text>
          <FontAwesome5
            name="calendar-alt"
            size={20}
            color="#000"
            style={styles.dateIcon}
          />
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      {/* Date Input for Road Fund Renewal */}
      <View style={styles.dateInputContainer}>
        <Text style={styles.label}>Road Fund Last Paid Date</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => showDatePicker("roadFundRenewalDate")}
        >
          <Text>{renderDateText("roadFundRenewalDate")}</Text>
          <FontAwesome5
            name="calendar-alt"
            size={20}
            color="#000"
            style={styles.dateIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Date Input for Other Document Renewal */}
      <View style={styles.dateInputContainer}>
        <Text style={styles.label}>Bolo Renewal Last Paid Date</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => showDatePicker("otherDocumentRenewalDate")}
        >
          <Text>{renderDateText("otherDocumentRenewalDate")}</Text>
          <FontAwesome5
            name="calendar-alt"
            size={20}
            color="#000"
            style={styles.dateIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddVehicle}>
        <Text style={styles.addButtonText}>Add Vehicle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("HomeScreen")}>
        <Text style={styles.addButtonText}> ← Get Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingTop: 50,
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
  datePickerButton: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    justifyContent: "center",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateIcon: {
    marginLeft: 10,
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
  dateInputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default AddVehicleScreen;
