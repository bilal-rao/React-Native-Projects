import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import MyLocation from '../myLocation/myLocation';
import {connect} from 'react-redux';
import MAPACTIONS from '../../store/actions/mapActions';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
   },
    radius: {
        height: 50,
        width: 50,
        borderRadius: 50/2,
        overflow : 'hidden',
        backgroundColor: 'rgba(0,122,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0,112,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    marker: {
        height: 20,
        width: 20,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 20/2,
        overflow: 'hidden',
        backgroundColor: '#007AFF'
    },
});

class MapViews extends React.Component {
  componentDidMount(){
    this.props.getLocation();
    this.setState({
      latitude : this.props.myLocation.latitude,
      longitude : this.props.myLocation.longitude
    })
  }
  constructor() {
    super();
    this.state = {
      initialPosition: {
        latitude: this.props.myLocation.latitude,
        longitude: this.props.myLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta:  0.0421,
      },
    }
  }
  render() {
    // const { region } = this.props;
    // console.log(region);
    console.log(this.props.myLocation.latitude)
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.initialPosition}
        >
          {/* <MapView.Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
          >
             <View style={styles.radius}>
              <View style={styles.marker} />
            </View>
          </MapView.Marker> */}
        </MapView>
        {/* <MyLocation />         */}
      </View>
    );
  }
}


function mapDispatchToProps(dispatch){
    console.log('dispatch data: ',dispatch);
    return{
      getLocation : () => dispatch(MAPACTIONS.getLocation())      
    }
}

function mapStateToProps(state){
  console.log('state: ',state)
  return{
    myLocation: state.mapReducer.data
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MapViews);