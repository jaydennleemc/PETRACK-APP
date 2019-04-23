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

    onSuccess(e) {
        Linking
            .openURL(e.data)
            .catch(err => console.error('An error occured', err));
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
                    backgroundColor: colors.lightColor,
                    justifyContent: 'center',
                }}>

                    <QRCodeScanner
                        onRead={this.onSuccess.bind(this)}
                    />
                    {/*<ImageBackground source={images.Scan_square} style={{width: scale(200), height: scale(200),}}>*/}
                    {/*    <Animatable.View animation="fadeInDown" duration={1000} iterationCount={100}>*/}
                    {/*        <Image source={images.Scan_line} style={{width: scale(200), marginTop: scale(120)}}*/}
                    {/*               resizeMode={'stretch'}/>*/}
                    {/*    </Animatable.View>*/}
                    {/*</ImageBackground>*/}
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});

