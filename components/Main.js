// main.js will be the file thats called after landing, login, and register

import React, { Component } from 'react'
import {View, Text} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// in order access fetch user function
// connect allows us to connect to redux
import {connect} from 'react-redux'
// need to bind our actions to these components
import {bindActionCreators, bindActionCreatos} from 'redux'
import {fetchUser} from '../redux/Actions/index'

import FeedScreen from './main/Feed'
import AddScreen from './main/Add'
import ProfileScreen from './main/Profile'
 
// ------------------------------------------------------------------------------------

const Tab = createBottomTabNavigator();

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser()
    }
    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen name = "Feed" component = {FeedScreen} 
                    options = {{
                        tabBarIcon: ({color, size}) => (
                            <MaterialComunityIcons name = "home" color = {color} size = {26}/>
                        )
                    }}
                />
                <Tab.Screen name = "Add" component = {AddScreen} 
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
