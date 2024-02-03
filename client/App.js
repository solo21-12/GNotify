import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install '@expo/vector-icons'
import registerNNPushToken from 'native-notify';
import { LogBox } from 'react-native';

import HomeScreen from "./screen/Home";
import VehiclesScreen from "./screen/Vehicles";
import NotificationsScreen from "./screen/Notification";
import AddVehicleScreen from "./screen/AddVehicles";
import RegistrationScreen from "./screen/RegistrationUI";
import ProfileScreen from "./screen/Profile";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator initialRouteName="HomeScreen">
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ headerShown: false }} // Hide the header for HomeScreen
    />
    <Stack.Screen
      name="VehiclesScreen"
      component={VehiclesScreen}
      options={{ title: "Vehicles" }}
    />
    <Stack.Screen
      name="NotificationsScreen"
      component={NotificationsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AddVehicleScreen"
      component={AddVehicleScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);


export default function App(){
LogBox.ignoreLogs(['new NativeEventEmitter']);

registerNNPushToken(19478, '49UfF0b0Eg4UDErW9b1fz7');
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            } else if (route.name === 'Notifications') {
              iconName = 'notifications'; // Add this line for the notifications icon
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarActiveTintColor="#ff6738"
        tabBarInactiveTintColor="gray"
        tabBarShowLabel={false}
        tabBarStyle={{
          position: 'absolute',
          bottom: 25,
          left: '50%',
          transform: [{ translateX: -25 }],
          borderRadius: 50,
          backgroundColor: '#fff',
          padding: 15,
        }}
      >
        <Tab.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={HomeStack}
        />
        <Tab.Screen
          options={{
            headerShown: false,
          }}
          name="Notifications"
          component={NotificationsScreen} // Replace with your actual Notifications screen component
        />
        <Tab.Screen
          options={{
            headerShown: false,
          }}
          name="Profile"
          component={ProfileScreen}
        />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
};

