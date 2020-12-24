// registering a user to log in to the app

import React, { Component } from 'react'
import {View, Button, TextInput} from 'react-native'

export class Register extends Component {
    // initialize components
    constructor(props){
        super(props);

        this.state = {
            // parameters needed for new users to register
            email : '',
            password: '',
            name: ''
        }
        // binds these variables to onSignUp function
        this.onSignUp = this.onSignUp.bind(this)
    }

    // signup function, bounded to state variables
    onSignUp(){

    }

    // render is called anytime a state component changes, or component loads
    render() {
        return (
            <View>
                
                <TextInput 
                    placeholder = "name"
                    onChangeText = {(name) => this.setState({name})}
                />
                <TextInput 
                    placeholder = "email"
                    onChangeText = {(email) => this.setState({email})}
                />
                <TextInput 
                    placeholder = "password"
                    secureTextEntry = {true} // hides user text input of password
                    onChangeText = {(password) => this.setState({password})}
                />

                <Button 
                    onPress = {() => this.onSignUp()}
                    title = "Sign Up"
                
                />

            </View>
        )
    }
}

export default Register
