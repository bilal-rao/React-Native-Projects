import * as firebase from 'firebase';
import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
export default class AUTHUSER {
    static SIGNUP = 'SIGNUP';
    static SIGNIN = 'SIGNIN';
    static SIGNOUT = 'SIGNOUT';

    static signup(userObj) {
        console.log('user object when signup : ', userObj)
        return (dispatch) => {
            firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
                .then((data) => dispatch(
                    NavigationActions.navigate({ routeName: 'home' }),
                    {
                        type: AUTHUSER.SIGNUP,
                        payload: data
                    },
                    firebase.database().ref("user" + "/" + firebase.auth().currentUser.uid).set({
                        uName: userObj.uName,
                        uAddress: userObj.uAddress,
                        email: userObj.email
                    }))
                )
                .catch(function (error) {
                    // Handle Errors here.
                    var errorMessage = error.message;
                    Alert.alert(errorMessage);
                })
        }
    }
    static signin(userObj) {
        return (dispatch) => {
            firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
                .then((data) => dispatch(
                    NavigationActions.navigate({ routeName: 'home' }),
                    {
                        type: AUTHUSER.SIGNIN,
                        payload: data
                    }
                ))
                .catch(function (error) {
                    // Handle Errors here.
                    var errorMessage = error.message;
                    Alert.alert(errorMessage);
                })
        }
    }
    static signout() {
        return (dispatch) => {
            firebase.auth().signOut()
                .then((data) => dispatch(
                    NavigationActions.navigate({ routeName: 'login' }),
                    {
                        type: AUTHUSER.SIGNUP,
                        payload: data
                    }
                ))
                .catch((error) => {
                    Alert.alert(error)
                })
        }
    }
}