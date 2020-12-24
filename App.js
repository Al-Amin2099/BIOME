import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NativeAppEventEmitter, StyleSheet, Text, View } from 'react-native';

// main file that contains the routes
import {NavigationContainer} from "@react-navigation/native"; 
import {createStackNavigator} from "@react-navigation/stack"; 

import LandingScreen from './components/auth/LandingPage'


// stack navigator tag for screens
const Stack = createStackNavigator();

export default function App() {
 
  return (
    // navigation container - parent tag for all routes
    <NavigationContainer> {} 

      <Stack.Navigator initialRouteName = "Landing">

        <Stack.Screen name = "Landing" component = {LandingScreen} options = {{headerShown: false}} />

      </Stack.Navigator>

    </NavigationContainer>
    
  );
}