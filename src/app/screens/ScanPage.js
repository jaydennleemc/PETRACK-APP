import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity, Image, ImageBackground, Text} from 'react-native';
import {scale} from "react-native-size-matters";
import * as colors from '../constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import * as images from '../constants/images';
import * as Animatable from 'react-native-animatable';
import {Actions} from "react-native-router-flux";
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class ScanPage extends Component {

    constructor(props) {
        super(props)
    }

    //  handle QR Code Scanner
    onSuccess(e) {

    }

    render() {
        return (
            <View style={{backgroundColor: colors.lightColor, flex: 1}}>
                <SafeAreaView/>
                <TouchableOpacity style={{paddingLeft: scale(16)}} onPress={() => {
                    Actions.pop();
                }}>
                    <Icon name={'arrowleft'} size={scale(30)} style={{color: colors.whiteColor}}/>
                </TouchableOpacity>

                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: colors.blackColor,
                    justifyContent: 'center',
                }}>
                    <QRCodeScanner
                        cameraStyle={{width: '100%', height: '100%'}}
                        fadeIn={true}
                        onRead={this.onSuccess.bind(this)}/>

                    <View style={styles.scannerView}>
                        <ImageBackground source={images.scan_square} style={{width: scale(200), height: scale(200),}}>
                            <Animatable.View animation="fadeInDown" duration={1000} iterationCount={100}>
                                <Image source={images.scan_line} style={{width: scale(200), marginTop: scale(120)}}
                                       resizeMode={'stretch'}/>
                            </Animatable.View>
                        </ImageBackground>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scannerView: {
        position: 'absolute',
        top: '30%',
        bottom: '25%'
    }
});

