import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import { WebView } from 'react-native-webview';
import Toolbar from "../components/toolbar";
import {Actions} from "react-native-router-flux";
import * as requestService from '../utils/HttpRequests';
import * as colors from '../constants/colors';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';


export default class Agreement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            html: ''
        }
    }

    componentDidMount() {
        this._loadAgreement();
    }

    _loadAgreement = () => {
        APIs.getAgreement().then((resp) => {
            this.setState({
                html:resp.data
            },()=> {
                console.log(this.state.html)
            });

        }).catch((error) => {
            console.log(error)
        });
    };

    render() {
        return (
            <View style={{backgroundColor:colors.white}}>
                <SafeAreaView>
                <Toolbar
                    leftIconOnPress={() => {
                        Actions.pop();
                    }}
                    title={"Agreement"}
                    disableRight={true}/>

                <View style={{width:'100%', height:'100%', paddingBottom:scale(92)}}>
                    <WebView source={{html: this.state.html}} />
                </View>
                </SafeAreaView>
            </View>
        );
    }
}
