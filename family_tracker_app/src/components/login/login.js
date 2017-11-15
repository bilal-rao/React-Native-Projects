import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import LoginForm from './loginForm';
import AUTHUSER from '../../store/actions/authUser';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import { Spinner, Content } from 'native-base';

var {height,width} = Dimensions.get('window');

function mapDispatchToProps(dispatch) {
    return {
        loginDispatch: (userObj) => dispatch(AUTHUSER.signin(userObj))
    }
}

class LoginIn extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true
        }
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                console.log('user signin')
                this.props.navigation.navigate('home')
            }
            else {
                this.setState({ loading: false });
            }
        })
    }
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
                {this.state.loading ?
                    <View style={{marginTop: height/3}}>
                        <Spinner color='red' />
                    </View>
                    :
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
                        <View style={{marginLeft: width/1.6}}>
                        <TouchableOpacity>
                            <Text onPress={this.navagateToSignUp.bind(this)}>Create an Account</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                }
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
    }
    // background : {backgroundColor : 'red'},
    // titleText : { fontWeight : 'bold' , fontSize : 20, color : 'yellow'}
})

export default connect(() => ({}), mapDispatchToProps)(LoginIn);