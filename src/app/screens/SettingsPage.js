import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    Text,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native';
import * as colors from '../constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {scale} from "react-native-size-matters";
import {Styles} from "../constants/styles";
import {Button} from "react-native-elements";
import {Actions} from "react-native-router-flux";
import AsyncStorage from '@react-native-community/async-storage';

let ApiService = require('../utils/APIService');

export default class SettingsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: ''
        }
    }

    componentDidMount(): void {
        this._getProfile();
    }

    _getProfile = () => {
        ApiService.getProfile().then((resp) => {
            this.setState({
                username: resp.data.name,
                email: resp.data.email
            })
        }).catch((error) => {
            console.log('get profile error: ', error);
        })
    };


    _signOut = () => {
        let yes = {
            text: 'Yes', onPress: () => {
                AsyncStorage.clear().then(() => {
                    Actions.reset('registerScene');
                })
            }
        };
        let no = {text: 'No', style: 'cancel'};

        Alert.alert('Sign Out', 'Do you want to sign out ?',
            [yes, no],
            {cancelable: false}
        );
    };

    render() {
        return (
            <View style={Styles.container}>
                <SafeAreaView/>
                <TouchableOpacity
                    onPress={() => {
                        Actions.pop();
                    }}
                    style={{marginLeft: scale(16), marginTop: scale(16)}}>
                    <Icon name={'arrowleft'} size={scale(30)} style={{color: colors.blackColor}}/>
                </TouchableOpacity>

                <View style={styles.view1}>
                    <Text style={styles.settingText}>Setting</Text>
                </View>

                <ScrollView bounces={false}>
                    <View>
                        {/* Name Field */}
                        <View style={styles.body}>
                            <Text style={{color: colors.lightColor}}>Name</Text>
                            <TextInput
                                editable={false}
                                style={{
                                    borderBottomColor: colors.greyColor,
                                    borderBottomWidth: 1,
                                    height: scale(30),
                                }}>{this.state.username}</TextInput>
                        </View>

                        {/* Account Field */}
                        <View style={styles.body}>
                            <Text style={{color: colors.lightColor}}>Account</Text>
                            <TextInput
                                editable={false}
                                textContentType={'emailAddress'}
                                style={{
                                    borderBottomColor: colors.greyColor,
                                    borderBottomWidth: 1,
                                    height: scale(30),
                                }}>{this.state.email}</TextInput>
                        </View>

                        {/* Version Field */}
                        <View style={styles.body}>
                            <Text style={{color: colors.lightColor}}>Version</Text>
                            <TouchableOpacity onPress={() => {
                                Alert.alert('Version was click!!!');
                            }}>
                                <TextInput
                                    pointerEvents="none"
                                    editable={false}
                                    style={{
                                        borderBottomColor: colors.greyColor,
                                        borderBottomWidth: 1,
                                        height: scale(30),
                                    }}>0.0.1</TextInput>
                            </TouchableOpacity>
                        </View>

                        {/* Help Filed */}
                        <View style={styles.body}>
                            <Text style={{color: colors.lightColor}}>Help</Text>
                            <TouchableOpacity onPress={() => {
                                Alert.alert('Help was click!!!')
                            }}>
                                <TextInput
                                    pointerEvents="none"
                                    editable={false}
                                    style={{
                                        borderBottomColor: colors.greyColor,
                                        borderBottomWidth: 1,
                                        height: scale(30),
                                    }}>Report
                                    Bug</TextInput>
                            </TouchableOpacity>
                        </View>

                        {/* Contact Filed */}
                        <View style={styles.body}>
                            <Text style={{color: colors.lightColor}}>Contact</Text>
                            <TouchableOpacity onPress={() => {
                                Alert.alert('Contact was click!!!')
                            }}>
                                <TextInput
                                    pointerEvents="none"
                                    editable={false}
                                    style={{
                                        borderBottomColor: colors.greyColor,
                                        borderBottomWidth: 1,
                                        height: scale(30),
                                    }}> About US</TextInput>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.buttonView}>
                    <Button title={'Sign out'}
                            onPress={() => {
                                this._signOut();
                            }}
                            buttonStyle={styles.petButtonStyle}
                            containerStyle={styles.petButtonContainer}/>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    view1: {
        margin: scale(16),
        height: scale(50)
    },
    settingText: {
        fontSize: scale(20)
    },
    body: {
        margin: scale(16),

    },
    buttonView: {
        width: '100%',
        position: 'absolute',
        bottom: scale(16),
    },
    petButtonStyle: {
        borderRadius: 25,
        backgroundColor: colors.greyColor
    },
    petButtonContainer: {
        marginHorizontal: scale(16)
    }
});
