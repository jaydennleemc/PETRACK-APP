import React, {PureComponent} from "react";
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as colors from "../constants/colors";
import {scale} from "react-native-size-matters";
import * as images from "../constants/images";
import I18n from "../i18n/i18n";

export default class DeviceListItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            devices: this.props.data
        }
    }

    _onPressItem = () => {

        let pair = {
            text: I18n.t('pair_btn'), onPress: () => {

            }
        };
        let cancel = {text: I18n.t('cancel_btn'), style: 'cancel'};

        Alert.alert(I18n.t('BL_pair_request'), I18n.t('BL_pair_message'), [pair, cancel])

    };

    render() {
        return (
            <TouchableOpacity onPress={() => {
                this._onPressItem()
            }}>
                <View style={listStyles.container}>
                    <Image resizeMode={"contain"} style={listStyles.image} source={images.chips}/>
                    <View style={listStyles.view}>

                        <View style={listStyles.rowView}>
                            <Text style={listStyles.title}>Chips Number</Text>
                            <Text style={listStyles.distance}>NEAYBY</Text>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const listStyles = StyleSheet.create({
    container: {
        borderRadius: scale(5),
        flexDirection: 'row',
        margin: scale(8),
        backgroundColor: 'white',
        height: scale(130),
        marginHorizontal: scale(16),
    },
    image: {
        width: scale(100),
        height: scale(100),
        marginLeft: scale(16),
        alignSelf: 'center'
    },
    view: {
        flex: 1,
        marginHorizontal: scale(16)
    },
    rowView: {
        marginTop: scale(40),
        marginHorizontal: scale(8),
        justifyContent: 'space-between',
    },
    title: {
        fontSize: scale(16)
    },
    distance: {
        marginTop: scale(16),
        fontSize: scale(14),
        color: colors.lightColor
    }
});
