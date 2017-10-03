import MAPACTIONS from '../actions/mapActions';


const INITIAL_STATE = {
    data : []
}

function mapReducer(state=INITIAL_STATE,action){
    console.log('map Reducer success')
    switch(action.type){
        case MAPACTIONS.GETLOCATION:
        return {...state,data:action.payload};
        default:
        return state;
    }
}
export default mapReducer;