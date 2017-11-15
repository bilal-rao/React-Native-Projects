/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
// var FilePickerManager = require('NativeModules').FilePickerManager;
const FilePickerManager = require('NativeModules').FilePickerManager;
import { Container, Header, Content, Icon, Button } from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';


export default class App extends Component {
  openPicker() {
    FilePickerManager.showFilePicker(null, (response) => {
      console.log('response: ', response);
      RNFetchBlob.fs.readFile(response.path, 'base64')
        .then((data) => {
          console.log('data:', data)
        })
      // fetch('https://speech.googleapis.com/v1/speech:recognize', {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': 'ya29.ElrlBEcU8zWK_-3l6dzkitXcPG-6TKxCURMa0GsqjrFowc8K8JZ0TDM7d9VMiMUzJPMsdms6sOQYQEzJU8hQWdySX875z6yGmMovpqLQSfUf8LqyEAnlkVWZWAk'
      //   },
      //   data: JSON.stringify({
      //     config: {
      //       encoding: "base64",
      //       languageCode: "en-US",
      //     },
      //     audio: {
      //       uri: response
      //     }
      //   })
      // })
        // .then((response) => response.json())
        // .then((responseJson) => {
        //   console.log(responseJson.movies)
        // })
        .catch((error) => {
          console.error(error);
        });
      console.log('base64', window.btoa(response));
      if (response.didCancel) {
        console.log('User cancelled file picker');
      }
      else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      }
      else {
        this.setState({
          file: response
        });
      }
    });
  }
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Button full onPress={this.openPicker.bind(this)} danger><Text> Browse </Text></Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
