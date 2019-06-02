import React, {Component} from 'react';

import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CustomToolbar from "../../components/customToolbar";
import * as colors from "../../constants/colors";
import I18n from '../../i18n/i18n';
import * as images from "../../constants/images";
import {scale} from 'react-native-size-matters';
import {Button} from "react-native-elements";

export default class PairChipsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            process: '80%'
        }
    }

    componentDidMount() {
    }

    _renderReadyButton = () => {
        if (this.state.process === '100%') {
            return (
                <View>
                    <View style={{flex: 1}}/>
                    <Button title={I18n.t('chips_ready_btn')}
                            onPress={() => {

                            }}
                            buttonStyle={styles.chipsButtonStyle}
                            containerStyle={styles.chipsButtonContainer}/>
                </View>
            )
        }
    };

    render() {
        return (
            <View>
                <SafeAreaView/>
                <CustomToolbar
                    title={I18n.t('pair_chips_title')}
                    titleColor={colors.lightColor}
                    disableRight={true}
                    leftIconColor={colors.lightColor}/>

                <View style={[styles.processLine, {width: this.state.process}]}/>

                <View style={styles.imageView}>
                    <Image resizeMode={"contain"} style={styles.image} source={images.chips}/>
                    <Text
                        style={styles.text}>{(this.state.process === '100%') ? I18n.t('chips_ready') : I18n.t('updating_chips')}</Text>
                </View>

                {this._renderReadyButton()}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    processLine: {
        height: 2,
        backgroundColor: colors.themeColor
    },
    imageView: {
        marginTop: '30%',
        alignSelf: 'center'
    },
    image: {
        width: scale(200),
        height: scale(200)
    },
    text: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 20,
        marginTop: scale(32),
        color: colors.lightColor
    },
    chipsButtonStyle: {
        borderRadius: 25,
        backgroundColor: colors.themeColor
    },
    chipsButtonContainer: {
        marginTop: '60%',
        marginHorizontal: scale(16)
    }

});
