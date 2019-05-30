import React from 'react';

import {Text, TouchableOpacity, View, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scale} from "react-native-size-matters";
import * as colors from '../constants/colors.js';

class CustomToolbar extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            leftIcon: this.props.disableLeft,
            rightIcon: this.props.disableRight,
            leftIconColor: this.props.leftIconColor,
            rightIconColor: this.props.rightIconColor,
            title: this.props.title
        }
    }

    _renderLeft = () => {

        if (this.state.leftIcon !== true) {
            return (
                <TouchableOpacity style={{alignSelf: 'center'}} onPress={this.props.leftIconOnPress}>
                    {this.props.leftIcon != null ? this.props.leftIcon :
                        <Icon name={"arrowleft"} size={scale(24)} style={{color: this.state.rightIconColor === null ? colors.lightColor : this.state.leftIconColor}}/>}
                </TouchableOpacity>
            );
        } else {
            return (<View style={{width: scale(24)}}/>)
        }
    };

    _renderRight = () => {

        if (this.state.rightIcon !== true) {
            return (
                <TouchableOpacity style={{alignSelf: 'center'}} onPress={this.props.rightIconOnPress}>
                    <Ionicons name={'ios-person'} size={scale(24)}
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
                    height: (Platform.OS === "android")? scale(50): scale(40)
                }}>

                    {this._renderLeft()}

                    <Text style={{
                        alignSelf: 'center',
                        textAlign: 'center',
                        fontSize: scale(this.props.fontSize == null ? scale(16) : this.props.fontSize)
                    }}>{this.state.title}</Text>

                    {this._renderRight()}

                </View>
                <View style={{borderBottomWidth: 1, borderBottomColor: colors.lightColor}}/>
            </View>
        );
    }
}

export default CustomToolbar;
