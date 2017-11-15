import { Alert, BackHandler } from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

export default class MAPACTIONS {
    static GETLOCATION = 'GETLOCATION';

    static getLocService() {
        return (dispatch) => {
            console.log('getLocSErvice')
            LocationServicesDialogBox.checkLocationServicesIsEnabled({
                message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
                ok: "YES",
                cancel: "NO",
                enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => ONLY GPS PROVIDER
                showDialog: true, // false => Opens the Location access page directly
                openLocationServices: true // false => Directly catch method is called if location services are turned off
            }).then(function (success) {
                // success => {alreadyEnabled: true, enabled: true, status: "enabled"} 
                // success => {alreadyEnabled: true, enabled: true, status: "enabled"} 
                navigator.geolocation.getCurrentPosition((success) => {
                    if (success) {
                        let location = {
                            latitude: success.coords.latitude,
                            longitude: success.coords.longitude,
                            latitudeDelta: success.coords.longitudeDelta,
                            longitudeDelta: success.coords.latitudeDelta
                        }
                        dispatch({
                            type: MAPACTIONS.GETLOCATION,
                            payload: location
                        })
                    }
                }, error => console.log(error), { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
            }.bind(this)
                ).catch((error) => {
                    console.log(error.message);
                });
            BackHandler.addEventListener('hardwareBackPress', () => {
                LocationServicesDialogBox.forceCloseDialog();
            });
        }
    }
}

