import React, {Component} from 'react';
import {StyleSheet, View, SafeAreaView, TouchableOpacity, Text, TextInput, ScrollView, Alert} from 'react-native';
import * as colors from '../constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {scale} from "react-native-size-matters";
import {Styles} from "../constants/styles";
import {Button} from "react-native-elements";


export default class SettingsPage extends Component {


    render() {
        return (
            <View style={Styles.container}>
                <SafeAreaView/>
                <TouchableOpacity
                    onPress={() => {

                    }}
                    style={{marginLeft: scale(24), marginTop: scale(16)}}>
                    <Icon name={'arrowleft'} size={scale(30)} style={{color: colors.greyColor}}/>
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
                                style={{borderBottomColor: colors.greyColor, borderBottomWidth: 1, height: scale(30),}}>Alison
                                Cooper</TextInput>
                        </View>

                        {/* Account Field */}
                        <View style={styles.body}>
                            <Text style={{color: colors.lightColor}}>Account</Text>
                            <TextInput
                                textContentType={'emailAddress'}
                                style={{
                                    borderBottomColor: colors.greyColor,
                                    borderBottomWidth: 1,
                                    height: scale(30),
                                }}>petrack@petrack.com</TextInput>
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
                            <TouchableOpacity onPress={()=>{
                                Alert.alert('Help was click!!!')
                            }}>
                            <TextInput
                                pointerEvents="none"
                                editable={false}
                                style={{borderBottomColor: colors.greyColor, borderBottomWidth: 1, height: scale(30),}}>Report
                                Bug</TextInput>
                            </TouchableOpacity>
                        </View>

                        {/* Contact Filed */}
                        <View style={styles.body}>
                            <Text style={{color: colors.lightColor}}>Contact</Text>
                            <TouchableOpacity onPress={()=>{
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