import React from 'react'
import {StyleSheet, View, Text, Image, FlatList} from 'react-native'

import {connect} from 'react-redux'

// ------------------------------------------------------------------------------------

function Profile(props) {
    const {currentUser, posts} = props;
    console.log({currentUser, posts})
    return (
        <View style = {styles.container}>
            <View styles = {styles.containerInfo}>
                <Text> {user.name} </Text>
                <Text> {user.email} </Text>
            </View>

            <View styles = {styles.containerGallery}>
                <FlatList 
                    numColumns = {3}
                    horizontal = {false} // will be a vertical scroll view
                    data = {posts}
                    renderItem = {({item}) => (
                        <View>
                            style = {styles.containerImage}
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
        flex: 1,
        marginTop: 40
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1/3
    },
    image: {
        flex: 1,
        aspectRatio: 1/1
    },
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts
})

export default connect(mapStateToProps, null)(Profile);