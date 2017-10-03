

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

export default class patient_tracker_stage1 extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
console.disableYellowBox = true;//used for disable warnings in react-native


AppRegistry.registerComponent('patient_tracker_stage1', () => patient_tracker_stage1);
