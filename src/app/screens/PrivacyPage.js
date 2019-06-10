import React, {Component} from 'react';
import {Alert, SafeAreaView, View} from 'react-native';
import {WebView} from 'react-native-webview';
import CustomToolbar from "../components/customToolbar";
import {Actions} from "react-native-router-flux";
import * as colors from '../constants/colors';
import {scale} from 'react-native-size-matters';

let ApiService = require('../utils/APIService');

export default class PrivacyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            html: ''
        }
    }

    componentDidMount() {
        this._loadPrivacyPolicy();
    }

    _loadPrivacyPolicy = () => {
        ApiService.getPrivacy().then((resp) => {
            console.log('get Privacy resp: ', resp.data);
            if (resp.data.code === 0) {
                this.setState({
                    html: resp.data
                });
            } else {
                Alert.alert(
                    'Error',
                    resp.data.message,
                    [{text: 'OK', onPress: () => console.log('OK Pressed')},],
                    {cancelable: false},
                );
            }

        }).catch((error) => {
            console.log(error)
        });
    };

    render() {
        return (
            <View style={{backgroundColor: colors.white}}>
                <SafeAreaView>
                    <CustomToolbar
                        leftIconOnPress={() => {
                            Actions.pop();
                        }}
                        title={"Privacy Policy"}
                        disableRight={true}/>

                    <View style={{width: '100%', height: '100%', paddingBottom: scale(92)}}>
                        <WebView source={{html: this.state.html}}/>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}
