import React from 'react';
import {View,TextInput,TouchableOpacity,Text,Alert} from 'react-native';

export default class SignUpForm extends React.Component{

    signUp(){
        var signupObj = {
            fName : this.state.fName,
            sName : this.state.sName,
            email : this.state.email,
            password : this.state.pass
        }
        this.props.callBackFromParent(signupObj);
        this.state.fName = '',
        this.state.sName = '',
        this.state.email = '',
        this.state.password = ''
    }
    render(){
        return(
            <View style={styles.container}>              
                <TextInput style={styles.input}
                    placeholder="First Name"
                    onChangeText={(fName)=>{this.setState({fName})}}
                />
                <TextInput style={styles.input}
                    placeholder="Surname"  
                    onChangeText={(sName)=>{this.setState({sName})}}                  
                />
                <TextInput style={styles.input}
                     placeholder="Mobile Number or email Address"   
                     onChangeText={(email)=>{this.setState({email})}}             
                />
                <TextInput style={styles.input}
                     placeholder="New Password"    
                     onChangeText={(pass)=>{this.setState({pass})}}            
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={this.signUp.bind(this)}>
                    <Text style={styles.buttonText}>SignUp</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    container : {
        padding : 20
    },
    input : {
        height : 40,
        backgroundColor : 'rgba(255,255,255,0.2)',
        marginBottom : 20,
        paddingHorizontal : 20
    },
    buttonContainer : {
        backgroundColor : 'rgba(41, 128, 185,1)',
        paddingVertical : 10,
    },
    buttonText : {
        textAlign : 'center',
        color : '#FFF'
    }
}