/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './Routes';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as firebase from 'firebase';

 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyBy8Il0JtAjI5JryrN9zHkx82bJsg_5uks",
  authDomain: "patient-tracker-app.firebaseapp.com",
  databaseURL: "https://patient-tracker-app.firebaseio.com",
  projectId: "patient-tracker-app",
  storageBucket: "patient-tracker-app.appspot.com",
  messagingSenderId: "194439066650"
};
firebase.initializeApp(config);

export default class patient_tracker_stage3 extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('patient_tracker_stage3', () => patient_tracker_stage3);
