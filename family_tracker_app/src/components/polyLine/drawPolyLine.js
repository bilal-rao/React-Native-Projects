import React from 'react';
import MAPACTIONS from '../../store/actions/mapActions';
import MapView from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions';
import { Button } from 'react-native';
import { Fab } from 'native-base';
class PolyLineDrawer extends React.Component {
    // fetch directions and decode polylines
    async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            })
            this.setState({ coords: coords })
            return coords
        } catch (error) {
            return error
        }
    }
    polyReq() {
        const data = {
            source: {
                latitude: 33.33,
                longitude: 22.23
            },
            destination: {
                latitude: 23.23,
                longitude: 12.22
            },
            params: {
                key: "dirflg",
                value: "w"
            }
        }
        getDirections(data);
    }
    render() {

        return (
            <MapView.Polyline
                coordinates={this.state.coords}
                strokeWidth={2}
                strokeColor="red"
            />
        );
    }
}


// function mapDispatchToProps() {
//     return {
//         drawPolyLine: () => dispatch(MAPACTIONS.getDirection())
//     }
// }

export default PolyLineDrawer;






