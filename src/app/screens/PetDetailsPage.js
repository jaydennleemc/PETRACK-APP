import React, {Component} from 'react';

import {
    ActivityIndicator,
    Alert,
    ImageBackground,
    Modal,
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
import I18n from '../i18n/i18n';
import Dialog from "../components/dialog";

let ApiService = require('../utils/APIService');

export default class PetDetailsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            petId: this.props.petId,
            pet: null,
            deletePetDialog: false
        }
    }

    componentDidMount() {
        this._getPetInfo()
    }

    _getPetInfo = () => {
        ApiService.getPet(this.state.petId).then((resp) => {
            console.log('get pet info: ', resp.data);
            if (resp.data.code === 0) {
                this.setState({
                    loading: false,
                    pet: resp.data.pet
                })
            } else {
                Alert.alert(
                    'Error',
                    resp.data.message,
                    [{text: 'OK', onPress: () => console.log('OK Pressed')},],
                    {cancelable: false},
                );
            }

        }).catch((error) => {
            console.log('get pet info error: ', error);
        })
    };

    _deletePet = () => {
        ApiService.deletePet(this.state.pet.id).then((resp) => {

            if (resp.data.code === 0) {
                console.log('delete pet resp: ', resp.data);
                this._backToPrevious({
                    refresh: true
                })
            } else {
                Alert.alert(
                    'Error',
                    resp.data.message,
                    [{text: 'OK', onPress: () => console.log('OK Pressed')},],
                    {cancelable: false},
                );
            }

        }).catch((error) => {
            console.log('delete pet error: ', error);
        });
    };

    _backToPrevious = (props) => {
        setTimeout(() => {
            Actions.refresh(props)
        }, 50);
        Actions.pop();
    };

    render() {
        if (!this.state.loading) {
            return (
                <View style={Styles.container}>
                    {/* ImageBackground with buttons */}
                    <View style={styles.view1}>
                        <ImageBackground source={images.dog2} style={{width: '100%', height: scale(200)}}>
                            <SafeAreaView/>
                            <View style={{flexDirection: 'row', marginHorizontal: scale(16)}}>
                                <TouchableOpacity style={{flex: 1,}} onPress={() => {
                                    this._backToPrevious({
                                        refresh: false
                                    });
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
                                <Text style={{color: colors.lightColor}}>{I18n.t('pet_name')}</Text>
                                <TextInput
                                    style={{
                                        borderBottomColor: colors.greyColor,
                                        borderBottomWidth: 1,
                                        height: scale(30),
                                    }}>{this.state.pet.name}</TextInput>
                            </View>

                            {/* Birthday Field */}
                            <View style={styles.body}>
                                <Text style={{color: colors.lightColor}}>{I18n.t('pet_birthday')}</Text>
                                <TouchableOpacity onPress={() => {
                                    // Alert.alert('Birthday was click!!!');
                                }}>
                                    <TextInput
                                        pointerEvents="none"
                                        editable={false}
                                        style={{
                                            borderBottomColor: colors.greyColor,
                                            borderBottomWidth: 1,
                                            height: scale(30),
                                        }}>{this.state.pet.birthdate}</TextInput>
                                </TouchableOpacity>
                            </View>

                            {/* Today steps  */}
                            <View style={styles.body}>
                                <Text style={{color: colors.lightColor}}>{I18n.t('pet_steps')}</Text>
                                <TouchableOpacity onPress={() => {
                                    // Alert.alert('Today Steps was click!!!');
                                }}>
                                    <TextInput
                                        pointerEvents="none"
                                        editable={false}
                                        style={{
                                            borderBottomColor: colors.greyColor,
                                            borderBottomWidth: 1,
                                            height: scale(30),
                                        }}>99</TextInput>
                                </TouchableOpacity>
                            </View>

                            {/* Bags */}
                            <View style={styles.body}>
                                <Text style={{color: colors.lightColor}}>{I18n.t("pet_bags")}</Text>
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
                                        }}>{this.state.pet.bagsUsed}</TextInput>
                                </TouchableOpacity>
                            </View>

                            {/* Chips */}
                            <View style={styles.body}>
                                <Text style={{color: colors.lightColor}}>{I18n.t('pet_chip')}</Text>
                                <TouchableOpacity onPress={() => {
                                    // Alert.alert('Chips was click!!!');
                                }}>
                                    <TextInput
                                        pointerEvents="none"
                                        editable={false}
                                        style={{
                                            borderBottomColor: colors.greyColor,
                                            borderBottomWidth: 1,
                                            height: scale(30),
                                        }}>{this.state.pet.clip === null ? 'N/A' : this.state.pet.clip}</TextInput>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ScrollView>


                    <View style={styles.buttonView}>
                        <Button title={I18n.t('pet_delete')}
                                onPress={() => {
                                    this.setState({
                                        deletePetDialog: true
                                    })
                                }}
                                buttonStyle={styles.petButtonStyle}
                                containerStyle={styles.petButtonContainer}/>
                    </View>
                    {/* Delete Pet Dialog */}
                    <Modal
                        animationType="node"
                        transparent={true}
                        visible={this.state.deletePetDialog}>
                        <Dialog
                            title={I18n.t('delete_pet_title')}
                            content={I18n.t('delete_pet_content')}
                            confirmText={I18n.t('dialog_yes_btn')}
                            cancelText={I18n.t('dialog_no_btn')}
                            confirmOnPress={() => {
                                this._deletePet()
                            }}
                            cancelOnPress={() => {
                                this.setState({
                                    deletePetDialog: false
                                })
                            }}
                        />
                    </Modal>
                </View>
            );
        } else {
            return (
                <View style={{
                    position: 'absolute',
                    top: '50%',
                    right: '45%'
                }}>
                    <ActivityIndicator size="large" color={colors.lightColor}/>
                </View>
            )
        }


    }
}

const styles = StyleSheet.create({
    body: {
        margin: scale(16),

    },
    buttonView: {
        width: '100%',
        position: 'absolute',
        bottom: scale(32),
    },
    petButtonStyle: {
        borderRadius: 25,
        backgroundColor: colors.greyColor
    },
    petButtonContainer: {
        marginHorizontal: scale(16)
    }
});
