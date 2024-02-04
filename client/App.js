import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install '@expo/vector-icons'
import registerNNPushToken from "native-notify";
import { LogBox } from "react-native";
import { AuthProvider } from "./contexts/AuthContext";

import HomeScreen from "./screen/Home";
import VehiclesScreen from "./screen/Vehicles";
import NotificationsScreen from "./screen/Notification";
import AddVehicleScreen from "./screen/AddVehicles";
import RegistrationScreen from "./screen/RegistrationUI";
import ProfileScreen from "./screen/Profile";
import LoginScreen from "./screen/LoginUI";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "HomeScreen") {
          iconName = "home";
        } else if (route.name === "ProfileScreen") {
          iconName = "person";
        } else if (route.name === "NotificationsScreen") {
          iconName = "notifications";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarActiveTintColor="#ff6738"
    tabBarInactiveTintColor="gray"
    tabBarShowLabel={false}
    tabBarStyle={{
      position: "absolute",
      bottom: 25,
      left: "50%",
      transform: [{ translateX: -25 }],
      borderRadius: 50,
      backgroundColor: "#fff",
      padding: 15,
    }}
  >
    <Tab.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="NotificationsScreen"
      component={NotificationsScreen}
      options={{ title: "Notifications", headerShown: false }}
    />
    <Tab.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

export default function App() {
  LogBox.ignoreLogs(["new NativeEventEmitter"]);

  registerNNPushToken(19478, "49UfF0b0Eg4UDErW9b1fz7");

  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegistrationScreen"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeStack"
            component={HomeStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddVehicleScreen"
            component={AddVehicleScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VehiclesScreen"
            component={VehiclesScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
