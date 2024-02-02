// App.js or index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screen/Home';
import VehiclesScreen from './screen/Vehicles';
import NotificationsScreen from './screen/Notification';
import AddVehicleScreen from './screen/AddVehicles';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Vehicles" component={VehiclesScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="AddVehicle" component={AddVehicleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
