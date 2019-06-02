import React, {Component} from 'react';

import {Router, Scene} from 'react-native-router-flux';
import SplashScene from "./screens/SplashScene";
import RegisterPage from "./screens/RegisterPage";
import RegisterPhonePage from "./screens/RegisterPhonePage";
import HomePage from "./screens/HomePage";
import ProfilePage from "./screens/ProfilePage";
import ProfileDetailsPage from "./screens/ProfileDetailsPage";
import ScanPage from "./screens/ScanPage";
import SettingsPage from "./screens/SettingsPage";
import AgreementPage from "./screens/AgreementPage";
import PrivacyPage from "./screens/PrivacyPage";
import AddDogPage from "./screens/AddDogPage";
import DeviceControlPage from "./screens/DeviceControlPage";
import SetChipsPage from "./screens/chips/SetChipsPage";
import FindChipsPage from "./screens/chips/FindChipsPage";
import PairChipsPage from "./screens/chips/PairChipsPage";

export default class extends Component {

    render() {
        return (
            <Router>
                <Scene hideNavBar={true}>
                    <Scene key={"splashScene"} component={SplashScene} hideNavBar={true}/>
                    <Scene key={"registerScene"} component={RegisterPage} hideNavBar={true}/>
                    <Scene key={"registerPhoneScene"} component={RegisterPhonePage} hideNavBar={true}/>
                    <Scene key={"agreementScene"} component={AgreementPage} hideNavBar={true}/>
                    <Scene key={"privacyScene"} component={PrivacyPage} hideNavBar={true}/>

                    <Scene key={"homeScene"} component={HomePage} hideNavBar={true}/>
                    <Scene key={"profileScene"} component={ProfilePage} hideNavBar={true}/>
                    <Scene key={"addDogScene"} component={AddDogPage} hideNavBar={true}/>
                    <Scene key={"profileDetailScene"} component={ProfileDetailsPage} hideNavBar={true}/>
                    <Scene key={"scanScene"} component={ScanPage} hideNavBar={true}/>
                    <Scene key={"deviceControlScene"} component={DeviceControlPage} hideNavBar={true}/>
                    <Scene key={"settingScene"} component={SettingsPage} hideNavBar={true}/>

                    {/* Chips */}
                    <Scene key={"setupChipsScene"} component={SetChipsPage} hideNavBar={true}/>
                    <Scene key={"findChipsScene"} component={FindChipsPage} hideNavBar={true}/>
                    <Scene key={"pairChipsScene"} component={PairChipsPage} hideNavBar={true}/>

                </Scene>
            </Router>
        );
    }
}
