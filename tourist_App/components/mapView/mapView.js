import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import SearchLocation from '../searchLocation/searchLocation';
import { connect } from 'react-redux';
import MAPACTIONS from '../../store/actions/mapActions';
import getDirections from 'react-native-google-maps-directions';
import Polyline from '@mapbox/polyline';
import PolyLineDrawer from '../polyLine/drawPolyLine';
import { Container, Header, Footer, Body, Left, Right, Icon, Fab } from 'native-base';


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
    borderRadius: 50 / 2,
    overflow: 'hidden',
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
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
});

class MapViews extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      placeRating: 'n/a',
      placeAddress: 'n/a',
      placeName: 'n/a',
      placePhone: 'n/a',
      placeWebsite: 'n/a',
      isPlaceInfo: false,
      coords: [],
      latitude: '',
      longitude: ''
    }
    // const data = {
    //   startLoc: {
    //     latitude: 33.33,
    //     longitude: 22.23
    //   },
    //   destinationLoc: {
    //     latitude: 23.23,
    //     longitude: 12.22
    //   },
    //   params: {
    //     key: "dirflg",
    //     value: "w"
    //   }
    // }
  }
  openSearchModal() {
    console.log('open search modal')
    this.props.setLocation();
    // let coordinates = {
    //   startLocation: {
    //     latitude: this.props.myLocation.initialPoint.latitude,
    //     longitude: this.props.myLocation.initialPoint.longitude
    //   },
    //   endingLocation: {
    //     latitude: this.props.myLocation.destinationPoint.latitude,
    //     longitude: this.props.myLocation.destinationPoint.longitude
    //   }
    // }
    // this.getDirections(coordinates.startLocation, coordinates.endingLocation)
    // setTimeout(()=>{}, 5000);

  }
  componentDidMount() {
    this.props.getLocation();
    // this.getDirections("40.1884979, 29.061018", "41.0082,28.9784");
  }
  async getDirections(startLoc, destinationLoc) {
    console.log('start loc : ', startLoc, 'destination loc : ', destinationLoc)
    try {
      console.log('try run')
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyCwjLbstZsL6LoZkIMsfiqO9lpxQeneqCo`)
      console.log('resp: ', resp);
      let respJson = await resp.json();
      console.log('resp in json: ', respJson)
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({ coords: coords })
      console.log('coords : ', this.state.coords)
      return coords
    } catch (error) {
      alert(error)
      return error
    }
  }

  render() {
    console.log('dest loc:', this.props.myLocation.initialPoint)
    // console.log(this.state.latitude, this.state.longitude)
    return (
      <View style={styles.container}>
        {/* <Header >
          <Right>
            <TouchableOpacity>
              <Text style={{color:"#FFF"}}>LogOut</Text>
            </TouchableOpacity>
          </Right>
        </Header> */}
        <MapView
          showsUserLocation={true}
          style={styles.map}
          region={{
            latitude: this.props.myLocation.initialPoint ? this.props.myLocation.initialPoint.latitude : 232,
            longitude: this.props.myLocation.initialPoint ? this.props.myLocation.initialPoint.longitude : 33.333,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.props.myLocation.destinationPoint ? this.props.myLocation.destinationPoint.latitude : 0,
              longitude: this.props.myLocation.destinationPoint ? this.props.myLocation.destinationPoint.longitude : 0
            }}
          />
          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"
          />
        </MapView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.openSearchModal()}
        >
          <Text>Pick a Place</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


function mapDispatchToProps(dispatch) {
  // console.log('dispatch data: ', dispatch);
  return {
    getLocation: () => dispatch(MAPACTIONS.getLocation()),
    setLocation: () => dispatch(MAPACTIONS.setLocation())
  }
}

function mapStateToProps(state) {
  return {
    myLocation: state.mapReducer,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapViews);


