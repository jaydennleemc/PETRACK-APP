import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {View, Platform, Alert, Button, SafeAreaView,} from 'react-native';
import {Actions} from "react-native-router-flux";

import AsyncStorage from '@react-native-community/async-storage';

let ApiService = require('../utils/APIService');

export default class SplashScene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasToken: false
        }
    }

    componentDidMount() {
        this._checkVersion();
        SplashScreen.hide();
    }

    _checkToken = async () => {
        try {
            let value = await AsyncStorage.getItem('jwtToken');
            if (value !== null) {
                ApiService.setupJWTToken(value);
                console.log('jwt Token ', value);
                this.setState({
                    hasToken: true
                }, () => {
                    Actions.reset('homeScene');
                })
            } else {
                Actions.replace('registerScene');
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    _checkVersion = () => {
        ApiService.checkVersion().then((resp) => {
            console.log(resp.data);
            let code = resp.data.code;
            ApiService.setupCloudVersion('/v1');
            if (code === 1) {
                this._checkToken()
            } else {
                //todo handle update
            }
        }).catch((error) => {
            console.log('check version error ',error);
        })
    };

    render() {
        return (
            <View/>
        )
    }
}
