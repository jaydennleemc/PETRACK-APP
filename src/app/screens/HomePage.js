import React, {Component} from 'react';

import {StyleSheet, View, SafeAreaView, Text, Alert} from 'react-native';
import {scale} from "react-native-size-matters";
import * as colors from '../constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import * as images from '../constants/images';
import {Button} from "react-native-elements";
import {Styles} from '../constants/styles';
import Toolbar from "../components/toolbar";


export default class HomePage extends Component {
    render() {
        return (
            <View style={Styles.container}>
                <SafeAreaView/>
                {/* App bar */}
                <Toolbar title={'PETRACK'} disableLeft={true}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({});