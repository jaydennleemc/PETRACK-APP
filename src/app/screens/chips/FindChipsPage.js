import React, {Component} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CustomToolbar from "../../components/customToolbar";
import * as colors from "../../constants/colors";
import I18n from '../../i18n/i18n';
import {scale} from 'react-native-size-matters';
import DeviceListItem from "../../components/deviceListItem";

export default class FindChipsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            devices: ["aa", "bb"]
        }
    }

    componentDidMount() {
    }


    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView/>
                <CustomToolbar
                    title={I18n.t('find_your_device')}
                    titleColor={colors.lightColor}
                    disableRight={true}
                    leftIconColor={colors.lightColor}/>

                <Text style={styles.text}>{I18n.t('setup_device')}</Text>


                <FlatList
                    bounces={false}
                    contentContainerStyle={{marginTop:scale(16) ,paddingBottom: scale(60)}}
                    data={this.state.devices}
                    renderItem={({item}) => <DeviceListItem data={item}/>}/>


            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    text: {
        alignSelf: 'center',
        marginTop: scale(16),
        color: colors.lightColor
    }
});
