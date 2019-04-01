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
                    <Stack key="root">
                        <Scene key={"splashScene"} initial component={WelcomePage} hideNavBar={true}/>
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


// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';
//
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
//
// export default class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
