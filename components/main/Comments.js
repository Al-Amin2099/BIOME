import React, {useState, useEffect} from 'react'
import {View, Text, FlatList, Button, TextInput} from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')

// -------------------------------------------------------------------------------------------

export default function Comments(props) {
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState("")
    const [text, setText] = useState("")

    useEffect(() => {
        if(props.route.params.postId !== postId) {
            firebase.firestore()
                .collection("Posts")
                .doc(props.route.params.uid)
                .collection("userPosts")
                .doc(props.route.params.postId)
                .collection("Comments")
                .get()
                .then((snapshot) => {
                    let comments = snapshot.docs.map(doc => {
                        const data = dpc.data();
                        const id = doc.id;
                        return {id, ...data}
                    })
                    setComments(comments)
                })

            setPostId(props.route.params.postId)
        }

    }, [props.route.params.postId])

    return (
        <View>
            <FlatList
                numColumns = {1}
                horizontal = {false}
                data = {comments}
                renderItem = {({item}) => (
                    <View>
                        <Text> {item.text} </Text>
                    </View>
                )}
            />    
        </View>
    )
}
