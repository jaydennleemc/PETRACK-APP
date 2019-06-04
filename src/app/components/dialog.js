import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scale} from 'react-native-size-matters'
import * as colors from "../constants/colors";

export default class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
                <View style={styles.horizontalLine}/>
                <Text style={styles.content}>{this.props.content}</Text>
                <View style={{flex: 1}}/>
                <View style={{
                    flexDirection: 'row',
                    marginTop: scale(16),
                    height: scale(40),
                }}>

                    <TouchableOpacity style={styles.button} onPress={() => this.props.confirmOnPress}>
                        <Text style={{alignSelf: 'center',}}>{this.props.confirmText}</Text>
                    </TouchableOpacity>

                    <View style={styles.verticalLine}/>

                    <TouchableOpacity style={styles.button} onPress={() => this.props.cancelOnPress}>
                        <Text style={{alignSelf: 'center'}}>{this.props.cancelText}</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: scale(32),
        borderRadius: 25,
        height: scale(220),
        backgroundColor: 'white',
        position: 'absolute',
        top: '30%',
        bottom: 0,
        right: 0,
        left: 0,
    },
    title: {
        padding: 16,
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center'
    },
    content: {
        fontSize: 22,
        textAlign: 'center',
        alignSelf: 'center',
        padding: 16
    },
    horizontalLine: {
        height: 1,
        backgroundColor: colors.lightColor
    },
    verticalLine: {
        borderLeftWidth: 1,
        borderLeftColor: colors.lightColor,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});
