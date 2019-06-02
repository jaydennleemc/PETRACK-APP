import React, {Component} from 'react'
import {ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native'
import CustomToolbar from "../../components/customToolbar";
import * as colors from '../../constants/colors';
import * as images from '../../constants/images';
import {scale} from 'react-native-size-matters';
import I18n from '../../i18n/i18n';

export default class SetChipsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }


    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView/>
                <CustomToolbar
                    title={''}
                    disableRight={true}
                    leftIconColor={colors.lightColor}/>

                <View style={styles.image}>
                    <Image style={{alignSelf: 'center'}} source={images.chips} width={scale(200)} height={scale(200)}/>
                    <Text style={styles.chips}>{I18n.t('chips')}</Text>
                </View>

                <View style={{flex: 0.4}}>
                    <View style={{flex: 1}}/>
                    <View style={styles.searchView}>
                        <Text style={styles.searching}>{I18n.t('searching')}</Text>
                        <ActivityIndicator size="small" color={colors.lightColor}/>
                    </View>
                </View>

            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    image: {
        flex: 1,
        marginTop:scale(50),
        justifyContent: 'center'
    },
    chips: {
        alignSelf: 'center',
        marginTop: scale(16),
        color: colors.lightColor,
        opacity: 0.85,
        fontSize: scale(16)
    },
    searchView: {
        flexDirection: 'row',
        marginBottom: scale(80),
        justifyContent: 'center'
    },
    searching: {
        alignSelf: 'center',
        fontSize: scale(12),
        color: colors.lightColor,
        opacity: 0.9,
        marginRight: scale(16)
    }
});
