import React, {Component} from 'react';

import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scale} from "react-native-size-matters";
import * as colors from '../constants/colors.js';

class Toolbar extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    _renderLeft = () => {

        if (this.props.disableLeft != true) {
           return (
               <TouchableOpacity style={{alignSelf: 'center'}} onPress={this.props.leftIconOnPress}>
                   {this.props.leftIcon != null ? this.props.leftIcon :
                       <Icon name={"arrowleft"} size={scale(24)} style={{color: colors.lightColor}}/>}
               </TouchableOpacity>
           );
        }
    }

    _renderRight = () => {

        if (this.props.disableRight != true) {
            return(
                <TouchableOpacity style={{alignSelf: 'center'}} onPress={this.props.rightIconOnPress}>
                    <Ionicons name={'ios-person'} size={scale(24)} style={{color: colors.lightColor}}/>
                </TouchableOpacity>);
        }

    }

    render() {
        return (
            <View>
                <View style={{flexDirection: 'row', paddingHorizontal: scale(16), height: scale(40)}}>

                    {this._renderLeft()}

                    <Text style={{alignSelf: 'center', flex: 1, textAlign: 'center', fontSize: scale(this.props.fontSize == null? 20 : this.props.fontSize)}}>{this.props.title}</Text>

                    {this._renderRight()}

                </View>
                <View style={{borderBottomWidth: 1, borderBottomColor: colors.lightColor}}/>
            </View>
        );
    }
}

export default Toolbar;