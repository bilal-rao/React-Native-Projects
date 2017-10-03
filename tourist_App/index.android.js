
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import store from './store';
import Routes from './Routes';
import { AppRegistry } from 'react-native';
import App from './components/App';
import {addNavigationHelpers} from 'react-navigation';
import {connect} from 'react-redux';


// Initialize Firebase
var config = {
    apiKey: "AIzaSyCfLjvl2PCS5GMbJQH3jSY0X6p6KGkCyho",
    authDomain: "tourist-app-2d8da.firebaseapp.com",
    databaseURL: "https://tourist-app-2d8da.firebaseio.com",
    projectId: "tourist-app-2d8da",
    storageBucket: "tourist-app-2d8da.appspot.com",
    messagingSenderId: "23113300524"
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


export default class tourist_App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationRedux />
      </Provider>
    );
  }
}
console.disableYellowBox = true;//used for disable warnings in react-native

AppRegistry.registerComponent('tourist_App', () => tourist_App);
