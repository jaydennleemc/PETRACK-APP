import React, {Component} from 'react';

import {
    Alert,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {scale} from "react-native-size-matters";
import * as colors from '../constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import * as images from '../constants/images';
import {Button} from "react-native-elements";
import {Styles} from '../constants/styles';
import {Actions} from "react-native-router-flux";

let ApiService = require('../utils/APIService');

export default class AddDogPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'bibian',
            gender: 'M',
            type: 'dog',
            birthday: '11-02-1997',
            weight: '3.4',
        }
    }

    _addDog = () => {
        const {name, gender, type, birthday, weight,} = this.state;

        ApiService.addPet(name, gender, type, birthday, weight)
            .then((resp) => {
                console.log('add pet resp', resp);
                this._backToPrevious({
                    refresh: true
                })

            }).catch((error) => {
            console.log(('cannot add dog error: ', error));
        })
    };

    _backToPrevious = (props) => {
        setTimeout(() => {
            Actions.refresh(props)
        }, 50);
        Actions.pop();
    };

    render() {
        return (
            <View style={Styles.container}>
                {/* ImageBackground with buttons */}
                <View style={styles.view1}>
                    <ImageBackground source={images.add_dog_bg} style={{width: '100%', height: scale(200)}}>
                        <SafeAreaView/>
                        <View style={{flexDirection: 'row', marginHorizontal: scale(16)}}>
                            <TouchableOpacity style={{flex: 1,}} onPress={() => {
                                Actions.pop();
                            }}>
                                <Icon name={'arrowleft'} size={scale(30)} style={{color: colors.whiteColor}}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name={'camera'} size={scale(30)} style={{color: colors.whiteColor}}/>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>

                {/* Body View */}

                <ScrollView bounces={false}>
                    <View>
                        {/* DogName Field */}
                        <View style={styles.body}>
                            <Text style={{color: colors.lightColor}}>Name</Text>
                            <TextInput
                                style={{
                                    borderBottomColor: colors.greyColor,
                                    borderBottomWidth: 1,
                                    height: scale(30),
                                }}>Dog Name</TextInput>
                        </View>

                        {/* Birthday Field */}
                        <View style={styles.body}>
                            <Text style={{color: colors.lightColor}}>Birthday</Text>
                            <TouchableOpacity onPress={() => {
                                Alert.alert('Birthday was click!!!');
                            }}>
                                <TextInput
                                    pointerEvents="none"
                                    editable={false}
                                    style={{
                                        borderBottomColor: colors.greyColor,
                                        borderBottomWidth: 1,
                                        height: scale(30),
                                    }}>02-02-2018</TextInput>
                            </TouchableOpacity>
                        </View>

                        {/* Today steps  */}
                        <View style={styles.body}>
                            <Text style={{color: colors.lightColor}}>Today Steps</Text>
                            <TouchableOpacity onPress={() => {
                                Alert.alert('Today Steps was click!!!');
                            }}>
                                <TextInput
                                    pointerEvents="none"
                                    editable={false}
                                    style={{
                                        borderBottomColor: colors.greyColor,
                                        borderBottomWidth: 1,
                                        height: scale(30),
                                    }}>999</TextInput>
                            </TouchableOpacity>
                        </View>

                        {/* Bags */}
                        <View style={styles.body}>
                            <Text style={{color: colors.lightColor}}>Bags</Text>
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
                                    }}>9</TextInput>
                            </TouchableOpacity>
                        </View>

                        {/* Chips */}
                        <View style={styles.body}>
                            <Text style={{color: colors.lightColor}}>Chips</Text>
                            <TouchableOpacity onPress={() => {
                                Alert.alert('Chips was click!!!');
                            }}>
                                <TextInput
                                    pointerEvents="none"
                                    editable={false}
                                    style={{
                                        borderBottomColor: colors.greyColor,
                                        borderBottomWidth: 1,
                                        height: scale(30),
                                    }}>Working</TextInput>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>


                <View style={styles.buttonView}>
                    <Button title={'Add'}
                            onPress={() => {
                                this._addDog();
                            }}
                            buttonStyle={styles.petButtonStyle}
                            containerStyle={styles.petButtonContainer}/>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
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
