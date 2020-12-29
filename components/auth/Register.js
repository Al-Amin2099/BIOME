// registering a user to log in to the app

import React, { Component } from 'react'
import {View, Button, TextInput} from 'react-native'

import firebase from 'firebase'

// -------------------------------------------------------------------------------------------

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

        // grabs variables in state variable 
        const {email, password, name} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            // after getting response from firebase server
            .then((result) => {
                // create user in firebase firestore database
                firebase.firestore().collection("Users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name, 
                        email})
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
