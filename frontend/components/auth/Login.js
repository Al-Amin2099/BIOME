// logging in to a user's account
// similar to reistration

import React, { Component } from 'react'
import {View, Button, TextInput} from 'react-native'

import firebase from 'firebase'

// -------------------------------------------------------------------------------------------

export class Login extends Component {
    // initialize components
    constructor(props){
        super(props);

        this.state = {
            // parameters needed for users to login
            email : '',
            password: '',
        }
        // binds these variables to onSignUp function
        this.onSignUp = this.onSignUp.bind(this)
    }

    // signup function, bounded to state variables
    onSignUp(){

        // grabs variables in state variable 
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            // after getting response from firebase server
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // render is called anytime a state component changes, or component loads
    render() {
        return (
            <View>
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
                    title = "Sign In"
                />

            </View>
        )
    }
}

export default Login
