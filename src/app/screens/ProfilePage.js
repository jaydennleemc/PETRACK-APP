import React, {Component, PureComponent} from 'react';

import {View, StyleSheet, SafeAreaView, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import {scale} from "react-native-size-matters";
import * as colors from '../constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import * as images from '../constants/images';
import {Button} from "react-native-elements";
import {Styles} from '../constants/styles';


export default class ProfilePage extends Component {
    render() {
        return (
            <View style={Styles.container}>
                <SafeAreaView/>
                <View style={styles.view1}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{flex: 1,}}>
                            <Icon name={'arrowleft'} size={scale(30)} style={{color: colors.whiteColor}}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name={'setting'} size={scale(30)} style={{color: colors.whiteColor}}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.view2}>
                        <Image source={images.UserProfile}/>
                        <Text style={styles.username}>Alison Cooper</Text>
                    </View>

                </View>


                <FlatList
                    bounces={false}
                    contentContainerStyle={{paddingBottom:scale(60)}}
                    data={[{key: 'a'}, {key: 'b'}, {key: 'a'}, {key: 'b'}, {key: 'a'}, {key: 'b'}, {key: 'a'}, {key: 'b'}]}
                    renderItem={({item}) => <DogListItem/>}/>


                <View style={styles.buttonView}>
                    <Button title={'Get a new pet'}
                            buttonStyle={styles.petButtonStyle}
                            containerStyle={styles.petButtonContainer}/>
                </View>

            </View>
        );
    }
}

class DogListItem extends PureComponent {

    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };


    _renderGridViewItem = (value1, value2) => {
        return(
            <View style={{flexDirection: 'column'}}>
                <Text>{value1}</Text>
                <Text style={{color:colors.greyColor, marginTop:scale(16)}}>{value2}</Text>
            </View>
        );
    }

    render() {
        return (
            <TouchableOpacity>
                <View style={listStyles.container}>
                    <Image source={images.Dog1}/>
                    <View style={listStyles.view}>
                        <Text style={listStyles.dogName}>DogName</Text>

                        <View style={listStyles.gridView}>
                            {this._renderGridViewItem('345', 'steps')}
                            {this._renderGridViewItem('345', 'steps')}
                            {this._renderGridViewItem('345', 'steps')}
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    view1: {
        height: scale(200),
        backgroundColor: colors.themeColor,
        padding: scale(16),
    },
    view2: {
        alignItems: 'center'
    },
    username: {
        color: colors.whiteColor,
        marginTop: scale(16),
        fontSize: scale(20)
    },
    buttonView: {
        width: '100%',
        position: 'absolute',
        bottom: scale(16),
    },
    petButtonStyle: {
        borderRadius: 25,
        backgroundColor: colors.greyColor
    },
    petButtonContainer: {
        marginHorizontal: scale(16)
    }
});

const listStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: scale(8)
    },
    view: {
        flex: 1,
        marginHorizontal: scale(16)
    },
    dogName:{
      marginTop:scale(16),
      marginLeft:scale(8),
    },
    gridView:{
        marginTop:scale(50),
        marginHorizontal:scale(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});