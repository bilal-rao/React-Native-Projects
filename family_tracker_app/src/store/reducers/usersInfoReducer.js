import USERINFO from '../actions/usersInfo';

const INITIAL_STATE = {
    data : null,
}

function usersInfoReducer(state=INITIAL_STATE,action){
    switch(action.type){
        case USERINFO.GETUSER:
        return {...state,data:action.payload}; 
        case USERINFO.MEMBERSPOSTIONS:
        return {...state,data:action.payload}      
        default:
        return state;
    }
}
export default usersInfoReducer;