import {Alert} from 'react-native';
export default class MAPACTIONS{
    static GETLOCATION = 'GETLOCATION';

    static getLocation(){
        console.log('disptach getlocation')
        return(dispatch)=>{
            navigator.geolocation.getCurrentPosition((success)=>{
                if(success){
                    console.log('positions : ',success)
                    let location = {
                        latitude: success.coords.latitude,
                        longtitude: success.coords.longitude,
                        latitudeDelta: success.coords.latitudeDelta,
                        longitudeDelta: success.coords.longitudeDelta
                    }
                    console.log('get Location success');
                    dispatch({
                        type: MAPACTIONS.GETLOCATION,
                        payload: location
                    })
                }
            },
            (error)=>{
                Alert.alert('error ',error.message)
            },
        )
        }
    }
}
