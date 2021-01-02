// making a call to fetch user, call user, and save posts
import firebase from 'firebase'
import {USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE} from '../constants/index'
import {SnapshotViewIOSCOmponent} from 'react-native'
require('firebase/firestore')

// ------------------------------------------------------------------------------------

export function fetchUser() {
    return((dispatch) => {
        firebase.firestore()
            .collection("User")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if(snapshot.exists){
                    dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
                }
                else{
                    console.log("Snapshot Does Not Exist")
                }
            })
    })
}

export function fetchUserPosts() {
    return((dispatch) => {
        firebase.firestore()
            .collection("Posts")
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    // map function will iterate through all docs in the snapshot and build an array
                    // of posts
                    const data = doc.data();
                    const id = doc.id;
                    return {id, ...data}
                })
                dispatch({type: USER_POSTS_STATE_CHANGE, posts}) 
            })
    })
}
