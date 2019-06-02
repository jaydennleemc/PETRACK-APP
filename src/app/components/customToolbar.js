import React from 'react';

import {Platform, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scale} from "react-native-size-matters";
import * as colors from '../constants/colors.js';

class CustomToolbar extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            leftIcon: (this.props.leftIcon != null) ? this.props.leftIcon : 'arrowleft',
            rightIcon: this.props.rightIcon != null ? this.props.rightIcon : '',
            disableLeftIcon: this.props.disableLeft,
            disableRightIcon: this.props.disableRight,
            leftIconColor: this.props.leftIconColor,
            rightIconColor: this.props.rightIconColor,
            title: this.props.title,
            titleColor: this.props.titleColor
        }
    }

    _renderLeft = () => {

        if (this.state.disableLeftIcon !== true) {
            return (
                <TouchableOpacity style={{alignSelf: 'center'}} onPress={this.props.leftIconOnPress}>
                    {this.props.disableLeftIcon != null ? this.props.disableLeftIcon :
                        <Icon name={this.state.leftIcon} size={scale(24)}
                              style={{color: this.state.rightIconColor === null ? colors.lightColor : this.state.leftIconColor}}/>}
                </TouchableOpacity>
            );
        } else {
            return (<View style={{width: scale(24)}}/>)
        }
    };

    _renderRight = () => {

        if (this.state.disableRightIcon !== true) {
            return (
                <TouchableOpacity style={{alignSelf: 'center'}} onPress={this.props.rightIconOnPress}>
                    <Ionicons name={this.state.rightIcon} size={scale(24)}
                              style={{color: this.state.rightIconColor === null ? colors.lightColor : this.state.rightIconColor}}/>
                </TouchableOpacity>);
        } else {
            return (<View style={{width: scale(24)}}/>)
        }

    };

    render() {
        return (
            <View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: scale(16),
                    height: (Platform.OS === "android") ? scale(50) : scale(40)
                }}>

                    {this._renderLeft()}

                    <Text style={{
                        alignSelf: 'center',
                        textAlign: 'center',
                        fontSize: scale(this.props.fontSize == null ? scale(16) : this.props.fontSize),
                        color: (this.props.titleColor == null) ? '#000' : this.state.titleColor
                    }}>{this.state.title}</Text>

                    {this._renderRight()}

                </View>
                <View style={{borderBottomWidth: 1, borderBottomColor: colors.lightColor}}/>
            </View>
        );
    }
}

export default CustomToolbar;
