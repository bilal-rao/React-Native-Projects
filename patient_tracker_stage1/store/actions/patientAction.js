import axios from 'axios';
import { AsyncStorage } from 'react-native';
export default class PatientsRecord {
    static ADDPATIENT = 'ADDPATIENT';
    static FETCHPATIENT = 'FETCHPATIENT';
    static REMOVEPATIENT = 'REMOVEPATIENT';

    static addPatient(value) {
        return (dispatch) => {
            axios.post('https://hidden-reaches-90171.herokuapp.com/CREATEUSER', value)
                .then((data) =>  dispatch({
                    type: PatientsRecord.ADDPATIENT,
                    payload: data
                }))
                .catch((err) => console.log(err))
        }
    }
    static fetchData() {
        return (dispatch) => {
            axios.get('https://hidden-reaches-90171.herokuapp.com/GETDATA')
                .then((data) =>(
                      dispatch({
                        type: PatientsRecord.FETCHPATIENT,
                        payload: data.data
                    })
                ))
                .catch((err) => console.log('ye error arha hai :'.err))
        }
    }
    static removePatient(index) {
        console.log('index no : ', index)
        return (dispatch) => {
            axios.delete('https://hidden-reaches-90171.herokuapp.com/DELETE/'+index)
            .then(()=> axios.get('https://hidden-reaches-90171.herokuapp.com/GETDATA')
            .then((data) =>(
                dispatch({
                  type: PatientsRecord.FETCHPATIENT,
                  payload: data.data
              })
          ))
          .catch((err) => console.log('ye error arha hai :'.err))
        )
            .catch((err)=>console.log('error while deleting :',err))
        }
    }

}