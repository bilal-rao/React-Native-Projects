import React from 'react';
import {StyleSheet,View,Text,Image} from 'react-native';4
import {connect} from 'react-redux';
import SignUpForm from './signupForm';
import AUTHUSER from '../../store/actions/authUser';

function mapDispatchToProps(dispatch){
    return{
        signUpDispatch : (userObj) => dispatch(AUTHUSER.signup(userObj))
    }
}
class SignUp extends React.Component{
    dataFromSignUpForm = (dataFromChild) => {
        this.props.signUpDispatch(dataFromChild);
    }
    render(){
        return(
            <View style={styles.container}>
                {/* <View style={styles.titleContainer}>
                    <Text>Join us Now!</Text>
                </View> */}
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../../images/signup.png')}
                    />
                </View>
                <View style={styles.formContainer}>
                    <SignUpForm callBackFromParent={this.dataFromSignUpForm}/>
                </View>
            </View>
        );
    }
}


const styles = {
    container : {
        flex : 1,
        backgroundColor : '#3498db'
    },
    // titleContainer : {
    //     flexGrow : 0.2,
    //     backgroundColor : 'red'
    // },
    logoContainer : {
        alignItems : 'center',
        flexGrow : 0.5,
        justifyContent : 'center'
        
    }
}


export default connect (()=> ({}),mapDispatchToProps)(SignUp);