import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity

} from 'react-native';
import * as colors from '../constants/colors';
import * as images from '../constants/images';
import {Styles} from "../constants/styles";
import {Actions} from "react-native-router-flux";


export default class RegisterPage extends Component {
    render() {
        return (
            <View style={Styles.containerWithThemeColor}>
                <SafeAreaView/>
                {/*  Logo */}
                <View style={styles.logoContainer}>
                    <Image source={images.Logo}/>
                </View>

                <View style={{flex: 1}}/>

                {/*  Buttons */}
                <View style={styles.bottomContainer}>
                    <View style={styles.image}>
                        <TouchableOpacity>
                            <Image source={images.Register_Facebook}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.image}>
                        <TouchableOpacity onPress={()=>{
                            Actions.registerPhoneScene();
                        }}>
                            <Image source={images.Register_Phone}/>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity>
                        <Text style={styles.termsText}>Terms & Conditions</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '30%'
    },
    bottomContainer: {
        flexDirection: 'column',
        marginBottom: 30,
        alignItems: 'center',

    },
    image: {
        height: 60,
    },
    termsText: {
        marginTop: 10,
        fontSize: 18,
        color: colors.whiteColor
    }
});