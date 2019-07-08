import React, { Component } from 'react';

import { Alert, Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scale } from "react-native-size-matters";
import * as colors from '../constants/colors';
import * as images from '../constants/images';
import { Styles } from '../constants/styles';
import CustomToolbar from "../components/customToolbar";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Actions } from "react-native-router-flux";
import * as Animatable from 'react-native-animatable';
import CustomSlidingUpPanel from "../components/customSlidingUpPanel";
import I18n from '../i18n/i18n';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let ApiService = require('../utils/APIService');

var currentRegion = null;
var _interval = null;
export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDispenserInfo: false,
            timerTask: true,
            dispensers: [],
            markers: [],
            region: null,
        };
    }


    componentDidMount() {
        this._getCurrentPosition();
        _interval = this._refreshLocation()
    }

    componentWillUnmount() {
        clearInterval(_interval)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('should refresh ', nextProps.refresh);
        if (nextProps.refresh === true) {
            _interval = this._refreshLocation()
        }
    }

    _refreshLocation = () => {
        let timerTask = setInterval(() => {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = parseFloat(position.coords.latitude);
                let long = parseFloat(position.coords.longitude);
                let initialRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                };

                console.log('current location info', initialRegion);
                this.setState({
                    region: initialRegion,
                    initialRegion: currentRegion
                }, () => {
                    this._findNearByDevice();
                    console.log(this.state.markers)
                })
            });
        }, 12000);

        return timerTask;
    };

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
            currentRegion = initialRegion;

            this.setState({
                region: initialRegion,
                initialRegion: initialRegion
            }, () => {
                this._findNearByDevice();
            })
        });
    };

    _findNearByDevice = () => {
        ApiService.findNearBy(this.state.region.latitude, this.state.region.longitude, 1000)
            .then(resp => {
                if (resp.data.code === 0) {
                    console.log('findNearByDevice size = ', resp.data.dispensers.length);
                    this.setState({
                        dispensers: resp.data.dispensers
                    }, () => {
                        this._fetchMarkerData()
                    });
                } else {
                    Alert.alert(
                        'Error',
                        resp.data.message,
                        [{ text: 'OK', onPress: () => console.log('OK Pressed') },],
                        { cancelable: false },
                    );
                }
            }).catch((error) => {
                console.log('findNearByDevice error = ', error)
            })
    };

    _fetchMarkerData() {
        if (this.state.dispensers.length !== 0) {
            var markers = [];
            for (let dispenser of this.state.dispensers) {
                markers.push({
                    coordinate: {
                        latitude: dispenser.location.coordinates[1],
                        longitude: dispenser.location.coordinates[0],
                    },
                })
            }

            this.setState({
                markers: markers
            });
        }
    }

    _showPanel(region, marker) {
        const data = {
            origins: [marker.latitude, marker.longitude],
            destinations: [region[0], region[1]],
        };

        ApiService.calculateDistance(data).then(resp => {
            console.log(resp.data);
            // this._panel.refreshData(this.state.markers[index]);
            this._panel.show();
        }).catch(error => {
            console.log('calculate distance error', error)
        })
    }

    _onRegionChange = (region) => {
        currentRegion = region;
    };

    render() {
        return (
            <View style={Styles.container}>
                <SafeAreaView />
                {/* App bar */}
                <CustomToolbar
                    rightIcon={'ios-person'}
                    title={'PETRACK'}
                    rightIconOnPress={() => {
                        clearInterval(_interval);
                        Actions.push("profileScene");
                    }}
                    rightIconColor={colors.themeColor}
                    disableLeft={true} />

                {/* Map View */}
                <MapView
                    onRegionChange={(region => this._onRegionChange(region))}
                    provider={PROVIDER_GOOGLE}
                    moveOnMarkerPress={true}
                    region={this.state.initialRegion}
                    style={{ flex: 1 }}
                    followsUserLocation={false}
                    showsUserLocation={true}>
                    {this.state.markers.map((marker, index) => {
                        return (
                            <MapView.Marker
                                coordinate={marker.coordinate}
                                key={`marker-${index}`}
                                onPress={() => {
                                    this._showPanel(this.state.region, this.state.markers[index].coordinate);
                                }}>
                                <Image source={images.ic_point}
                                    resizeMode="contain"
                                    style={{ width: scale(40), height: scale(40) }} />
                            </MapView.Marker>
                        );
                    })}
                </MapView>

                <Animatable.View animation="fadeInUp" duration={500} iterationCount={1}>
                    <View style={styles.scanButtonView}>
                        <TouchableOpacity onPress={() => {
                            Actions.push("scanScene")
                        }}>
                            <Image source={images.scan_btn} />
                        </TouchableOpacity>
                        <Text style={styles.scanText}>{I18n.t('scan_qr_code')}</Text>
                    </View>
                </Animatable.View>


                <CustomSlidingUpPanel
                    ref={c => this._panel = c} />

            </View>
        );
    }
}

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            shadowOpacity: 0.25,
            backgroundColor: 'white',
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
