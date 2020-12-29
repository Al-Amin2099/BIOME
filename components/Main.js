// main.js will be the file thats called after landing, login, and register

import React, { Component } from 'react'
import {View, Text} from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// in order access fetch user function
// connect allows us to connect to redux
import {connect} from 'react-redux'
// need to bind our actions to these components
import {bindActionCreators} from 'redux'
import {fetchUser} from '../redux/actions/index'

import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'
 
// ------------------------------------------------------------------------------------

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return(null)
}

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser()
    }
    render() {
        return (
            <Tab.Navigator initialRouteName = "Feed" labeled = {false}>
                <Tab.Screen name = "Feed" component = {FeedScreen} 
                    options = {{
                        tabBarIcon: ({color, size}) => (
                            <MaterialComunityIcons name = "home" color = {color} size = {26}/>
                        )
                    }}
                />
                <Tab.Screen name = "AddContainer" component = {EmptyScreen} 
                    // listeners openup other screens
                    listeners = {({navigation}) => ({
                        tabPress: event => {
                            // prevents default action from occuring
                            event.preventDefault();
                            navigation.navigate("Add")
                        }
                    })}
                    options = {{
                        tabBarIcon: ({color, size}) => (
                            <MaterialComunityIcons name = "plus-thick" color = {color} size = {26}/>
                        )
                    }}
                />
                <Tab.Screen name = "Profile" component= {ProfileScreen} 
                    options = {{
                        tabBarIcon: ({color, size}) => (
                            <MaterialComunityIcons name = "account-circle" color = {color} size = {26}/>
                        )
                    }}
                />

            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main);
