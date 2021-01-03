import React, {useState, useEffect} from 'react'
import {View, Text, FlatList, Button, TextInput} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchUsersData} from '../../redux/actions/index'

import firebase from 'firebase'
require('firebase/firestore')

// -------------------------------------------------------------------------------------------

function Comments(props) {
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState("")
    const [text, setText] = useState("")

    useEffect(() => {

        function matchUserToComment (comments) {
            for(let i = 0; i < comments.length; i++) {
                if(comments[i].hasOwnProperty('user')){
                    continue;
                }

                const user = props.user.find(x => x.uid === comments[i].creator)
                
                if(user == undefined) {
                    props.fetchUsersData(comments[i].creator, false)
                }
                else {
                    comments[i].user = user
                }
            }
            setComments(comments)
        }

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
                    matchUserToComment(comments)
                })

            setPostId(props.route.params.postId)
        }
        else {
            matchUserToComment(comments)
        }

    }, [props.route.params.postId, props.users])

    const onCommentSend = () => {
        firebase.firestore()
            .collection("Posts")
            .doc(props.route.params.uid)
            .collection("userPosts")
            .doc(props.route.params.postId)
            .collection("Comments")
            .add({
                creator: firebase.auth().currentUser.uid,
                text
            })
    }

    return (
        <View>
            <FlatList
                numColumns = {1}
                horizontal = {false}
                data = {comments}
                renderItem = {({ item }) => (
                    <View>
                        {item.user !== undefined ?
                            <Text > 
                                {item.user.name}
                            </Text>
                        : null }
                        <Text> {item.text} </Text>
                    </View>
                )}
            /> 

            <View>
                <TextInput
                    placeholder = "Comment..."
                    onChangeText = {(text) => setText(text)}
                />

                <Button 
                    onPress = {() => onCommentSend()}
                    title = "Send"    
                />


            </View>

        </View>
    )
}

const mapStateToProps = (store) => ({
    users: store.userState.users
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUsersData}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Comments);


// saving a comment on firestore 