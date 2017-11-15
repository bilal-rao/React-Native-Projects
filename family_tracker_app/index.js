
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import store from './src/store';
import Routes from './Routes';
import { AppRegistry,View,Text } from 'react-native';
// import App from './src/components/App';
import {addNavigationHelpers} from 'react-navigation';
import {connect} from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';



setTimeout = BackgroundTimer.setTimeout.bind(BackgroundTimer)
setInterval = BackgroundTimer.setInterval.bind(BackgroundTimer)
clearTimeout = BackgroundTimer.clearTimeout.bind(BackgroundTimer)
clearInterval = BackgroundTimer.clearInterval.bind(BackgroundTimer)


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC0wG3YxPyNMZJ-hiF7pra9lyY1ivYHxmc",
    authDomain: "family-gps-tracker.firebaseapp.com",
    databaseURL: "https://family-gps-tracker.firebaseio.com",
    projectId: "family-gps-tracker",
    storageBucket: "family-gps-tracker.appspot.com",
    messagingSenderId: "1045190848878"
  };
  firebase.initializeApp(config);


class AppWithNavigationState extends React.Component{
    render(){
      return(
        <Provider store={store}>
        <Routes 
          navigation={addNavigationHelpers({
            dispatch : this.props.dispatch,
            state : this.props.navReducer
          })}
        />
        </Provider>      
      )
    }
  }
  
  const mapStateToProps = (state) => ({
    navReducer : state.navReducer
  });
  
  const NavigationRedux = connect(mapStateToProps)(AppWithNavigationState);
  
  
  export default class family_tracker_app extends Component {
    render() {
      return (
        <Provider store={store}>
          <NavigationRedux />
        </Provider>
      );
    }
  }

console.disableYellowBox = true;

AppRegistry.registerComponent('family_tracker_app', () => family_tracker_app);
