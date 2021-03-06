import {StatusBar} from 'expo-status-bar';
import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

// imports packages and fucntions from firebase
import * as firebase from 'firebase';
import 'firebase/firestore';

// importing redux and everything that requires redux
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers/index'
import thunk from 'redux-thunk'

// main file that contains the routes
import {NavigationContainer} from "@react-navigation/native"; 
import {createStackNavigator} from "@react-navigation/stack"; 

import LandingScreen from './components/auth/LandingPage'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'

import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'
import CommentsScreen from './components/main/Comments'
import { ScreenStackHeaderCenterView } from 'react-native-screens';

// -------------------------------------------------------------------------------------------

const store = createStore(rootReducer, applyMiddleware(thunk))

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

export class App extends Component {
  constructor(props){
    super()
    this.state = {
      loaded: false,
    }
  }

  // called when component actually mounts
  componentDidMount(){
    // listening for auth changes
    firebase.auth().onAuthStateChanged((user) => {
      // user not loaded and isnt logged in
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }
      else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const {loggedIn, loaded} = this.state;
    if(!loaded){
      // overides navigation container
      return(
        <View style = {{flex: 1, justifyContent: 'center'}}>
          <StatusBar
            barStyle = 'light-content'
            backgroundColor = '4f6d7a'  
          /> 
          <Text> Loading </Text>
        </View>
      )
    }

    if(!loggedIn) {
      return (
        // navigation container - parent tag for all routes
        <NavigationContainer> 
          <Stack.Navigator initialRouteName = "Landing">
            <Stack.Screen name = "Landing" component = {LandingScreen} options = {{headerShown: false}} />
            <Stack.Screen name = "Register" component = {RegisterScreen} />
            <Stack.Screen name = "Login" component = {LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        
      );
    }

    return(
      <Provider store = {store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Main">
            <Stack.Screen name = "Main" component = {MainScreen} />
            <Stack.Screen name = "Add" component = {AddScreen} navigation = {this.props.navigation} />
            <Stack.Screen name = "Save" component = {SaveScreen} navigation = {this.props.navigation} />
            <Stack.Screen name = "Comments" component = {CommentsScreen} navigation = {this.props.navigation} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )

  }
}

export default App
