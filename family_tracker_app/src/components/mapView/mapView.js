import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MAPACTIONS from '../../store/actions/mapActions';
import AUTHUSER from '../../store/actions/authUser';
import { Container, Header, Footer, Body, Left, Right, Icon, Fab } from 'native-base';
var { width, height } = Dimensions.get('window')

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
    width: width,
    height: height,
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
      longitude: '',
      coord: 0
    }
  }

  componentWillMount() {
    this.props.getLocServiceDialogBox();
  }
  componentWillReceiveProps(nextProps) {
    nextProps.updateUserProfile();
  }
  render() {
    var mydata = this.props.data.navigation.state.params || []
    return (
      <View >
        <MapView
          showsUserLocation={true}
          style={styles.map}
          region={{
            latitude: this.props.myLocation.initialPoint ? this.props.myLocation.initialPoint.latitude : 232,
            longitude: this.props.myLocation.initialPoint ? this.props.myLocation.initialPoint.longitude : 33.333,
            latitudeDelta: 0.092,
            longitudeDelta: 0.042
          }}
        >
          {mydata.data ?
            mydata.data ? mydata.data.map((data, index) => (
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude: data.latitude,
                  longitude: data.longitude
                }}
                title={data.uName}
              />
            )) :
              mydata.data.groupList.map((data, index) => (
                <MapView.Marker
                  key={index}
                  coordinate={{
                    latitude: data.latitude,
                    longitude: data.longitude
                  }}
                  title={data.uName}
                />
              ))
            :
            []}

        </MapView>
      </View>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    getLocServiceDialogBox: () => dispatch(MAPACTIONS.getLocService()),
    updateUserProfile: () => dispatch(AUTHUSER.updateProfile())
  }
}

function mapStateToProps(state) {
  return {
    myLocation: state.mapReducer,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapViews);


