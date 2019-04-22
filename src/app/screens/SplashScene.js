import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {View, Platform, Alert, Button, SafeAreaView,} from 'react-native';
import {Actions} from "react-native-router-flux";
import * as utils from "../utils/commonUtil";
import * as requestService from "../utils/httpRequests";
import AsyncStorage from '@react-native-community/async-storage';

export default class SplashScene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasToken: false
        }
    }

    componentDidMount() {
        SplashScreen.hide();
        this._checkVersion();
    }

    _checkToken = async () => {
        try {
            let value = await AsyncStorage.getItem('jwtToken');
            if (value !== null) {
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
        requestService.checkVersion().then((resp) => {
            console.log(resp.data);
            let code = resp.data.code;
            if (code === 1) {
                this._checkToken()
            } else {
                //todo handle update
            }
        }).catch((error) => {
            console.log(error);
        })
    };

    render() {
        return (
            <View/>
        )
    }
}
