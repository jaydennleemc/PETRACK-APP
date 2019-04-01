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

        this._goRegisterScene();
    }

    _goRegisterScene = ()=>{
        Actions.registerScene();
    }

    render() {
        return (
            <View>
                <SafeAreaView/>
                <Button title={'sfs'} onPress={()=>{
                    this._goRegisterScene();
                }}/>
            </View>
        )
    }
}
