import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {View, Platform, Alert, Button, SafeAreaView} from 'react-native';
import {Actions} from "react-native-router-flux";
import * as utils from "../utils/commonUtil";
import * as requestService from "../utils/httpRequests";

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

    _checkVersion = () => {
        requestService.checkVersion().then((resp) => {
            console.log(resp.data);
            let code = resp.data.code;
            if (code === 1) {
                this._checkToken();
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
