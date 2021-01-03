// making a call to fetch user, call user, and save posts
import firebase from 'firebase'
require('firebase/firestore')

import {USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE, CLEAR_DATA} from '../constants/index'
import {SnapshotViewIOSCOmponent} from 'react-native'

// ------------------------------------------------------------------------------------

export function clearData() {
    // will delete everything from redux store 
    return ((dispatch) => {
        dispatch({type: CLEAR_DATA})
    })
}

export function fetchUser() {
    return((dispatch) => {
        firebase.firestore()
            .collection("Users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if(snapshot.exists){
                    dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
                }
                else {
                    console.log("Does Not Exist")
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

export function fetchUserFollowing() {
    return((dispatch) => {
        firebase.firestore()
            .collection("Following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .onSnapshot((snapshot) => {
                let following = snapshot.docs.map(doc => {
                    const id = doc.id;
                    return id
                })
                dispatch({type: USER_FOLLOWING_STATE_CHANGE, following});
                for (let i = 0; i < following.length; i++){
                    dispatch(fetchUsersData(followingA[i]));
                }
            })
    })
}

export function fetchUsersData(uid) {
    return((dispatch, getState) => {
        const found = getState().usersState.users.some(el => el.uid=== uid);

        if(!found) {
            firebase.firestore()
            .collection("Users")
            .doc(uid)
            .get()
            .then((snapshot) => {
                if(snapshot.exists){
                    let user = snapshot.data();
                    user.uid = snapshot.id;

                    dispatch({type: USERS_DATA_STATE_CHANGE, user})
                    dispatch(fetchUsersFollowingPosts(user.id));
                }
                else {
                    console.log("Does Not Exist")
                }
            })
        }

    })
}

export function fetchUsersFollowingPosts(uid) {
    return((dispatch, getState) => {
        firebase.firestore()
            .collection("Posts")
            .doc(uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                // value of uid gets lost due to asynchronus the moment you reach the callback function
                // this way gets the uid of the user even after the value changes after accessing the database
                const uid = snapshot.query.EP.path.segments[1]
                console.log({snapshot, uid})
                const user = getState().userState.users.find(el => el.uid === uid);

                let posts = snapshot.docs.map(doc => {
                    // map function will iterate through all docs in the snapshot and build an array
                    // of posts
                    const data = doc.data();
                    const id = doc.id;
                    return {id, ...data, user}
                })
                dispatch({type: USERS_POSTS_STATE_CHANGE, posts, uid}) 
            })
    })
}