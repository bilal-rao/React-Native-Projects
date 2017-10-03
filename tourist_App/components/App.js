import React from 'react';
import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import LogOut from './logout/logOut.js';
import MapViews from './mapView/mapView.js';

export default class App extends React.Component{
    render(){
        return(
            // <View>
                // <LogOut />
                <MapViews />
            // </View>
        );
    }
}