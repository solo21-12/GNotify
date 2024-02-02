import React from "react";
import { TextInput, Text, StyleSheet } from "react-native";

const InputField = ({ value, onChangeText, placeholder, secureTextEntry, error }) => {
  return (
    <>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={[styles.input, { borderColor: error ? "red" : "gray" }]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
      />
    </>
  );
};

const styles = StyleSheet.create({
  errorText: {
    fontSize: 12,
    color: "red",
    textAlign: "center",
  },
  input: {
    width: "80%",
    height: 40,
    padding: 10,
    margin: 10,
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
});

export default InputField;
