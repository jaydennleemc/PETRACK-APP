import React, {Component} from 'react';

import {Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scale} from "react-native-size-matters";
import Icon from 'react-native-vector-icons/AntDesign';
import * as colors from "../constants/colors";
import * as images from '../constants/images';
import {Styles} from "../constants/styles";
import {Actions} from "react-native-router-flux";

let ApiService = require('../utils/APIService');

const lockerStatus = {
    locked: 'Click the button to unlock dispenser.',
    unlocking: '   Syncing... \n Please wait.',
    unlocked: 'The dispenser has been unlocked, \n Press the button on the dispenser to get the bag.'
};

export default class DeviceControlPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deviceId: this.props.deviceId,
            lock: true,
            unlocking: false,
        }
    }

    componentDidMount(): void {

    }

    _unlockDispenser = (id) => {
        this.setState({
            unlocking: true
        });
        ApiService.activateDispenser(id).then((resp) => {
            console.log(resp.data);
            this.setState({
                lock: false,
            })

        }).catch((error) => {
            console.log('unlock Dispenser error: ', error);
        })
    };

    _lockDispenser = (id) => {
        this.setState({
            unlocking: false
        });
        ApiService.deactivateDispenser(id).then((resp) => {
            console.log(resp.data);
            this.setState({
                lock: true,
            })

        }).catch((error) => {
            console.log('unlock Dispenser error: ', error);
        })
    };

    _renderLockerStatus = () => {
        // return lock status
        if (this.state.lock && this.state.unlocking === false) {
            return (
                <View>
                    {/* Device status  */}
                    <View style={{alignSelf: 'center'}}>
                        <ImageBackground resizeMode={"contain"} source={images.ic_lock_round}
                                         style={{width: scale(200), height: scale(100)}}>
                            <Text style={styles.lockStatus}>Locked</Text>
                        </ImageBackground>
                    </View>

                    {/* lock image */}
                    <View style={{alignSelf: 'center'}}>
                        <ImageBackground resizeMode={"contain"} source={images.ic_lock_bg}
                                         style={{width: scale(150), height: scale(150)}}>
                            <TouchableOpacity style={styles.lockImage} onPress={() => {
                                this._unlockDispenser(this.state.deviceId);
                            }}>
                                <Image source={images.ic_lock} resizeMode={"contain"}
                                       style={{width: scale(50), height: scale(50),}}/>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>

                    <Text style={styles.unlockHints}>{lockerStatus.lockedt}</Text>
                </View>
            )
        } else if (this.state.lock && this.state.unlocking) {
            // return unlocking status
            return (
                <View>
                    {/* Device status  */}
                    <View style={{alignSelf: 'center'}}>
                        <ImageBackground resizeMode={"contain"} source={images.ic_lock_round}
                                         style={{width: scale(200), height: scale(100)}}>
                            <Text style={styles.lockStatus}>Locked</Text>
                        </ImageBackground>
                    </View>

                    {/* lock image */}
                    <View style={{alignSelf: 'center'}}>
                        <ImageBackground resizeMode={"contain"} source={images.ic_lock_bg}
                                         style={{width: scale(150), height: scale(150)}}>
                            <View style={styles.lockImage}>
                                <Image source={images.ic_unlocking} resizeMode={"contain"}
                                       style={{width: scale(50), height: scale(50),}}/>
                            </View>
                        </ImageBackground>
                    </View>

                    <Text style={styles.unlockHints}>{lockerStatus.unlocking}</Text>
                </View>
            )
        } else {
            // return unlocked status
            return (
                <View>
                    {/* Device status  */}
                    <View style={{alignSelf: 'center'}}>
                        <ImageBackground resizeMode={"contain"} source={images.ic_unlock_round}
                                         style={{width: scale(200), height: scale(100)}}>
                            <Text style={styles.lockStatus}>Unlocked</Text>
                        </ImageBackground>
                    </View>

                    {/* lock image */}
                    <View style={{alignSelf: 'center'}}>
                        <ImageBackground resizeMode={"contain"} source={images.ic_unlock_bg}
                                         style={{width: scale(150), height: scale(150)}}>
                            <TouchableOpacity style={styles.lockImage} onPress={() => {
                                this._lockDispenser(this.state.id);
                            }}>
                                <Image source={images.ic_unlock} resizeMode={"contain"}
                                       style={{width: scale(50), height: scale(50),}}/>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>

                    <Text style={styles.unlockHints}>{lockerStatus.unlocked}</Text>
                </View>
            )
        }

    };


    render() {
        return (
            <View style={[Styles.container, {backgroundColor: 'white'}]}>
                <SafeAreaView/>
                <View style={{flexDirection: 'row', marginHorizontal: scale(16)}}>
                    <TouchableOpacity style={{flex: 1,}} onPress={() => {
                        Actions.pop();
                    }}>
                        <Icon name={'arrowleft'} size={scale(30)} style={{color: colors.lightColor}}/>
                    </TouchableOpacity>
                </View>

                <View style={{height: '15%'}}/>

                {this._renderLockerStatus()}

                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    height: scale(80),
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    shadowOpacity: 0.1
                }}>
                    <Text style={{
                        fontSize: scale(18),
                        alignSelf: 'center',
                        marginBottom: scale(20),
                        marginTop: scale(20),
                        color: colors.lightColor
                    }}>Dispenser Number: 0013</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    lockStatus: {
        color: colors.lightColor,
        fontSize: scale(20),
        position: 'absolute', // child
        bottom: '45%', // position where you want
        left: '30%'
    },
    lockImage: {
        position: 'absolute', // child
        bottom: '33%', // position where you want
        left: '33%'
    },
    unlockHints: {
        alignSelf: 'center',
        marginTop: scale(15),
        color: colors.lightColor
    },
});
