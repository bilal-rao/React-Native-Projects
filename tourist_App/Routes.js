import React from 'react';
import {StackNavigator} from 'react-navigation';
import LogIn from './components/login/login';
import SignUp from './components/signup/signup';
import App from './components/App';

const Routes = StackNavigator({
    login : {screen : LogIn},
    signup : {screen : SignUp},
    home : {screen : App}
});

export default Routes;