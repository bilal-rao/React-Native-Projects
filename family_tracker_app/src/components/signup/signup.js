import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import SignUpForm from './signupForm';
import AUTHUSER from '../../store/actions/authUser';

var { height, width } = Dimensions.get('window');

function mapDispatchToProps(dispatch) {
    return {
        signUpDispatch: (userObj) => dispatch(AUTHUSER.signup(userObj))
    }
}
class SignUp extends React.Component {
    dataFromSignUpForm = (dataFromChild) => {
        this.props.signUpDispatch(dataFromChild);
    }
    constructor(props){
        super(props);
        this.state = {
            baseText: 'Family GPS Tracker'
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {/* <View style={styles.titleContainer}>
                    <Text>Join us Now!</Text>
                </View> */}
                <View style={styles.signupText}>
                    <Text style={{
                        fontSize: 25,
                        color: 'white',
                    }}>
                       {this.state.baseText}
                    </Text>
                    {/* <Image
                        style={styles.logo}
                        source={require('../../images/signup.png')}
                    /> */}
                </View>
                <View style={styles.formContainer}>
                    <SignUpForm callBackFromParent={this.dataFromSignUpForm} />
                </View>
                <View style={{ marginLeft: width / 2.6 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>Already have an Account?</Text>
                        <TouchableOpacity >
                            <Text onPress={() => this.props.navigation.navigate('login')}>  Sigin</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = {
    container: {
        flex: 1,
        backgroundColor: '#234567'
    },
    // titleContainer : {
    //     flexGrow : 0.2,
    //     backgroundColor : 'red'
    // },
    signupText: {
        alignItems: 'center',
        flexGrow: 0.5,
        justifyContent: 'center',
    },
}


export default connect(() => ({}), mapDispatchToProps)(SignUp);