import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {View} from 'react-native';


export default class WelcomePage extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }

    render() {
        return(
            <View/>
        )
    }
}
