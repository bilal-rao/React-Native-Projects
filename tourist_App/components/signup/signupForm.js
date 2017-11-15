import React from 'react';
import {View,TextInput,TouchableOpacity,Text,Alert} from 'react-native';

export default class SignUpForm extends React.Component{

    signUp(){
        var signupObj = {
            uName : this.state.uName,
            uAddress : this.state.uAddress,
            email : this.state.email,
            password : this.state.pass
        }
        this.props.callBackFromParent(signupObj);
        this.state.uName = '',
        this.state.uAddress = '',
        this.state.email = '',
        this.state.password = ''
    }
    render(){
        return(
            <View style={styles.container}>              
                <TextInput style={styles.input}
                    placeholder="First Name"
                    onChangeText={(uName)=>{this.setState({uName})}}
                />
                <TextInput style={styles.input}
                    placeholder="Address"  
                    onChangeText={(uAddress)=>{this.setState({uAddress})}}                  
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