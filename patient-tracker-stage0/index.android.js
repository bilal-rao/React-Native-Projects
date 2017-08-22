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


class HelloWorld extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}





AppRegistry.registerComponent('HelloWorld', () => HelloWorld);