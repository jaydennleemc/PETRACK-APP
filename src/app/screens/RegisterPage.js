import React, {Component} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as colors from '../constants/colors';
import * as images from '../constants/images';
import {Styles} from "../constants/styles";
import {Actions} from "react-native-router-flux";
import {AccessToken, LoginManager} from "react-native-fbsdk";
import {scale, verticalScale} from 'react-native-size-matters';
import Permissions from 'react-native-permissions'
import AsyncStorage from "@react-native-community/async-storage";
import I18n from '../i18n/i18n';

let ApiService = require('../utils/APIService');

export default class RegisterPage extends Component {

    facebookPermission = ['email', 'user_birthday', 'user_friends', 'user_gender', 'user_location'];

    constructor(props) {
        super(props);
        this.state = {
            cameraPermission: '',
            photoPermission: ''
        }
    }

    componentDidMount() {
        this._requestPermission();
    }

    _requestPermission = () => {
        // Returns once the user has chosen to 'allow' or to 'not allow' access
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        Permissions.request('photo').then(response => {
            this.setState({photoPermission: response});
        });

        Permissions.request('camera').then(response => {
            this.setState({cameraPermission: response});
        });
    };

    _checkCameraAndPhotos = () => {
        //response is an object mapping type to permission
        Permissions.checkMultiple(['camera', 'photo']).then(response => {
            this.setState({
                cameraPermission: response.camera,
                photoPermission: response.photo,
            });
        })
    };

    _fbAuth = () => {
        LoginManager.logInWithReadPermissions(this.facebookPermission).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    AccessToken.getCurrentAccessToken().then(async function (data) {
                        try {
                            let token = data.accessToken.toString();
                            console.log('Facebook Token: ', token);
                            // send facebook token to server
                            ApiService.facebookAuth(token).then(async function (resp) {
                                console.log(resp.data);
                                let jwtToken = resp.data.jwt_token;
                                ApiService.setupJWTToken(jwtToken);
                                console.log('JWT Token: ', jwtToken);
                                // store jwt token to AsyncStorage
                                await AsyncStorage.setItem('jwtToken', jwtToken).then(() => {
                                    setTimeout(() => {
                                        Actions.reset('homeScene');
                                    }, 1000)
                                })
                            }).catch((error) => {
                                console.log('Request JWT Token Error: ', error)
                            });
                        } catch (error) {
                            console.log('Facebook Authentication Error: ', error)
                        }
                    });
                    console.log("Login success with permissions: " + result.grantedPermissions.toString());
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    };

    _gotoAgreementView = () => {
        Actions.push('agreementScene');
    };

    render() {
        return (
            <View style={Styles.containerWithThemeColor}>
                <SafeAreaView/>
                {/*  Logo */}
                <View style={styles.logoContainer}>
                    <Image
                        resizeMode={"contain"}
                        style={{width: scale(250), height: scale(200)}}
                        source={images.logo}/>
                </View>

                <View style={{flex: 1}}/>

                {/*  Buttons */}
                <View style={styles.bottomContainer}>

                    <View style={styles.image}>
                        <TouchableOpacity onPress={() => {
                            this._fbAuth()
                        }}>
                            <Image
                                resizeMode={"contain"}
                                style={styles.image}
                                source={images.register_facebook}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.image}>
                        <TouchableOpacity onPress={() => {
                            Actions.registerPhoneScene();
                        }}>
                            <Image
                                resizeMode={'contain'}
                                style={styles.image}
                                source={images.register_phone}/>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={{marginTop:verticalScale(20)}} onPress={() => {
                        this._gotoAgreementView()
                    }}>
                        <Text style={styles.termsText}>{I18n.t('terms_conditions')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '30%'
    },
    bottomContainer: {
        flexDirection: 'column',
        marginBottom: verticalScale(60),
        alignItems: 'center',

    },
    image: {
        paddingHorizontal:scale(16),
        marginTop: scale(8),
        width: '100%',
        height: scale(60),
    },
    termsText: {
        marginTop: scale(10),
        fontSize: scale(18),
        color: colors.whiteColor
    }
});
