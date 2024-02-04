import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import CustomInput from "../component/InputField";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const { dispatch } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format: abc@xyz.def");
      return;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      return;
    } else {
      setPasswordError("");
    }

    console.log("Before fetch");

    // Replace the following with actual API endpoint and credentials
    const apiUrl = "https://localhost:7138/api/Authentication/login";
    const apiCredentials = {
      email: email,
      password: password,
    };

    try {
      console.log("Before API call");
      const response = await axios.post(apiUrl, apiCredentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });


      if (response.status === 200) {
        const data = response.data;
        const accessToken = data.accessToken;
        const userId = data.userId;
        const email = data.email;

        const storedAccessToken = await AsyncStorage.getItem("accessToken");
        console.log("Stored AccessToken:", storedAccessToken);
        

        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        dispatch({
          type: "LOGIN",
          payload: { user: userId},
        });

        // alert(
        //   `Login Successful!\nUser ID: ${userId}\nAccess Token: ${accessToken}`
        // );

        // Redirect to the home screen or any other screen upon successful login
        navigation.navigate("HomeStack");
      } else {
        console.error("Invalid email or password. Please try again.");
        alert("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(`Error during login: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.image} />
      <Text style={styles.title}>Login</Text>

      <CustomInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        error={emailError}
      />

      <CustomInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        secureTextEntry
        error={passwordError}
      />

      <TouchableOpacity
        style={styles.loginScreenButton}
        onPress={handleLogin}
        underlayColor="#fff"
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        If you don't have an account.{" "}
        <TouchableOpacity onPress={() => navigation.navigate("RegistrationScreen")}>
          <Text style={styles.linkText}>Register</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    // use a linear gradient for the background color
    background: "linear-gradient(to right, #00d2ff, #3a7bd5)",
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff6738",
    textAlign: "center",
    // use a custom font for the title
    fontFamily: "Roboto",
  },
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
  loginScreenButton: {
    width: "80%",
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#ff6738",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    alignSelf: "center",
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  registerText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginTop: 30,
  },
  linkText: {
    fontSize: 16,
    color: "#ff6738",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  linkContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  loginButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default LoginScreen;
