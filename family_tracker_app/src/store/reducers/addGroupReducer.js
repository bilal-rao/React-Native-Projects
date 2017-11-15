import ADDGROUP from '../actions/addGroup';

const INITAL_STATE = {
    data : [],
    member : [],
    admin: [],
    key: [],
    circles: [],
    isFetchGroup: false,
    isFetchMembers: false,
}


function addGroupReducer(state=INITAL_STATE,action){
    switch(action.type){
        case ADDGROUP.ADDCIRCLE:
        return {...state , data:action.payload};
        case ADDGROUP.FETCHCIRCLE:
        return {...state , circles:action.payload, isFetchGroup:true};
        case ADDGROUP.MATCHKEY:
        return {...state , data:action.payload};
        case ADDGROUP.FETCHMEMBERS:
        return {...state , member:action.payload, admin: action.adminName ,isFetchMembers:true};
        case ADDGROUP.GENERATEKEY:
        return {...state , key:action.payload};
        default:
        return state;
    }
}

export default addGroupReducer;