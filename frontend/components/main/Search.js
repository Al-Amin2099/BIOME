import React, {useState} from 'react'
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native'

import firebase from 'firebase';
require('firebase/firestore');

// ------------------------------------------------------------------------------------

export default function Search (props) {

    const [users, setUsers] = useState([])
    
    const fetchUsers = (search) => {
        firebase.firestore()
            .collection("Users")
            .where("name", ">=", search) // will try to find documents from the user collection that is similar to what is searched
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map(doc => {
                    // map function will iterate through all docs in the snapshot and build an array
                    // of posts
                    const data = doc.data();
                    const id = doc.id;
                    return {id, ...data}
                });
                setUsers(users)
            })
    }

    return (
        <View>
            <TextInput 
                placeholder = "Search Users..."
                onChangeText = {(search) => fetchUsers(search)} 
            />
            
            <FlatList 
                numColumns = {1} // one user appears per line
                horizontal = {false}
                data = {users}
                renderItem = {({item}) => (
                    <TouchableOpacity onPres = {() => props.navigation.navigate('Profile', {uid: item.id})} >
                        <Text> {item.name} </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}
