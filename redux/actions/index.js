// making a call to fetch user, call user, and save posts
import firebase from 'firebase'
require('firebase/firestore')

import {USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE, USERS_LIKES_STATE_CHANGE, CLEAR_DATA} from '../constants/index'
import {SnapshotViewIOSCOmponent} from 'react-native'
require('firebase/firestore')

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
                    dispatch(fetchUsersData(followingA[i], true));
                }
            })
    })
}

export function fetchUsersData(uid, getPosts) {
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
                }
                else {
                    console.log("Does Not Exist")
                }
            })
            if(getPosts){
                dispatch(fetchUsersFollowingPosts(uid));
            }
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
                const uid = snapshot.query.EP.path.segments[1];
                const user = getState().userState.users.find(el => el.uid === uid);

                let posts = snapshot.docs.map(doc => {
                    // map function will iterate through all docs in the snapshot and build an array
                    // of posts
                    const data = doc.data();
                    const id = doc.id;
                    return {id, ...data, user}
                })

                for(let i = 0; i < posts.length; i++){
                    dispatch(fetchUsersFollowingLikes(uid, posts[i].id))
                }
                dispatch({type: USERS_POSTS_STATE_CHANGE, posts, uid}) 
            })
    })
}

export function fetchUsersFollowingLikes(uid, postId) {
    return((dispatch, getState) => {
        firebase.firestore()
            .collection("Posts")
            .doc(uid)
            .collection("userPosts")
            .doc(postId)
            .collection("Likes")
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot((snapshot) => {
                // value of uid gets lost due to asynchronus the moment you reach the callback function
                // this way gets the uid of the user even after the value changes after accessing the database
                const postId = snapshot.ZE.path.segments[3];
                
                let currentUserLike = false;
                if(snapshot.exists){
                    currentUserLike = true;
                }
                
                dispatch({type: USERS_LIKES_STATE_CHANGE, postId, currentUserLike}) 
            })
    })
}