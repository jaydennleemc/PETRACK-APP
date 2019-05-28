import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import CustomToolbar from "../components/customToolbar";
import {Actions} from "react-native-router-flux";
import * as colors from '../constants/colors';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

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
            this.setState({
                html: resp.data
            }, () => {
                console.log(this.state.html)
            });

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
