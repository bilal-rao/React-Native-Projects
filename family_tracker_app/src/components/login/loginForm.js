import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

export default class LoginForm extends React.Component {
    constructor(){
        super();
        this.state={
            email: '',
            pass: ''
        }
    }
    login() {
        var loginObj = {
            email: this.state.email,
            password: this.state.pass
        }
        this.props.callBackFromParent(loginObj);
     
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    onChangeText={(email) => { this.setState({ email }) }}
                />
                <TextInput
                    placeholder='Password'
                    secureTextEntry
                    style={styles.input}
                    onChangeText={(pass) => { this.setState({ pass }) }}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={this.login.bind(this)}>
                    <Text style={styles.buttonText}> LOGIN </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: "rgba(255, 255, 255,0.2)",
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        backgroundColor: 'rgba(41, 128, 185,1)',
        paddingVertical: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF'
    }
})