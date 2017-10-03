import React from 'react';
import {connect} from 'react-redux';
import {View,Button,StyleSheet} from 'react-native';
import MAPACTIONS from '../../store/actions/mapActions';

function mapDispatchToProps(dispatch){
    return{
        getLocation : () => dispatch(MAPACTIONS.getLocation())
    }
}

class MyLocation extends React.Component{
    myLoc(){
        this.props.getLocation();
    }
    render(){
        return(
            <Button 
            title='home'
            style={styles.buttonStyle}
            onPress={this.myLoc.bind(this)}
            />
        );
    }
}
const styles = StyleSheet.create({
    buttonStyle: {
        width: 50,
        height: 50,
        borderRadius: 10,
    }
})

  export default connect(()=>({}),mapDispatchToProps)(MyLocation);