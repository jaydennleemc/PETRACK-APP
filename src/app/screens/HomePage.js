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
import SlidingUpPanel from "rn-sliding-up-panel";

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
                        latitude: 48.1804069,
                        longitude: -65.8716805,
                    },
                    title: "Best Place",
                    description: "This is the best place in Portland",
                    image: images.ic_point,
                },
                {
                    coordinate: {
                        latitude: 45.524698,
                        longitude: -122.6655507,
                    },
                    title: "Second Best Place",
                    description: "This is the second best place in Portland",
                    image: images.ic_point,
                },
                {
                    coordinate: {
                        latitude: 45.5230786,
                        longitude: -122.6701034,
                    },
                    title: "Third Best Place",
                    description: "This is the third best place in Portland",
                    image: images.ic_point,
                },
                {
                    coordinate: {
                        latitude: 45.521016,
                        longitude: -122.6561917,
                    },
                    title: "Fourth Best Place",
                    description: "This is the fourth best place in Portland",
                    image: images.ic_point,
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
            // this.setState({
            //     region: initialRegion
            // })
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
                                onPress={(e) => {
                                    this._panel.show(200);
                                    console.log('point clicked');
                                }}>
                                <Image source={images.ic_point}
                                       resizeMode="contain"
                                       style={{width: scale(20), height: scale(20)}}/>
                                {/*<MapView.Callout*/}
                                {/*    tooltip={true}>*/}
                                {/*    <View style={{*/}
                                {/*        width: scale(200),*/}
                                {/*        height: scale(120),*/}
                                {/*        backgroundColor: 'white',*/}
                                {/*        borderRadius: scale(20),*/}
                                {/*        marginBottom: scale(10)*/}
                                {/*    }}>*/}
                                {/*        <View style={{flexDirection: 'row'}}>*/}
                                {/*            <Text style={styles.deviceTitle}>Dispenser:</Text>*/}
                                {/*            <Text style={styles.deviceContent}>0013</Text>*/}
                                {/*        </View>*/}
                                {/*        <View style={[Styles.horizontalLine, {marginTop: scale(4)}]}/>*/}
                                {/*        <View style={{flexDirection: 'row'}}>*/}
                                {/*            <Text style={styles.deviceTitle}>Distance:</Text>*/}
                                {/*            <Text style={styles.deviceContent}>231m</Text>*/}
                                {/*        </View>*/}
                                {/*        <View style={[Styles.horizontalLine, {marginTop: scale(4)}]}/>*/}

                                {/*        <View style={{flexDirection: 'row'}}>*/}
                                {/*            <Text style={styles.deviceTitle}>Surplus bags:</Text>*/}
                                {/*            <Text style={styles.deviceContent}>345</Text>*/}
                                {/*        </View>*/}
                                {/*        <View style={[Styles.horizontalLine, {marginTop: scale(4)}]}/>*/}
                                {/*        <View style={{flexDirection: 'row'}}>*/}
                                {/*            <Text style={styles.deviceTitle}>Last used time:</Text>*/}
                                {/*            <Text style={styles.deviceContent}>3 days</Text>*/}
                                {/*        </View>*/}
                                {/*        <View style={[Styles.horizontalLine, {marginTop: scale(4)}]}/>*/}
                                {/*    </View>*/}
                                {/*</MapView.Callout>*/}
                            </MapView.Marker>
                        );
                    })}
                </MapView>

                <Animatable.View animation="fadeInUp" duration={1000} iterationCount={1}>
                    <View style={styles.scanButtonView}>
                        <TouchableOpacity onPress={() => {
                            Actions.push("scanScene")
                        }}>
                            <Image source={images.scan_btn}/>
                        </TouchableOpacity>
                        <Text style={styles.scanText}>Scan the QR code</Text>
                    </View>
                </Animatable.View>

                <SlidingUpPanel
                    draggableRange={{top: 700, bottom: 0.5}}
                    ref={c => this._panel = c}>
                    <View style={styles.container}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.deviceTitle}>Dispenser:</Text>
                            <Text style={styles.deviceContent}>0013</Text>
                        </View>
                        <View style={Styles.horizontalLine}/>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.deviceTitle}>Distance:</Text>
                            <Text style={styles.deviceContent}>231m</Text>
                        </View>
                        <View style={Styles.horizontalLine}/>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.deviceTitle}>Surplus bags:</Text>
                            <Text style={styles.deviceContent}>345</Text>
                        </View>
                        <View style={Styles.horizontalLine}/>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.deviceTitle}>Last used time:</Text>
                            <Text style={styles.deviceContent}>3 days</Text>
                        </View>
                        <View style={Styles.horizontalLine}/>
                    </View>
                </SlidingUpPanel>

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
    deviceTitle: {
        flex: 1,
        color: colors.greyColor,
        marginTop: scale(8),
        marginLeft: scale(8)
    },
    deviceContent: {
        flex: 1,
        textAlign: 'right',
        color: colors.blackColor,
        marginTop: scale(8),
        marginRight: scale(8)
    }
});
