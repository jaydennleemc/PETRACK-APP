import React, {Component} from 'react';

import {
    Animated,
    Easing,
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {scale, verticalScale} from "react-native-size-matters";
import Icon from 'react-native-vector-icons/AntDesign';
import * as colors from "../constants/colors";
import * as images from '../constants/images';
import {Styles} from "../constants/styles";
import {Actions} from "react-native-router-flux";
import I18n from '../i18n/i18n';

let ApiService = require('../utils/APIService');

const lockerStatus = {
    locked: I18n.t('locked_status'),
    unlocking: I18n.t('unlocking_status'),
    unlocked: I18n.t('unlocked'),
};

export default class DeviceControlPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deviceId: this.props.deviceId,
            lockerStatus: 'locked'
        };

        this.RotateValueHolder = new Animated.Value(0);
    }

    componentDidMount() {

    }

    _unlockDispenser = (id) => {
        this.setState({
            lockerStatus: 'unlocking'
        });
        ApiService.activateDispenser(id).then((resp) => {
            console.log(resp.data);
            this.setState({
                lockerStatus: 'unlocked'
            });

        }).catch((error) => {
            console.log('unlock Dispenser error: ', error);
            this.setState({
                lockerStatus: 'locked'
            });
        })
    };

    _lockDispenser = (id) => {
        this.setState({
            lockerStatus: 'unlocking'
        });
        ApiService.deactivateDispenser(id).then((resp) => {
            console.log(resp.data);
            this.setState({
                lockerStatus: 'locked'
            });

        }).catch((error) => {
            console.log('unlock Dispenser error: ', error);
            this.setState({
                lockerStatus: 'unlocked'
            });
        })
    };

    startImageRotateFunction(start) {
        this.RotateValueHolder.setValue(0);
        const rotate = Animated.timing(this.RotateValueHolder, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
        });

        if (start) {
            rotate.start(() => this.startImageRotateFunction());
        } else {
            rotate.stop();
        }
    }

    _renderLockerStatus = () => {
        const RotateData = this.RotateValueHolder.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });
        // return lockerStatus status
        if (this.state.lockerStatus === 'locked') {
            this.startImageRotateFunction(false);
            return (
                <View>
                    {/* Device status  */}
                    <View style={{alignSelf: 'center'}}>
                        <ImageBackground resizeMode={"contain"} source={images.ic_lock_round}
                                         style={{width: scale(200), height: scale(100)}}>
                            <Text style={styles.lockStatus}>{I18n.t('device_locked')}</Text>
                        </ImageBackground>
                    </View>

                    {/* lockerStatus image */}
                    <View style={{alignSelf: 'center'}}>
                        <ImageBackground resizeMode={"contain"} source={images.ic_lock_bg}
                                         style={{width: scale(150), height: scale(150)}}>
                            <TouchableOpacity style={styles.lockImage} onPress={() => {
                                this._unlockDispenser(this.state.deviceId)
                            }}>
                                <Image source={images.ic_lock} resizeMode={"contain"}
                                       style={{width: scale(50), height: scale(50),}}/>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>

                    <Text style={styles.unlockHints}>{lockerStatus.locked}</Text>
                </View>
            )
        } else if (this.state.lockerStatus === 'unlocking') {
            this.startImageRotateFunction(true);
            // return unlocking status
            return (
                <View>
                    {/* Device status  */}
                    <View style={{alignSelf: 'center'}}>
                        <ImageBackground resizeMode={"contain"} source={images.ic_lock_round}
                                         style={{width: scale(200), height: scale(100)}}>
                            <Text style={styles.lockStatus}>{I18n.t('device_locked')}</Text>
                        </ImageBackground>
                    </View>

                    {/* lockerStatus image */}
                    <View style={{alignSelf: 'center'}}>
                        <ImageBackground resizeMode={"contain"} source={images.ic_lock_bg}
                                         style={{width: scale(150), height: scale(150)}}>
                            <View style={styles.lockImage}>
                                <Animated.Image source={images.ic_unlocking} resizeMode={"contain"}
                                                style={{
                                                    width: scale(50),
                                                    height: scale(50),
                                                    transform: [{rotate: RotateData}]
                                                }}/>
                            </View>
                        </ImageBackground>
                    </View>

                    <Text style={styles.unlockHints}>{lockerStatus.unlocking}</Text>
                </View>
            )
        } else if (this.state.lockerStatus === 'unlocked') {
            this.startImageRotateFunction(false);
            // return unlocked status
            return (
                <View>
                    {/* Device status  */}
                    <View style={{alignSelf: 'center'}}>
                        <ImageBackground resizeMode={"contain"} source={images.ic_unlock_round}
                                         style={{width: scale(200), height: scale(100)}}>
                            <Text style={styles.lockStatus}>{I18n.t('device_unlocked')}</Text>
                        </ImageBackground>
                    </View>

                    {/* lockerStatus image */}
                    <View style={{alignSelf: 'center'}}>
                        <ImageBackground resizeMode={"contain"} source={images.ic_unlock_bg}
                                         style={{width: scale(150), height: scale(150)}}>
                            <TouchableOpacity style={styles.lockImage} onPress={() => {
                                this._lockDispenser(this.state.deviceId)
                            }}>
                                <Image source={images.ic_unlock} resizeMode={"contain"}
                                       style={{width: scale(50), height: scale(50),}}/>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>

                    <View style={styles.unlockHints}>
                        <Text style={[styles.unlockedText, {textAlign: 'center', marginTop: verticalScale(8)}]}>
                            The dispenser has been unlcoked, </Text>
                        <Text style={[styles.unlockedText, {marginTop: verticalScale(8)}]}>
                            Press the
                            <Text style={[styles.unlockedText, {fontWeight: 'bold'}]}> button on the dispenser </Text> <Text style={styles.unlockedText}>to get the bag</Text></Text>
                    </View>

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
        fontSize: scale(16),
        marginTop: scale(15),
        color: colors.lightColor
    },
    unlockedText: {
        fontSize: scale(16),
        color: colors.lightColor
    }
});
