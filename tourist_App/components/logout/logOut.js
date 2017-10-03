import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import AUTHUSER from '../../store/actions/authUser';
import {connect} from 'react-redux';

function mapDispatchToProps(dispatch) {
    return {
        logOutDispatch : () => dispatch(AUTHUSER.signout())
    }
}


 class LogOut extends React.Component{
  _logOut(){
      this.props.logOutDispatch();
  }
    render(){
        return(
            <View>
                <TouchableOpacity onPress={this._logOut.bind(this)}>
                    <Text>LogOut</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default connect(()=>({}),mapDispatchToProps)(LogOut);
