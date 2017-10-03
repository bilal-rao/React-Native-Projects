import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import LoginForm from './loginForm';
import AUTHUSER from '../../store/actions/authUser';
import {connect} from 'react-redux';


function mapDispatchToProps(dispatch){
    return {
        loginDispatch : (userObj)=>dispatch(AUTHUSER.signin(userObj))
    }
}

class LoginIn extends React.Component {
    navagateToSignUp() {
        const { navigate } = this.props.navigation;
        navigate('signup');
    }
    dataFromLoginForm = (dataFromChild) => {
            this.props.loginDispatch(dataFromChild);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../../images/logo.png')}
                    />
                </View>
                <View style={styles.formContainer}>
                    <LoginForm callBackFromParent={this.dataFromLoginForm} />
                </View>
                <TouchableOpacity style={styles.linkStyle}>
                    <Text onPress={this.navagateToSignUp.bind(this)}>Create an Account!</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 0.5,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
    },
    linkStyle: {
        marginLeft: 225
    }
    // background : {backgroundColor : 'red'},
    // titleText : { fontWeight : 'bold' , fontSize : 20, color : 'yellow'}
})

export default connect(()=>({}),mapDispatchToProps)(LoginIn);