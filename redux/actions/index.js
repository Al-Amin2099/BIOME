// making a call to fetch user, call user, and save posts
import firebase from 'firebase'
import {USER_STATE_CHANGE} from '../constants/index'

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