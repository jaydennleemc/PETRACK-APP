import React, {Component} from 'react';

import {View, StyleSheet, SafeAreaView, TouchableOpacity, Image, ImageBackground} from 'react-native';
import {scale} from "react-native-size-matters";
import * as colors from '../constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import * as images from '../constants/images';
import * as Animatable from 'react-native-animatable';
import {Button} from "react-native-elements";
import {Styles} from '../constants/styles';

export default class ScanPage extends Component {
    render() {
        return (
            <View style={{backgroundColor: colors.lightColor, flex: 1}}>
                <SafeAreaView/>
                <TouchableOpacity style={{paddingLeft: scale(16)}}>
                    <Icon name={'arrowleft'} size={scale(30)} style={{color: colors.whiteColor}}/>
                </TouchableOpacity>

                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: colors.lightColor,
                    justifyContent: 'center',
                }}>
                    <ImageBackground source={images.Scan_square} style={{width: scale(200), height: scale(200), }}>
                        <Animatable.View animation="fadeInDown" duration={1000} iterationCount={100}>
                            <Image source={images.Scan_line} style={{width: scale(200), marginTop:scale(120)}} resizeMode={'stretch'}/>
                        </Animatable.View>
                    </ImageBackground>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({});