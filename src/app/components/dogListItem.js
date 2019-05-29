import React, {PureComponent} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as colors from "../constants/colors";
import {scale} from "react-native-size-matters";
import {Actions} from "react-native-router-flux";
import * as images from "../constants/images";

export default class DogListItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            pet: this.props.data
        }
    }

    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };


    _renderGridViewItem = (value1, value2) => {
        return (
            <View style={{flexDirection: 'column'}}>
                <Text>{value1}</Text>
                <Text style={{color: colors.greyColor, marginTop: scale(16)}}>{value2}</Text>
            </View>
        );
    };

    render() {
        return (
            <TouchableOpacity onPress={() => {
                Actions.profileDetailScene({pet: this.state.pet});
            }}>
                <View style={listStyles.container}>
                    <Image style={{width: scale(96), height: scale(130)}} source={images.dog1}/>
                    <View style={listStyles.view}>
                        <Text style={listStyles.dogName}>{this.state.pet.name}</Text>

                        <View style={listStyles.gridView}>
                            {this._renderGridViewItem('0', 'Steps')}
                            {this._renderGridViewItem('0', 'Bags')}
                            {this._renderGridViewItem('N/A', 'Chips')}
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const listStyles = StyleSheet.create({
    container: {
        borderRadius:scale(5),
        flexDirection: 'row',
        margin: scale(8),
        backgroundColor:'white',
        marginHorizontal:scale(16),
    },
    view: {
        flex: 1,
        marginHorizontal: scale(16)
    },
    dogName: {
        marginTop: scale(16),
        marginLeft: scale(8),
    },
    gridView: {
        marginTop: scale(50),
        marginHorizontal: scale(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
