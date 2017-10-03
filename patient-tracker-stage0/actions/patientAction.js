import { AsyncStorage } from 'react-native';

export default class PatientsRecord {
    static ADDPATIENT = 'ADDPATIENT';
    static FETCHPATIENT = 'FETCHPATIENT';
    static REMOVEPATIENT = 'REMOVEPATIENT';

    static addPatient(value) {
        return (dispatch) => {
            AsyncStorage.getItem('patients', (err, data) => {
                data = JSON.parse(data)//i am taken data into the form of array!
                if (data && Array.isArray(data)) {
                    data = data.concat(value);
                    console.log('if part ',data)
                }
                else {
                    data = [value]
                    console.log('else part',data)
                }
                //Note : if u are going to sent the data to the server u should first have to convert into string!!!
                AsyncStorage.setItem('patients', JSON.stringify(data));
                dispatch({
                    type: PatientsRecord.ADDPATIENT,
                    payload: data
                })
            })

        }
    }
    static fetchData() {
        return (dispatch) => {
            AsyncStorage.getItem('patients', (err, data) => {
                data = JSON.parse(data);
                dispatch({
                    type: PatientsRecord.FETCHPATIENT,
                    payload: data
                })
                console.log('Fetch data ', data);
                
            })

        }
    }
    static removePatient(index){
        console.log('index no : ', index)
        return(dispatch)=>{
            AsyncStorage.getItem('patients',(err,data)=>{
                data = JSON.parse(data);
                data.splice(index,1);
                console.log('remove data ', data)
            AsyncStorage.setItem('patients', JSON.stringify(data));
            console.log('after deletion of data : ',data)
                dispatch({
                    type : PatientsRecord.REMOVEPATIENT,
                    payload : data 
                })
            })
        }
    }

}