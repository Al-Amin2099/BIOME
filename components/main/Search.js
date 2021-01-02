import React, {useState} from 'react'
import {View, Text, TextInput, FlatList} from 'react-native'

import firebase from 'firebase';
require('firebase/firestore';)
// ------------------------------------------------------------------------------------

export default function Search() {
    const [users, setUsers] = useState([])
    const fetchUsers = (search) => {
        firebase.firestore()
        .collection('users')
        .where('name', '>=', search) // will try to find documents from the user collection that is similar to what is searched
        .get()
        .then((snapshot) => {
            let users = snapshot.docs.map(doc => {
                // map function will iterate through all docs in the snapshot and build an array
                // of posts
                const data = doc.data();
                const dataID = doc.id;
                return {dataID, ...data}
            });
            setUsers(users)
        })
    }
    return (
        <View>
            <Text> Feed </Text>
        </View>
    )
}


// fetch users by similar names