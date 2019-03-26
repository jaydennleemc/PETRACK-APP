import React, {Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import * as colors from '../constants/Colors';
import {Button} from 'react-native-elements';


// import styles from './styles';

export default class RegisterPhonePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input1Focus: false,
            input2Focus: false,
            input1Text: '',
            input2Text: '',
        }
    }

    render() {
        return (
            <View>
                <SafeAreaView/>
                {/* back button */}
                <TouchableOpacity>
                    <Icon name={"arrowleft"} size={scale(20)} style={{marginLeft: 16, marginTop: 16}}/>
                </TouchableOpacity>

                <View style={styles.view1}>
                    <Text style={styles.phoneText}>Enter Your Phone#</Text>
                    <Text style={styles.text1}>Phone Number</Text>
                    <TextInput
                        style={[styles.textInput1, {borderBottomColor: this.state.input1Focus == true ? colors.themeColor : colors.lightColor}]}
                        onFocus={() => {
                            this.setState({input1Focus: true})
                        }}
                        onEndEditing={() => {
                            this.setState({input1Focus: false})
                        }}
                        placeholder={'12345678'}
                        maxLength={8}
                        keyboardType={'number-pad'}
                        clearButtonMode={'while-editing'}/>
                    <View style={styles.view2}>
                        <TextInput style={styles.textInput2}
                                   onFocus={() => {
                                       this.setState({input2Focus: true})
                                   }}
                                   placeholder={'PIN Number'}/>

                        <TouchableOpacity style={styles.sendPIN}>
                            <Text style={styles.sendPINText}>Send PIN</Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={[styles.underLine, {backgroundColor: this.state.input2Focus == true ? colors.themeColor : colors.lightColor}]}/>

                    <Button title={'LOGIN'}
                            buttonStyle={styles.buttonStyle1}/>
                </View>


                <View style={{backgroundColor: colors.themeColor,height:scale(160), width: 0}}/>

                <View style={styles.view3}>
                    <View style={styles.underline2}/>
                    <TouchableOpacity>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{color: colors.greyColor}}>Login with </Text>
                            <Text style={{color: colors.themeColor}}>Facebook</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.underline2}/>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    view1: {
        margin: scale(24)
    },
    phoneText: {
        marginTop: scale(30),
        fontSize: scale(28),
    },
    text1: {
        marginTop: scale(20),
        color: colors.lightColor
    },
    textInput1: {
        marginTop: scale(16),
        height: scale(40),
        borderBottomWidth: scale(1),
    },
    view2: {
        marginTop: scale(16),
        flexDirection: 'row'
    },
    textInput2: {
        flex: 3,
        marginTop: scale(16)
    },
    sendPIN: {
        alignContent: 'flex-end',
        flex: 1,
        marginTop: scale(16)
    },
    sendPINText: {
        color: colors.lightColor
    },
    underLine: {
        marginTop: scale(8),
        height: scale(1),
    },
    buttonStyle1: {
        marginTop: scale(60),
        borderRadius: 25,
        height: scale(40),
        backgroundColor: '#C7C7CC',
    },
    view3: {
        marginLeft: scale(16),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    underline2: {
        height: 1,
        width: 25,
        backgroundColor: colors.lightColor,
        marginHorizontal: scale(8)
    }
})