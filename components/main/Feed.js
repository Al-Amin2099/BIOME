import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, Image, FlatList, Button} from 'react-native'

import {connect} from 'react-redux'

import firebase from 'firebase'
require ('firebase/firestore')

// ------------------------------------------------------------------------------------

function Feed(props) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let posts = [];
        if(props.usersLoaded == props.following.length) {
            for (let i = 0; i < props.following.length; i++){
                const user = getState().props.users.find(el => el.uid === props.following[i]);
                if(user != imdefomed) {
                    posts = [...posts, ...user.posts]
                }
            }

            posts.sort(function(x, y) {
                return x.creation - y.creation;
            })

            setPosts(posts)
        }

    }, [props.usersLoaded])

    return (
        <View style = {styles.container}>
            <View styles = {styles.containerGallery}>
                <FlatList 
                    numColumns = {1}
                    horizontal = {false} // will be a vertical scroll view
                    data = {posts}
                    renderItem = {({item}) => (
                        <View style = {styles.containerImage}>
                            <Text style = {styles.container}> {item.user.name} </Text>
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
    following: store.userState.following,
    users: store.userState.users,
    usersLoaded: store.userState.users,
})

export default connect(mapStateToProps, null)(Feed);