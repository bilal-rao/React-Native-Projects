import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

export default class ADDGROUP {
    static ADDCIRCLE = 'ADDCIRCLE';
    static FETCHCIRCLE = 'FETCHCIRCLE';
    static MATCHKEY = 'MATCHKEY';
    static FETCHMEMBERS = "FETCHMEMBERS";
    static GENERATEKEY = "GENERATEKEY";


    static addCircle(circleName) {
        return (dispatch) => {
            // var a = false;
            var arr = []
            var db = firebase.auth().currentUser.uid;
            var key = firebase.database().ref('Circle/').push().key;
            let circle = {
                circleName: circleName,
                admin: db,
                postKey: key,
            }
            //working for checking in  database that there should no same cricle name exists..
            firebase.database().ref('Circle/').orderByChild('admin').equalTo(firebase.auth().currentUser.uid).once('value', function (snap) {
                var obj = snap.val();
                firebase.database().ref('Circle/').orderByChild('circleName').equalTo(circleName).once('value', function (snap) {
                    var object = snap.val();
                    console.log(object);
                    if (object) {
                       alert('already Created with this name')
                    }
                    else {
                        firebase.database().ref('Circle/' + key).set(circle).then(
                            firebase.database().ref('Circle/' + key + '/members').push({ uid: db }).then(
                                () => dispatch(NavigationActions.navigate({ routeName: 'groupList' }))
                            ),
                            (data) => (
                                dispatch
                                    (
                                    {
                                        type: ADDGROUP.ADDCIRCLE,
                                        payload: data
                                    },
                                )
                            ))
                    }
                })
            })

        }
    }
    static fetchCircle() {
        return (dispatch) => {
            var finalArray = [];
            firebase.database().ref('Circle').on('value', function (snap) {
                var obj = snap.val();
                var uperArray = [];
                //    var lowerArray = [];LowerArray => globally declare isse kam expected nhi horha tha                
                for (let key in obj) {
                    uperArray.push(obj[key])
                }
                uperArray.map((data, index) => {
                    var obj1 = data.members;
                    var lowerArray = [];//LowerArray => locally declare to reslove error
                    for (let key in obj1) {
                        lowerArray.push(obj1[key].uid)
                    }
                    lowerArray.map((data) => {
                        if (data === firebase.auth().currentUser.uid) {
                            finalArray.push(uperArray[index].circleName)
                        }
                    })
                })
                dispatch({
                    type: ADDGROUP.FETCHCIRCLE,
                    payload: finalArray
                })
            })
        }
    }
    static matchKey(randomkey) {
        var arr = [];
        var array = [];
        var checkExist = [];
        var key = [];
        var data = [];
        return (dispatch) => {
            firebase.database().ref('Circle/').on('value', function (snap) {
                var obj = snap.val();
                for (let key in obj) {
                    arr.push(key);
                }
            });
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].match(randomkey)) {
                    key = arr[i];
                    firebase.database().ref('Circle/' + key + '/members').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).once('value', function (snap) {
                        checkExist = snap.val();
                    })
                }
            }
            checkExist ? alert('you are already a member')
                :
                (
                    firebase.database().ref('Circle/' + key + '/members').push({ uid: firebase.auth().currentUser.uid }).then(
                        () => dispatch(NavigationActions.navigate({ routeName: 'membersList' }))
                    )
                )
            firebase.database().ref('Circle/' + key + '/members').on('value', function (snap) {
                var userData = snap.val();
                for (let key in userData) {
                    array.push(userData[key])
                }
            })
            for (var i = 0; i < array.length; i++) {
                firebase.database().ref('users/' + array[i].uid).on('value', function (snap) {
                    var obj = snap.val();
                    data.push(obj)
                })
            }

            setTimeout(function () {
                dispatch(
                    {
                        type: ADDGROUP.MATCHKEY,
                        payload: data
                    }
                )
            }, 1000)
        }
    }
    static fetchMembers(i) {
        var array = [];
        var data = [];
        var finalArr = [];
        var admin = [];
        var adminName = [];
        return (dispatch) => {
            firebase.database().ref('Circle').on('value', function (snap) {
                var obj = snap.val();
                for (let key in obj) {
                    array.push(obj[key])
                }
                data.push(array[i])
                // working for admin name
                admin.push(array[i])
                firebase.database().ref('users/' + admin[0].admin).on('value', function (snap) {
                    adminName.push(snap.val())
                })
            })
            var list = []
            var obj = data[0].members;
            for (let key in obj) {
                list.push(obj[key])
            }
            for (var j = 0; j < list.length; j++) {
                firebase.database().ref('users/' + list[j].uid).on('value', function (snap) {
                    finalArr.push(snap.val())
                })
            }
            //fetching group Admin
            //    setTimeout(function(){ console.log(adminName[0].uName)},1000)
            setTimeout(function () {
                dispatch({
                    type: ADDGROUP.FETCHMEMBERS,
                    payload: finalArr,
                    adminName: adminName[0].uName ? adminName[0].uName : ""
                })
            }, 2000)
        }
    }
    static generateKey() {
        var array = [];
        return (dispatch) => {
            firebase.database().ref('Circle/').on('value', function (snap) {
                var obj = snap.val();
                for (let key in obj) {
                    array.push(obj[key])
                }
                setTimeout(function () {
                    dispatch({
                        type: ADDGROUP.GENERATEKEY,
                        payload: array
                    })
                }, 1000)
            })
        }
    }
}
