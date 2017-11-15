import React from 'react';
import { connect } from 'react-redux';
import { View, Button, StyleSheet } from 'react-native';

function mapDispatchToProps(dispatch) {
    return {
        getLocation: () => dispatch(MAPACTIONS.getLocation())
    }
}

function mapStateToProps(state) {
    return {
        myLocation: state.mapReducer
    }
}


class SearchLocation extends React.Component {
    myLoc() {
        console.log("smdlfsmald")

    }
    render() {
        return (
            <View></View>
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



export default connect(mapStateToProps, mapDispatchToProps)(SearchLocation);