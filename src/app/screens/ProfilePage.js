import React, {Component} from 'react';

import {ActivityIndicator, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scale} from "react-native-size-matters";
import * as colors from '../constants/colors';
import * as images from '../constants/images';
import Icon from 'react-native-vector-icons/AntDesign';
import DogListItem from '../components/dogListItem';
import {Button} from "react-native-elements";
import {Styles} from '../constants/styles';
import {Actions} from "react-native-router-flux";
import RNFetchBlob from 'rn-fetch-blob';
import I18n from '../i18n/i18n';
import PetTypeModal from "../components/petTypeModal";

let ApiService = require('../utils/APIService');

export default class ProfilePage extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            loading: true,
            profileImage: '',
            username: '',
            pets: [],
            modalVisible: false,
        }
    }

    componentWillMount(): void {
        this._getProfile();
        this._getPets();
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        console.log('should refresh ', nextProps.refresh);
        if (nextProps.refresh === true) {
            this._getPets();
        }
    }

    _getProfile = () => {
        ApiService.getProfile().then((resp) => {
            console.log(resp.data);
            this.setState({
                loading: false,
                profileImage: resp.data.avatar,
                username: resp.data.name,
            }, () => {
                this._setupProfile()
            })
        }).catch((error) => {
            console.log('get profile error ', error);
        });
    };

    _getPets = () => {
        ApiService.getPets().then((resp) => {
            console.log('get pets resp: ', resp);
            this.setState({
                pets: resp.data.pets
            });
        }).catch((error) => {
            console.log('get pets error: ', error);
        })
    };

    _setupProfile = (url) => {
        RNFetchBlob
            .config({
                fileCache: true,
                appendExt: 'jpeg'
            })
            .fetch('GET', url, {})
            .then((res) => {
                console.log('The file saved to ', res.path());
                this.setState({
                    profileImage: Platform.OS === 'android' ? 'file://' + res.path() : '' + res.path()
                })
            });
    };

    _settingOnPress = () => {
        Actions.settingScene();
    };


    render() {
        if (!this.state.loading) {
            return (
                <View style={Styles.container}>
                    <View style={[styles.view1, {paddingTop: scale(30)}]}>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={{flex: 1,}} onPress={() => {
                                Actions.pop();
                            }}>
                                <Icon name={'arrowleft'} size={scale(30)} style={{color: colors.whiteColor}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this._settingOnPress()
                            }}>
                                <Icon name={'setting'} size={scale(30)} style={{color: colors.whiteColor}}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.view2}>
                            <Image
                                style={{width: scale(100), height: scale(100), borderRadius: scale(100) / 2}}
                                source={{uri: this.state.profileImage}}
                            />
                            <Text style={styles.username}>{this.state.username}</Text>
                        </View>
                    </View>


                    <FlatList
                        bounces={false}
                        contentContainerStyle={{paddingBottom: scale(60)}}
                        data={this.state.pets}
                        renderItem={({item}) => <DogListItem data={item}/>}/>

                    <View style={styles.buttonView}>
                        <Button title={I18n.t('new_pet_btn')}
                                onPress={() => {
                                    this.setState({modalVisible: true})
                                }}
                                buttonStyle={styles.petButtonStyle}
                                containerStyle={styles.petButtonContainer}/>
                    </View>

                    <Modal
                        animationType="node"
                        transparent={false}
                        visible={this.state.modalVisible}>
                        <View style={{position: 'absolute', top: '0%', alignSelf: 'center'}}>
                            <TouchableOpacity onPress={() => {
                                this.setState({modalVisible: false})
                            }}>
                                <Image width={0} height={0} source={images.bg_blurs}/>
                            </TouchableOpacity>
                            <View style={{position: 'absolute', top: '15%', alignSelf: 'center'}}>
                                <PetTypeModal
                                    callBack={() => {
                                        this.setState({
                                            modalVisible: false
                                        });
                                    }}
                                />
                            </View>
                        </View>
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
    view1: {
        height: scale(200),
        backgroundColor: colors.themeColor,
        padding: scale(16),
    },
    view2: {
        alignItems: 'center'
    },
    username: {
        color: colors.whiteColor,
        marginTop: scale(12),
        fontSize: scale(20)
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
