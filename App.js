import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NativeAppEventEmitter, StyleSheet, Text, View } from 'react-native';

// main file that contains the routes
import {NavigationContainer} from "@react-navigation/native"; 
import {createStackNavigator} from "@react-navigation/stack"; 

import LandingScreen from './components/auth/LandingPage'

// imports packages and fucntions from firebase
import * as firebase from 'firebase'
// -------------------------------------------------------------------------------------------
// test
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANjOkbe0b8_n8Y4qIzzppjqh5xLjgMBzg",
  authDomain: "biome-dev.firebaseapp.com",
  projectId: "biome-dev",
  storageBucket: "biome-dev.appspot.com",
  messagingSenderId: "814850657790",
  appId: "1:814850657790:web:785b1a7d00ca7a022a44af",
  measurementId: "G-X0KG0VKNFG"
};

// initialize firebase project
// makes sure that no firebase instance is running at the moment
// will crash if another firebase app is running while trying to initialize
if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

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