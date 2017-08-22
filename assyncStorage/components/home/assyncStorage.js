import React from 'react';
import {AsyncStorage , Text , View , TextInput , StyleSheet} from 'react-native';

class AssyncStorage extends React.Component{
    constructor(){
        super();
        this.state = {
            'name' : ''
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('name').then((value)=>{
            this.setState({'name' : value})
        })
    }
    setName=(value)=>{
        //Data Persist on Mobile Storage
        AsyncStorage.setItem('name',value);
        this.setState({'name' : value})
    }
    
    render(){
        return(
            <View>
                <TextInput onChangeText={this.setName} />
                <Text>
                    {this.state.name}
                </Text>
            </View>
        );
    }
}
export default AssyncStorage;