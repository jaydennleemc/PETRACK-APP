import React, {Component} from 'react';

import {Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scale} from "react-native-size-matters";
import * as colors from '../constants/colors';
import * as images from '../constants/images';
import {Styles} from '../constants/styles';
import Toolbar from "../components/toolbar";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import {Actions} from "react-native-router-flux";

const {width, height} = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class HomePage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            markers: [
                {
                    coordinate: {
                        latitude: 48.1804069,
                        longitude: -65.8716805,
                    },
                    title: "Best Place",
                    description: "This is the best place in Portland",
                    image: images.point,
                },
                {
                    coordinate: {
                        latitude: 45.524698,
                        longitude: -122.6655507,
                    },
                    title: "Second Best Place",
                    description: "This is the second best place in Portland",
                    image: images.point,
                },
                {
                    coordinate: {
                        latitude: 45.5230786,
                        longitude: -122.6701034,
                    },
                    title: "Third Best Place",
                    description: "This is the third best place in Portland",
                    image: images.point,
                },
                {
                    coordinate: {
                        latitude: 45.521016,
                        longitude: -122.6561917,
                    },
                    title: "Fourth Best Place",
                    description: "This is the fourth best place in Portland",
                    image: images.point,
                },
            ],
            region: {
                latitude: 48.1804069,
                longitude: -65.8716805,
                latitudeDelta: 0.04864195044303443,
                longitudeDelta: 0.040142817690068,
            },
        }
    }


    componentDidMount(): void {
        this._getCurrentPosition()
    }

    _getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = parseFloat(position.coords.latitude);
            let long = parseFloat(position.coords.longitude);
            let initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            };
            // this.setState({
            //     region: initialRegion
            // })
        })
    };

    _findNearByDevice = () => {

    };

    render() {
        return (
            <View style={Styles.container}>
                <SafeAreaView/>
                {/* App bar */}
                <Toolbar title={'PETRACK'}
                         rightIconOnPress={() => {
                             Actions.push("profileScene")
                         }}
                         disableLeft={true}/>

                {/* Map View */}
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{flex: 1}}
                    region={this.state.region}
                    showsUserLocation={true}>
                    {this.state.markers.map((marker, index) => {
                        return (
                            <MapView.Marker key={index} coordinate={marker.coordinate}>

                            </MapView.Marker>
                        );
                    })}
                </MapView>

                {/* Scan Button */}
                <View style={styles.scanButtonView}>
                    <TouchableOpacity onPress={() => {
                        Actions.push("scanScene")
                    }}>
                        <Image source={images.scan_btn}/>
                    </TouchableOpacity>
                    <Text style={styles.scanText}>Scan the QR code</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scanButtonView: {
        position: 'absolute',
        bottom: scale(40),
        alignItems: 'center',
        width: '100%'
    },
    scanText: {
        color: colors.themeColor,
        marginTop: scale(8),
        alignSelf: 'center'
    }
});
