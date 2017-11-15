import { Alert } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import axios from 'axios';

export default class MAPACTIONS {
    static GETLOCATION = 'GETLOCATION';
    static SETLOCATION = 'SETLOCATION';
    static GETDIRECTION = 'GETDIRECTION';


    static getLocation() {
        return (dispatch) => {
            navigator.geolocation.getCurrentPosition((success) => {
                if (success) {
                    console.log('positions : ', success)
                    let location = {
                        latitude: success.coords.latitude,
                        longitude: success.coords.longitude,
                        latitudeDelta: success.coords.longitudeDelta,
                        longitudeDelta: success.coords.latitudeDelta
                    }
                    console.log('get Location success');
                    dispatch({
                        type: MAPACTIONS.GETLOCATION,
                        payload: location
                    })
                }
            },
                (error) => {
                    Alert.alert('error ', error.message)
                },
            )
        }
    }
    static setLocation() {
        return (dispatch) => {
            RNGooglePlaces.openAutocompleteModal()
                .then((place) => {
                    console.log(place);
                    let location = {
                        latitude: place.latitude,
                        longitude: place.longitude,
                        latitudeDelta: place.latitudeDelta,
                        longitudeDelta: place.longitudeDelta
                    }
                    dispatch({
                        type: MAPACTIONS.SETLOCATION,
                        payload: location
                    })
                })
                .catch(error => console.log(error.message));  // error is a Javascript Error object
        }
    }
    static getDirection() {
        console.log('get direction disptach');
        return async (dispatch) => {
            axios.get('https://maps.googleapis.com/maps/api/directions/json?origin=24.8841584,67.1379614&destination=24.882830499999997,67.0680423')
                .then((resp) => {
                    let respJson = resp.json();
                    let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
                    let coords = points.map((point, index) => {
                        return {
                            latitude: point[0],
                            longitude: point[1]
                        }
                    })
                    console.log('get dir success' );
                    dispatch({
                        type: MAPACTIONS.SETLOCATION,
                        payload: coords
                    });

                    return coords
                })
                .catch((err) => {
                    console.log('get dir err', err);
                })
        }
    }
}

