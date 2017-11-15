import MAPACTIONS from '../actions/mapActions';

const INITIAL_STATE = {
    initialPoint: null,
    destinationPoint: null,
}

function mapReducer(state = INITIAL_STATE, action) {
    console.log('map Reducer success')
    switch (action.type) {
        case MAPACTIONS.GETLOCATION:
            return { ...state, initialPoint: action.payload };
        case MAPACTIONS.SETLOCATION:
            return { ...state, destinationPoint: action.payload };
        default:
            return state;
    }
}
export default mapReducer;