import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, Image, FlatList, Button} from 'react-native'

import firebase from 'firebase'
require ('firebase/firestore')
import {connect} from 'react-redux'

// ------------------------------------------------------------------------------------

function Feed(props) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let posts = [];
        if(props.usersFollowingLoaded == props.following.length) {
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

    }, [props.usersFollowingLoaded])

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
                <Text onPress = {() => props.navigation.navigate("Comments", {postId: item.id, uid: item.user.uid})}> 
                    View Comments... 
                </Text>

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
    feed: store.userState.feed,
    usersFollowingLoaded: store.userState.users,
})

export default connect(mapStateToProps, null)(Feed);

