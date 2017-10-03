import {StackNavigator} from 'react-navigation';
import Routes  from '../../Routes.js';

const navReducer = (state,action) => {
    const newState = Routes.router.getStateForAction(action,state);
    return newState || state;
}
export default navReducer;