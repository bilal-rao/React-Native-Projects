import * as firebase from 'firebase';
export default class PatientsRecord {
    static ADDPATIENT = 'ADDPATIENT';
    static FETCHPATIENT = 'FETCHPATIENT';
    static REMOVEPATIENT = 'REMOVEPATIENT';

    static addPatient(value) {
        return (dispatch) => {
            console.log('value ',value)
            firebase.database().ref().child('patientRecord').push(value)
            .then((data)=> dispatch({
                type : PatientsRecord.ADDPATIENT,
                payload : data
            }))
            .catch((err)=>console.log("error ",err))
        }
    }
    static fetchData() {
        return (dispatch) => {
            firebase.database().ref().child('patientRecord').on('value',function(snap){
                var data = snap.val();
                var listOfData = [];
                for(let key in data){
                    listOfData.push(data[key]);
                }
                console.log('data in array form ', listOfData)                
                console.log('data comes from firebase : ',data)
                dispatch({
                    type: PatientsRecord.FETCHPATIENT,
                    payload: listOfData
                })
            })
        }
    }
    static removePatient(index) {
        return (dispatch) => {
            firebase.database().ref('patientRecord').once('value',snap=>{
                const patientRecord = snap.val();
                var keys = [];
                for(let key in patientRecord){
                    keys.push(key)
                }
                console.log("keys: ",keys)
            firebase.database().ref('patientRecord/'+keys[index]).remove()            
            })
            .then((data)=>dispatch({
                type: PatientsRecord.REMOVEPATIENT,
                payload: data
            }))
            .catch((err)=>console.log('err while deleting: ',err))
        }
    }

}