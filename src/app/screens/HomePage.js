import React, {Component} from 'react';

import {StyleSheet, View, SafeAreaView, Text, Alert} from 'react-native';
import {scale} from "react-native-size-matters";
import * as colors from '../constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import * as images from '../constants/images';
import {Button} from "react-native-elements";
import {Styles} from '../constants/styles';
import Toolbar from "../components/toolbar";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'


export default class HomePage extends Component {
    render() {
        return (
            <View style={Styles.container}>
                <SafeAreaView/>
                {/* App bar */}
                <Toolbar title={'PETRACK'} disableLeft={true}/>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{flex: 1}}
                    region={{
                        latitude: 42.882004,
                        longitude: 74.582748,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    showsUserLocation={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});