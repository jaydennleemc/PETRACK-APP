import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import * as images from '../constants/images'
import {scale} from "react-native-size-matters"
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

export default class MapsMarker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            markers: this.props.markers
        }
    }


    refreshMarkers(markers) {
        this.setState({
            markers: markers
        })
    }


    _renderMarker() {
        this.state.markers.map((marker, index) => {
            return (
                <MapView.Marker
                    coordinate={marker.coordinate}
                    key={`marker-${index}`}
                    onPress={() => {
                        this._panel.refreshData(this.state.markers[index]);
                        this._panel.show();
                        console.log('point clicked');
                    }}>
                    <Image source={images.ic_point}
                        resizeMode="contain"
                        style={{ width: scale(40), height: scale(40) }} />
                </MapView.Marker>
            );
        })
    }

    render() {
        return (
            <View>
                {this._renderMarker()}
            </View>
        )
    }
}
