import PatientsRecord from '../../actions/patientAction';

const INITIAL_STATE = {
    // addPatient : 0
    data:[],
    getData:false
}


function PatientReducer(state = INITIAL_STATE,action){
    switch(action.type){
        case PatientsRecord.ADDPATIENT:
        return {...state, data : action.payload};
        case PatientsRecord.FETCHPATIENT:
        return {...state, data : action.payload,getData:true};
        case PatientsRecord.REMOVEPATIENT:
        return {...state, data : action.payload}
        default:
        return state;
    }
}

export default PatientReducer;