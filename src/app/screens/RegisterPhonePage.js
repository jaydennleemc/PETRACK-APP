import React, {Component} from 'react';
import {Image, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {scale} from 'react-native-size-matters';
import * as colors from '../constants/colors';
import * as images from '../constants/images';
import {Button} from 'react-native-elements';
import {Actions} from "react-native-router-flux";
import {AccessToken, LoginManager} from "react-native-fbsdk";
import AsyncStorage from "@react-native-community/async-storage";
import PhoneInput from 'react-native-phone-input'
import CountryPicker from 'react-native-country-picker-modal';
import I18n from '../i18n/i18n';

let ApiService = require('../utils/APIService');

export default class RegisterPhonePage extends Component {

    constructor(props) {
        super(props);
        this.onPressFlag = this.onPressFlag.bind(this);
        this.selectCountry = this.selectCountry.bind(this);
        this.state = {
            canSendSMS: true,
            timer: 30,
            phoneNumFocus: false,
            smsCodeFocus: false,
            loginButton: true,
            phonePrefix:'',
            phoneNumText: '',
            smsCodeText: '',
            pickerData:null,
            cca2: 'US',
        }
    }

    componentDidMount() {
        this.setState({
            pickerData: this.phone.getPickerData()
        })
    }

    onPressFlag() {
        this.countryPicker.openModal();
    }

    selectCountry(country) {
        this.phone.selectCountry(country.cca2.toLowerCase());
        this.setState({ cca2: country.cca2 });
    }

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
                                if(resp.data.code === 0){
                                    console.log(resp.data);
                                    let jwtToken = resp.data.jwt_token;
                                    ApiService.setupJWTToken(jwtToken);
                                    console.log('JWT Token: ', jwtToken);
                                    // store jwt token to AsyncStorage
                                    await AsyncStorage.setItem('jwtToken', jwtToken).then(() => {
                                        setTimeout(() => {
                                            Actions.reset('homeScene');
                                        }, 500)
                                    })
                                }else {
                                    Alert.alert(
                                        'Error',
                                        resp.data.message,
                                        [{text: 'OK', onPress: () => console.log('OK Pressed')},],
                                        {cancelable: false},
                                      );
                                }
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

    _resetSMSTimer = () => {
        setInterval(() => {
            if (this.state.timer === 0) {
                this.setState({
                    canSendSMS: true,
                });
                clearInterval()
            } else {
                this.setState((preState) => ({timer: preState.timer - 1}));
            }
        }, 1000)
    };

    _requestSMSCodeTimer = () => {
        this.setState({
            canSendSMS: false,
        }, () => {
            this._resetSMSTimer();
        })
    };

    _renderSMSComp = () => {
        if (this.state.canSendSMS === true) {
            return (
                <TouchableOpacity style={styles.sendPIN} onPress={() => {
                    if (this.state.phoneNumText.length === 8) {
                        this._requestSMSCode();
                        this._requestSMSCodeTimer();
                    }
                }}>
                    <Text style={styles.sendPINText}>{I18n.t('pin_button')}</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.sendPIN} disabled={true}>
                    <Text style={[styles.sendPINText, {
                        alignSelf: 'center',
                        color: colors.themeColor
                    }]}>{this.state.timer}</Text>
                </TouchableOpacity>
            )
        }
    };

    _enableLoginButton = () => {
        if (this.state.phoneNumText.length === 8 && this.state.smsCodeText.length === 4) {
            this.setState({
                loginButton: false
            })
        } else {
            this.setState({
                loginButton: true
            })
        }
    };

    _requestSMSCode = () => {
        ApiService.sendSMS('+852' + this.state.phoneNumText).then(function (resp) {
            if(resp.data.code === 0) {

            }else {

            }
            console.log('RegisterPhonePage requestSMSCode ', resp);
        }).catch((error) => {
            console.log('Request SMS Code Error: ', error)
        });

    };

    _phoneLogin = () => {
        ApiService.validateSMS(this.state.phoneNumText, this.state.smsCodeText).then(function (resp) {
            if(resp.data.code === 0){

            }else {
                
            }
            console.log('RegisterPhonePage phoneLogin ', resp)
        }).catch((error) => {
            console.log('Mobile Phone Login Error: ', error);
        })
    };

    render() {
        return (
            <View>
                <SafeAreaView/>
                {/* back button */}
                <TouchableOpacity onPress={() => {
                    Actions.pop();
                }}>
                    <Icon name={"arrowleft"} size={scale(20)} style={{marginLeft: 16, marginTop: 16}}/>
                </TouchableOpacity>

                <View style={styles.view1}>
                    <Text style={styles.phoneText}>{I18n.t('phone_title')}</Text>
                    <Text style={styles.text1}>{I18n.t('phone_number')}</Text>

                    {/* Phone Number */}
                    <View style={{flexDirection:'row'}}>
                       {/* Phone Number Prefix  */}

                       <View style={{width:scale(88), height:scale(30), marginTop:scale(28) }}>
                           <PhoneInput
                               ref={(ref) => {
                                   this.phone = ref;
                               }}
                               onPressFlag={this.onPressFlag}/>

                           <CountryPicker
                               ref={(ref) => {
                                   this.countryPicker = ref;
                               }}
                               onChange={value => this.selectCountry(value)}
                               translation="eng"
                               cca2={this.state.cca2}>
                               <View />
                           </CountryPicker>
                       </View>

                        <TextInput
                            style={[styles.phoneNumText,
                                {borderBottomColor: this.state.phoneNumFocus === true ? colors.themeColor : colors.lightColor,
                                    flex:1}]}
                            onFocus={() => {
                                this.setState({
                                    phoneNumFocus: true,
                                    smsCodeFocus: false,
                                })
                            }}
                            onChangeText={(text) => {
                                this.setState({phoneNumText: text}, () => {
                                    this._enableLoginButton();
                                })
                            }}
                            placeholder={I18n.t('phone_placeholder')}
                            keyboardType={'number-pad'}
                            clearButtonMode={'while-editing'}/>
                    </View>
                    <View style={styles.view2}>
                        {/* SMS Code Field */}
                        <TextInput style={styles.smsCodeText}
                                   onFocus={() => {
                                       this.setState({
                                           smsCodeFocus: true,
                                           phoneNumFocus: false,
                                       })
                                   }}
                                   onChangeText={(text) => {
                                       this.setState({smsCodeText: text}, () => {
                                           this._enableLoginButton();
                                       })
                                   }}
                                   maxLength={4}
                                   placeholder={I18n.t('pin_placeholder')}/>

                        {/*    Render Send PIN or Timer       */}
                        {this._renderSMSComp()}
                    </View>
                    <View
                        style={[styles.underLine,
                            {backgroundColor: this.state.smsCodeFocus === true ? colors.themeColor : colors.lightColor}]}/>

                    <View style={{marginTop: scale(40)}}/>

                    {/*   Login Button     */}
                    <Button title={'LOGIN'}
                            onPress={() => {
                                this._phoneLogin();
                            }}
                            disabled={this.state.loginButton}
                            buttonStyle={styles.loginButton}/>
                </View>
                <View style={{backgroundColor: colors.themeColor, height: scale(160), width: 0}}/>
                <View style={styles.view3}>
                    <View style={styles.underline2}/>
                    <TouchableOpacity onPress={() => {
                        this._fbAuth();
                    }}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{color: colors.greyColor}}>Login with </Text>
                            <Text style={{color: colors.themeColor}}>Facebook</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.underline2}/>
                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    view1: {
        margin: scale(24)
    },
    phoneText: {
        marginTop: scale(30),
        fontSize: scale(28),
    },
    text1: {
        marginTop: scale(20),
        color: colors.lightColor
    },
    phoneNumText: {
        marginTop: scale(16),
        height: scale(40),
        borderBottomWidth: scale(1),
    },
    view2: {
        marginTop: scale(16),
        flexDirection: 'row'
    },
    smsCodeText: {
        flex: 3,
        marginTop: scale(16)
    },
    sendPIN: {
        alignContent: 'flex-end',
        flex: 1,
        marginTop: scale(16)
    },
    sendPINText: {
        color: colors.lightColor
    },
    underLine: {
        marginTop: scale(8),
        height: scale(1),
    },
    loginButton: {
        borderRadius: 25,
        height: scale(40),
        backgroundColor: colors.themeColor,
    },
    view3: {
        marginLeft: scale(16),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    underline2: {
        height: 1,
        width: 25,
        backgroundColor: colors.lightColor,
        marginHorizontal: scale(8)
    }
});
