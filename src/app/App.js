import React, {Component} from 'react';

import {View, StyleSheet} from 'react-native';
import {Actions, Scene, Router, Stack} from 'react-native-router-flux';
import WelcomePage from "./screens/WelcomePage";
import RegisterPage from "./screens/RegisterPage";
import RegisterPhonePage from "./screens/RegisterPhonePage";
import HomePage from "./screens/HomePage";
import ProfilePage from "./screens/ProfilePage";
import ProfileDetailsPage from "./screens/ProfileDetailsPage";
import ScanPage from "./screens/ScanPage";
import SettingsPage from "./screens/SettingsPage";


export default class extends Component {


    render() {
        return (
            <Router>
                <Scene hideNavBar={true}>
                    <Stack key="root" initial>
                        <Scene key={"splashScene"} component={WelcomePage} hideNavBar={true}/>
                        <Scene key={"registerScene"} component={RegisterPage} hideNavBar={true}/>
                        <Scene key={"registerPhoneScene"} component={RegisterPhonePage} hideNavBar={true}/>
                    </Stack>

                    <Stack key={"home"}>
                        <Scene key={"homeScene"} component={HomePage} hideNavBar={true}/>
                        <Scene key={"profileScene"} component={ProfilePage} hideNavBar={true}/>
                        <Scene key={"profileDetailScene"} component={ProfileDetailsPage} hideNavBar={true}/>
                        <Scene key={"scanScene"} component={ScanPage} hideNavBar={true}/>
                        <Scene key={"settingScene"} component={SettingsPage} hideNavBar={true}/>
                    </Stack>
                </Scene>
            </Router>
        );
    }
}
