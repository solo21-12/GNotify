import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import LoginScreen from './screen/Home';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer styles={styles.container}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="G-Notify" component={LoginScreen} />
        {/* Add other screens here if needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});