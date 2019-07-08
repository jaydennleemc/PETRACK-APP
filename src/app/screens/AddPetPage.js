import React, {Component} from 'react';

import {
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
import CustomDatePicker from '../components/customDatePicker';
import {Dropdown} from 'react-native-material-dropdown';
import moment from "moment";
import I18n from '../i18n/i18n';


let ApiService = require('../utils/APIService');

export default class AddPetPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            birthdayDate: new Date(),
            name: '',
            gender: 'M',
            type: this.props.dogType,
            birthday: '',
            weight: '3.4',
        }
    }

    _addDog = () => {
        const {name, gender, type, birthday, weight,} = this.state;

        ApiService.addPet(name, gender, type, birthday, weight)
            .then((resp) => {
                console.log('add pet resp', resp);
                if (resp.data.code === 0) {
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
                            <Text style={{color: colors.lightColor}}>{I18n.t('pet_name')}</Text>
                            <TextInput
                                onChangeText={(text) => {
                                    this.setState({
                                        name: text
                                    })
                                }}
                                style={{
                                    borderBottomColor: colors.greyColor,
                                    borderBottomWidth: 1,
                                    height: scale(30),
                                }}>{this.state.name}</TextInput>
                        </View>

                        {/* Dog Gender */}
                        <View style={styles.body}>
                            <Text style={{color: colors.lightColor}}>{I18n.t('pet_gender')}</Text>
                            <Dropdown
                                onChangeText={(text) => {
                                    this.setState({
                                        gender: text
                                    })
                                }}
                                value={'M'}
                                data={[{value: 'M',}, {value: 'F',}]}
                            />
                        </View>

                        {/* Birthday Field */}
                        <View style={styles.body}>
                            <Text style={{color: colors.lightColor}}>{I18n.t('pet_birthday')}</Text>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    modalVisible: true
                                })
                            }}>
                                <TextInput
                                    editable={false}
                                    pointerEvents="none"
                                    style={{
                                        borderBottomColor: colors.greyColor,
                                        borderBottomWidth: 1,
                                        height: scale(30),
                                    }}> {this.state.birthday}</TextInput>
                            </TouchableOpacity>
                        </View>

                        {/* Dog clip */}
                        <View style={styles.body}>
                            <Text style={{color: colors.lightColor}}>{I18n.t('pet_chip')}</Text>
                            <TouchableOpacity onPress={() => {
                                Actions.push('setupChipsScene');
                            }}>
                                <TextInput
                                    pointerEvents="none"
                                    editable={false}
                                    style={{
                                        borderBottomColor: colors.greyColor,
                                        borderBottomWidth: 1,
                                        height: scale(30),
                                    }}>Set Clip</TextInput>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>


                <View style={styles.buttonView}>
                    <Button title={I18n.t('add_pet_btn')}
                            onPress={() => {
                                this._addDog();
                            }}
                            buttonStyle={styles.petButtonStyle}
                            containerStyle={styles.petButtonContainer}/>
                </View>

                {/* Popup birthday picker */}
                <Modal
                    animationType="node"
                    transparent={true}
                    visible={this.state.modalVisible}>
                    <View style={{position: 'absolute', top: '30%', alignSelf: 'center'}}>
                        <CustomDatePicker
                            confirmPress={(date) => {
                                this.setState({
                                    modalVisible: false,
                                    birthdayDate: date,
                                    birthday: moment(date).format('DD-MM-YYYY')
                                })
                            }}
                            cancelPress={() => {
                                this.setState({modalVisible: false})
                            }}
                        />
                    </View>
                </Modal>
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
        height:scale(40),
        borderRadius: 25,
        backgroundColor: colors.greyColor
    },
    petButtonContainer: {
        marginHorizontal: scale(16)
    }
});
