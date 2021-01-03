import React from 'react'
import {View, Button } from 'react-native'

// revieves a prop (argument/parameter)
export default function LandingPage({navigation}) {
    return (
        <View style = {{flex: 1, justifyContent: 'center'}}>
            <Button 
                title = "Register"
                onPress = {() => navigation.navigate("Register")}
            />
            <Button 
                title = "Login"
                onPress = {() => navigation.navigate("Login")}
            />

        </View>
    )
}
