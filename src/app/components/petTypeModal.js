import React, {Component} from 'react';
import {scale} from "react-native-size-matters";
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as images from '../constants/images';
import I18n from '../i18n/i18n';
import {Button} from "react-native-elements";
import {Actions} from "react-native-router-flux";
import * as colors from "../constants/colors";

export default class PetTypeModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            catSelect: false,
            dogSelect: false,

        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <SafeAreaView/>
                <View>

                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>{I18n.t('pet_modal_title')}</Text>

                    <View style={{flexDirection: 'row', marginTop: scale(32)}}>
                        <View style={{flex: 1}}>
                            <Image
                                style={styles.imageView}
                                source={images.ic_cat}/>
                            <Text style={styles.typeName}>{I18n.t('cat')}</Text>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    catSelect: !this.state.catSelect,
                                    dogSelect: false,

                                })
                            }}>
                                <Image
                                    style={styles.checkImage}
                                    source={this.state.catSelect ? images.ic_checked : images.ic_check}/>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex: 1}}>
                            <Image
                                style={styles.imageView}
                                source={images.ic_dog}/>
                            <Text style={styles.typeName}>{I18n.t('dog')}</Text>

                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    dogSelect: !this.state.dogSelect,
                                    catSelect: false,
                                })
                            }}>
                                <Image
                                    style={styles.checkImage}
                                    source={this.state.dogSelect ? images.ic_checked : images.ic_check}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Button title={I18n.t('ok_btn')}
                            onPress={() => {
                                Actions.addDogScene({dogType: (this.state.catSelect) ? 'cat' : 'dog'});
                                this.props.callBack();
                            }}
                            disabled={!(this.state.dogSelect || this.state.catSelect)}
                            buttonStyle={!(this.state.dogSelect || this.state.catSelect) ? styles.enablePetButtonStyle : styles.disablePetButtonStyle}
                            containerStyle={styles.petButtonContainer}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: scale(300),
        height: scale(330),
        backgroundColor: 'white',
    },
    title: {
        fontSize: scale(18),
        color: colors.lightColor,
        alignSelf: 'center',
        marginTop: scale(32)
    },
    imageView: {
        width: scale(60),
        height: scale(55),
        alignSelf: 'center',
    },
    typeName: {
        alignSelf: 'center',
        marginTop: scale(8),
    },
    checkImage: {
        marginTop: scale(16),
        alignSelf: 'center',
        width: scale(35),
        height: scale(35)
    },
    enablePetButtonStyle: {
        borderRadius: 50,
        height: scale(45),
        width: scale(199),
        backgroundColor: colors.greyColor
    },
    disablePetButtonStyle: {
        borderRadius: 50,
        height: scale(45),
        width: scale(199),
        backgroundColor: colors.themeColor
    },
    petButtonContainer: {
        marginTop: scale(40),
        marginBottom: scale(40),
        alignSelf: 'center'
    }
});
