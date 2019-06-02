import React, {Component} from 'react';

import {SafeAreaView, View} from 'react-native';
import CustomToolbar from "../../components/customToolbar";
import * as colors from "../../constants/colors";

export default class PairChipsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }


    render() {
        return (
            <View>
                <SafeAreaView/>
                <CustomToolbar
                    title={''}
                    disableRight={true}
                    leftIconColor={colors.lightColor}/>
            </View>
        );
    }
}
