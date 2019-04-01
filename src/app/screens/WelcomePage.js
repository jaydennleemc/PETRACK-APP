import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {View, Platform, Alert, Button, SafeAreaView} from 'react-native';
import {Actions} from "react-native-router-flux";

export default class WelcomePage extends Component {
    componentDidMount() {

        // hide splash screen
        if (Platform.OS == 'android') {
            SplashScreen.hide();
        }

        // automate jump to next screen
        setTimeout(()=>{
            this._goRegisterScene();
        },0)
    }


    _goRegisterScene = () => {
        Actions.replace('registerScene');
    }

    render() {
        return (
            <View/>
        )
    }
}
