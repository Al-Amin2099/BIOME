import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, Image, FlatList, Button} from 'react-native'

import {connect} from 'react-redux'

import firebase from 'firebase'
require ('firebase/firestore')

// ------------------------------------------------------------------------------------

function Profile(props) {

    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState([null]);
    const [following, setFollowing] = useState(false)

    useEffect(() => {
        const {currentUser, posts} = props;
        console.log({currentUser, posts})

        if(props.route.params.uid === firebase.auth().currentUser.uid){
            setUser(currentUser)
            setUserPosts(posts)
        }
        else {
            firebase.firestore()
                .collection("Users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if(snapshot.exists){
                        setUser(snapshot.data());
                    }
                    else{
                        console.log("Snapshot Does Not Exist")
                    }
                })
            firebase.firestore()
                .collection("Posts")
                .doc(props.route.params.uid)
                .collection("userPosts")
                .orderBy("creation", "asc")
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        // map function will iterate through all docs in the snapshot and build an array
                        // of posts
                        const data = doc.data();
                        const dataID = doc.id;
                        return {dataID, ...data}
                    })
                    setUserPosts(posts)
                })
        }

        if(props.following.indexOf(props.route.params.uid) > -1) {
            setFollowing(true);
        }
        else {
            setFollowing(false);
        }

    }, [props.route.params.uid, props.following])

    // following a user function
    const onFollow = () => {
        firebase.firestore()
        .collection("Following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(props.route.params.uid)
        .set({})
    }
    // unfollow a user function
    const onUnfollow = () => {
        firebase.firestore()
        .collection("Following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(props.route.params.uid)
        .delete({})
    }

    // logout function logs users out of their account
    const onLogout = () => {
        firebase.auth().signOut();
        // user gets signed out and session token gets destroyed
    }

    if(user === null)
    {
        return <View/>
    }

    return (
        <View style = {styles.container}>
            <View styles = {styles.containerInfo}>
                <Text> {user.name} </Text> 
                <Text> {user.email} </Text>

                {props.route.params.uid !== firebase.auth().currentUser.uid ? (
                    <View>
                        {following ? (
                            <Button
                                title = "Following"
                                onPress = {() => onUnfollow()}
                            />
                        ) : 
                        (
                            <Button
                                title = "Follow"
                                onPress = {() => onFollow()}
                            />
                        )}
                    </View>
                ) :  
                <Button
                    title = "Logout"
                    onPress = {() => onLogout()}
                /> }

            </View>

            <View styles = {styles.containerGallery}>
                <FlatList 
                    numColumns = {3}
                    horizontal = {false} // will be a vertical scroll view
                    data = {userPosts}
                    renderItem = {({item}) => (
                        <View style = {styles.containerImage}>
                            <Image
                                style = {styles.image}
                                source = {{uri: item.downloadURL}}
                            />
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1
    },
    image: {
        flex: 1,
        aspectRatio: 1/1
    },
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following
})

export default connect(mapStateToProps, null)(Profile);

// adding logout function