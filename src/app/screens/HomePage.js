import React, {Component} from 'react';

import {StyleSheet, View, SafeAreaView, Text, Image, TouchableOpacity} from 'react-native';
import {scale} from "react-native-size-matters";
import * as colors from '../constants/colors';
import * as images from '../constants/images';
import {Styles} from '../constants/styles';
import Toolbar from "../components/toolbar";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import {Actions} from "react-native-router-flux";


export default class HomePage extends Component {
    render() {
        return (
            <View style={Styles.container}>
                <SafeAreaView/>
                {/* App bar */}
                <Toolbar title={'PETRACK'}
                         rightIconOnPress={()=>{
                             Actions.push("profileScene")
                         }}
                         disableLeft={true}/>

                {/* Map View */}
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

                {/* Scan Button */}
                <View style={styles.scanButtonView}>
                    <TouchableOpacity onPress={()=>{
                        Actions.push("scanScene")
                    }}>
                        <Image source={images.Scan_btn}/>
                    </TouchableOpacity>
                    <Text style={styles.scanText}>Scan the QR code</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scanButtonView:{
        position:'absolute',
        bottom:scale(40),
        alignItems:'center',
        width:'100%'
    },
    scanText:{
        color:colors.themeColor,
        marginTop:scale(8),
        alignSelf:'center'
    }
});