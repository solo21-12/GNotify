import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const AddVehicleScreen = () => {
  const navigation = useNavigation();

  const [vehicleName, setVehicleName] = useState("");
  const [notificationType, setNotificationType] = useState("Service");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleAddVehicle = () => {
    // Handle logic to add the vehicle and schedule the notification
    // For demonstration purposes, we'll just display the entered data
    alert(
      `Vehicle: ${vehicleName}\nNotification Type: ${notificationType}\nDate: ${selectedDate}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Vehicle</Text>

      <TextInput
        style={styles.input}
        placeholder="Vehicle plate number"
        value={vehicleName}
        onChangeText={(text) => setVehicleName(text)}
      />

      <Text style={styles.label}>Select Notification Type:</Text>
      <Picker
        selectedValue={notificationType}
        onValueChange={(value) => setNotificationType(value)}
        style={styles.pickerContainer}
        itemStyle={styles.pickerItem}
      >
        <Picker.Item label="Service" value="Service" />
        <Picker.Item label="Insurance" value="Insurance" />
        {/* Add more notification types as needed */}
      </Picker>

      <Text style={styles.label}>Select Date for Notification:</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={showDatePicker}
      >
        <Text>{selectedDate.toLocaleString()}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
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
    borderColor: 'gray',
    marginBottom: 20,
    overflow: 'hidden', // Ensure border is visible
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
