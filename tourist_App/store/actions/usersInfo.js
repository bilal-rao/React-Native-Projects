import * as firebase from 'firebase';
import { Alert } from 'react-native';


export default class USERINFO {
    static GETUSER = 'GETUSER';
    static getUsers() {
        let users = [];
        return (dispatch) => {
            firebase.database().ref('user').on('value', (data) => {
                let key = data.val()
                for (var a in key) {
                    console.log('key a', key[a])
                    users.push(key[a]);
                }
                dispatch({
                    type: GETUSER.getUsers,
                    payload: users
                });
            })
        }
    }
}