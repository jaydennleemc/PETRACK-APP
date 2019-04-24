import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import * as colors from '../constants/colors';
import {Button} from 'react-native-elements';
import {Actions} from "react-native-router-flux";

let ApiService = require('../utils/APIService');

export default class RegisterPhonePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            canSendSMS: true,
            timer: 30,
            phoneNumFocus: false,
            smsCodeFocus: false,
            loginButton: true,
            phoneNumText: '',
            smsCodeText: '',
        }
    }

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
                    this._requestSMSCodeTimer();
                }}>
                    <Text style={styles.sendPINText}>Send PIN</Text>
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
        ApiService.sendSMS(this.state.phoneNumText, ApiService.cloudVersion).then(function (resp) {

        }).catch((error) => {
            console.log('Request SMS Code Error: ', error)
        });

    };

    _phoneLogin = () => {
        ApiService.validateSMS(this.state.phoneNumText, this.state.smsCodeText, ApiService.cloudVersion).then(function (resp) {

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
                    <Text style={styles.phoneText}>Enter Your Phone#</Text>
                    <Text style={styles.text1}>Phone Number</Text>
                    {/* Phone Number Field */}
                    <TextInput
                        style={[styles.phoneNumText,
                            {borderBottomColor: this.state.phoneNumFocus === true ? colors.themeColor : colors.lightColor}]}
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
                        placeholder={'12345678'}
                        maxLength={8}
                        keyboardType={'number-pad'}
                        clearButtonMode={'while-editing'}/>
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
                                   placeholder={'PIN Number'}/>

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
                                Actions.reset("homeScene")
                            }}
                            disabled={this.state.loginButton}
                            buttonStyle={styles.loginButton}/>
                </View>
                <View style={{backgroundColor: colors.themeColor, height: scale(160), width: 0}}/>
                <View style={styles.view3}>
                    <View style={styles.underline2}/>
                    <TouchableOpacity onPress={() => {
                        Actions.pop();
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
