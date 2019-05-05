import React, {Component, PureComponent} from 'react';

import {ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scale} from "react-native-size-matters";
import * as colors from '../constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import * as images from '../constants/images';
import {Button} from "react-native-elements";
import {Styles} from '../constants/styles';
import {Actions} from "react-native-router-flux";
import RNFetchBlob from 'rn-fetch-blob'

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
                        <Button title={'Get a new pet'}
                                onPress={() => {
                                    Actions.addDogScene();
                                }}
                                buttonStyle={styles.petButtonStyle}
                                containerStyle={styles.petButtonContainer}/>
                    </View>

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

class DogListItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            pet: this.props.data
        }
    }

    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };


    _renderGridViewItem = (value1, value2) => {
        return (
            <View style={{flexDirection: 'column'}}>
                <Text>{value1}</Text>
                <Text style={{color: colors.greyColor, marginTop: scale(16)}}>{value2}</Text>
            </View>
        );
    };

    render() {
        return (
            <TouchableOpacity onPress={() => {
                Actions.profileDetailScene({pet: this.state.pet});
            }}>
                <View style={listStyles.container}>
                    <Image source={images.dog1}/>
                    <View style={listStyles.view}>
                        <Text style={listStyles.dogName}>{this.state.pet.name}</Text>

                        <View style={listStyles.gridView}>
                            {this._renderGridViewItem('345', 'Steps')}
                            {this._renderGridViewItem('345', 'Bags')}
                            {this._renderGridViewItem('345', 'Clip')}
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )
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

const listStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: scale(8)
    },
    view: {
        flex: 1,
        marginHorizontal: scale(16)
    },
    dogName: {
        marginTop: scale(16),
        marginLeft: scale(8),
    },
    gridView: {
        marginTop: scale(50),
        marginHorizontal: scale(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
