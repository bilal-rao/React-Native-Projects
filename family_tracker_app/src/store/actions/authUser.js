import * as firebase from 'firebase';
import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
export default class AUTHUSER {
    static SIGNUP = 'SIGNUP';
    static SIGNIN = 'SIGNIN';
    static SIGNOUT = 'SIGNOUT';
    static UPDATEPROFILE = 'UPDATEPROFILE';

    static signup(userObj) {
        console.log('user object when signup : ', userObj)
        return (dispatch) => {
            firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
                .then(
                (data) => dispatch(
                    {
                        type: AUTHUSER.SIGNUP,
                        payload: data
                    },
                    firebase.database().ref("users" + "/" + firebase.auth().currentUser.uid).set({
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
        console.log('userObj', userObj)
        return (dispatch) => {
            firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
                .then(
                (data) => dispatch(
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
                        type: AUTHUSER.SIGNOUT,
                        payload: data
                    }
                ))
                .catch((error) => {
                    Alert.alert(error)
                })
        }
    }
    static updateProfile() {
        return (dispatch) => {
            navigator.geolocation.getCurrentPosition((success) => {
                if (success) {
                    firebase.database().ref('users' + '/' + firebase.auth().currentUser.uid).update({
                        latitude: success.coords.latitude,
                        longitude: success.coords.longitude
                    }).then(
                        (data) => dispatch({
                            type: AUTHUSER.UPDATEPROFILE,
                            payload: data
                        }))
                }
            },
                (error) => {
                    Alert.alert('error ', error.message)
                })
        }
    }
}

