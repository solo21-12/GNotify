import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install '@expo/vector-icons'

import HomeScreen from './screen/Home';
import VehiclesScreen from './screen/Vehicles';
import NotificationsScreen from './screen/Notification';
import AddVehicleScreen from './screen/AddVehicles';
import RegistrationScreen from './screen/RegistrationUI'; 

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
      options={{ title: 'Vehicles' }} 
    />
    <Stack.Screen
      name="NotificationsScreen"
      component={NotificationsScreen}
      options={{ headerShown:false }} 
    />
    <Stack.Screen
      name="AddVehicleScreen"
      component={AddVehicleScreen}
      options={{ headerShown:false }}
    />
  </Stack.Navigator>
);



const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;

      if (route.name === 'HomeScreen') {
        iconName = 'home';
      } else if (route.name === 'Profile') {
        iconName = 'person';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}
  tabBarOptions={{
    activeTintColor: '#ff6738',
    inactiveTintColor: 'gray',
    labelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    style: {
      backgroundColor: '#fff',
      borderTopWidth: 0,
      elevation: 5, 
    },
   
  }}
>
  <Tab.Screen options={{
            headerShown: false 
          }} name="HomeScreen" component={HomeStack} />
  <Tab.Screen options={{
            headerShown: false 
          }} name="Profile" component={RegistrationScreen} />
</Tab.Navigator>

    </NavigationContainer>
  );
};

export default App;
