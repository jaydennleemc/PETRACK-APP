import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {View, Platform, Alert, Button, SafeAreaView} from 'react-native';
import {Actions} from "react-native-router-flux";
import * as utils from "../utils/CommonUtil";

export default class SplashScene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasToken: false
        }
    }

    componentDidMount() {
        // hide splash screen
        if (Platform.OS === 'android') {
            SplashScreen.hide();
        }
        this._checkToken();
    }

    _checkToken = () => {
        if (utils.getJWTToken() !== null) {
            this.setState({
                hasToken: true
            }, () => {
                if (this.state.hasToken === true) {
                    Actions.reset('homeScene');
                } else {
                    Actions.replace('registerScene');
                }
            });
        }
    };

    render() {
        return (
            <View/>
        )
    }
}
