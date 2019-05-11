import React, {Component} from 'react';

import {Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scale} from "react-native-size-matters";
import * as colors from '../constants/colors';
import * as images from '../constants/images';
import {Styles} from '../constants/styles';
import CustomToolbar from "../components/customToolbar";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import {Actions} from "react-native-router-flux";
import * as Animatable from 'react-native-animatable';
import CustomSlidingUpPanel from "../components/customSlidingUpPanel";

const {width, height} = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let ApiService = require('../utils/APIService');

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDispenserInfo: false,
            dispensers: [],
            markers: [
                {
                    coordinate: {
                        latitude: 22.308047155697093,
                        longitude: 114.19007422465576,
                    },
                },
                {
                    coordinate: {
                        latitude: 22.508047155697093,
                        longitude: 114.20007422465576,
                    },
                },
                {
                    coordinate: {
                        latitude: 22.328047155697093,
                        longitude: 114.22007422465576,
                    },
                },
                {
                    coordinate: {
                        latitude: 45.521016,
                        longitude: -122.6561917,
                    },
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
        this._getCurrentPosition();
        this._findNearByDevice();
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

            // console.log('location info', initialRegion);

            this.setState({
                region: initialRegion
            })
        })
    };

    _findNearByDevice = () => {
        ApiService.findNearBy(this.state.region.latitude, this.state.region.longitude, 1000)
            .then(resp => {
                console.log('findNearByDevice', resp);
                this.setState({
                    dispensers: resp.data.dispensers
                })
            }).catch((error) => {
            console.log('findNearByDevice error = ', error)
        })
    };


    render() {
        return (
            <View style={Styles.container}>
                <SafeAreaView/>
                {/* App bar */}
                <CustomToolbar title={'PETRACK'}
                               rightIconOnPress={() => {
                                   Actions.push("profileScene")
                               }}
                               rightIconColor={colors.themeColor}
                               disableLeft={true}/>

                {/* Map View */}
                <MapView
                    onPress={() => {
                        if (this.state.showDispenserInfo === true) {
                            this.setState({showDispenserInfo: false});
                        }
                    }}
                    provider={PROVIDER_GOOGLE}
                    style={{flex: 1}}
                    region={this.state.region}
                    followsUserLocation={true}
                    showsUserLocation={true}>
                    {this.state.markers.map((marker, index) => {
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
                                       style={{width: scale(20), height: scale(20)}}/>
                            </MapView.Marker>
                        );
                    })}
                </MapView>

                <Animatable.View animation="fadeInUp" duration={500} iterationCount={1}>
                    <View style={styles.scanButtonView}>
                        <TouchableOpacity onPress={() => {
                            Actions.push("scanScene")
                        }}>
                            <Image source={images.scan_btn}/>
                        </TouchableOpacity>
                        <Text style={styles.scanText}>Scan the QR code</Text>
                    </View>
                </Animatable.View>


                <CustomSlidingUpPanel
                    ref={c => this._panel = c}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        shadowOpacity: 0.25,
        backgroundColor: 'white',
        // alignItems: 'center',
    },
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
    },
});
