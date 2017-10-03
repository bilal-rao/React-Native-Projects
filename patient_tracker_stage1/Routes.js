import React, { Component } from 'react';
import AddPatient from './components/addPatient';
import App from './components/App';
import {StackNavigator} from 'react-navigation';



const Routes = StackNavigator({
  Home: {screen : App},
  addPatient : {screen : AddPatient}
});


export default Routes;