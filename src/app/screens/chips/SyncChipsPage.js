import React, {Component} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import CustomToolbar from "../../components/customToolbar";
import * as colors from "../../constants/colors";
import I18n from "../../i18n/i18n";
import * as images from "../../constants/images";
import {scale} from "react-native-size-matters";
import {Button} from "react-native-elements";

export default class SyncChipsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            syncState: 'sync'
        }
    }

    componentDidMount() {
    }


    render() {
        return (
            <View>
                <SafeAreaView/>
                <CustomToolbar
                    rightIcon={'ios-settings'}
                    title={I18n.t('pair_chips_title')}
                    titleColor={colors.lightColor}
                    rightIconColor={colors.lightColor}
                    leftIconColor={colors.lightColor}/>

                <View style={styles.imageView}>
                    <Image resizeMode={"contain"} style={styles.image} source={images.chips}/>
                </View>
                <Button title={I18n.t(this.state.syncState)}
                        onPress={() => {

                        }}
                        buttonStyle={styles.syncButtonStyle}
                        containerStyle={styles.syncButtonContainer}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    syncButtonStyle: {
        borderRadius: 25,
        backgroundColor: colors.greyColor
    },
    syncButtonContainer: {
        marginTop: scale(50),
        marginHorizontal: scale(55)
    }

});
