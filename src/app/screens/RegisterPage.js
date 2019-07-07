import React, {Component} from 'react';
import {AlertStatic as Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as colors from '../constants/colors';
import * as images from '../constants/images';
import {Styles} from "../constants/styles";
import {Actions} from "react-native-router-flux";
import {AccessToken, LoginManager} from "react-native-fbsdk";
import {scale, verticalScale} from 'react-native-size-matters';
import Permissions from 'react-native-permissions'
import I18n from '../i18n/i18n';
import LoadingDialog from "../components/dialog/loadDialog";
import * as AsyncStorage from "react-native/Libraries/Storage/AsyncStorage";

let ApiService = require('../utils/APIService');

export default class RegisterPage extends Component {

    facebookPermission = ['email', 'user_birthday', 'user_friends', 'user_gender', 'user_location'];

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            cameraPermission: '',
            photoPermission: '',
            locationPermission: ''
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

        Permissions.request('location').then(response => {
            this.setState({locationPermission: response});
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

    _showLoading = (value) => {
        this.setState({loading: value})
    };

    _getAccessTokenFromFacebook = () => {
        LoginManager.logInWithReadPermissions(this.facebookPermission).then(
            (result) => {
                if (result.isCancelled) {
                    console.log(`Login cancelled`);
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        this._showLoading(true);
                        let token = data.accessToken.toString();
                        console.log(`Facebook Token: ${token}`);
                        // send facebook token to server
                        this._verifyFacebookToken(token);
                    });
                    console.log("Login success with permissions: " + result.grantedPermissions.toString());
                }
            },
            function (error) {
                console.log(`Login fail with error: ${error}`);
            }
        );
    };

    _authWithServer = (token) => {
        return new Promise((resolve, reject) => {
            ApiService.facebookAuth(token).then(function (resp) {
                if (resp.data.code === 0) {
                    let jwtToken = resp.data.token;
                    ApiService.setupJWTToken(jwtToken);
                    console.log(`JWT Token: ${jwtToken}`);
                    // store jwt token to AsyncStorage
                    try {
                        AsyncStorage.setItem('jwtToken', jwtToken).then(() => {
                            console.log('jwtToken saved');
                            resolve(true);
                        })
                    } catch (error) {
                        console.log(`Request JWT Token Error: ${error}`)
                    }
                } else {
                    resolve(resp);
                }
            })
        })
    };

    _verifyFacebookToken = (token) => {
        this._authWithServer(token).then((result) => {
            if (result) {
                setTimeout(() => {
                    Actions.reset('homeScene');
                }, 500);
                setTimeout(() => {
                    this._showLoading(false);
                }, 200)
            } else {
                Alert.alert(
                    'Error',
                    result.data.message,
                    [{text: 'OK', onPress: () => console.log('OK Pressed')},],
                    {cancelable: false},
                );
            }
        })
    };


    _gotoAgreementView = () => {
        Actions.push('agreementScene');
    };

    _gotoPrivacyView = () => {
        Actions.push('privacyScene');
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
                            this._getAccessTokenFromFacebook()
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

                    <TouchableOpacity style={{marginTop: verticalScale(20)}} onPress={() => {
                        this._gotoAgreementView()
                    }}>
                        <Text style={styles.termsText}>{I18n.t('terms_conditions')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginTop: verticalScale(10)}} onPress={() => {
                        this._gotoPrivacyView()
                    }}>
                        <Text style={styles.privacyText}>{I18n.t('privacy_policy')}</Text>
                    </TouchableOpacity>
                </View>

                {/* Loading Dialog */}
                <LoadingDialog
                    visible={this.state.loading}/>
            </View>
        )
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
        paddingHorizontal: scale(16),
        marginTop: scale(8),
        width: '100%',
        height: scale(60),
    },
    termsText: {
        marginTop: scale(10),
        fontSize: scale(14),
        color: colors.whiteColor
    },
    privacyText: {
        marginTop: scale(1),
        fontSize: scale(14),
        color: colors.whiteColor
    }
});
