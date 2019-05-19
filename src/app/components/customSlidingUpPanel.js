import React, {Component} from 'react';

import {Animated, StyleSheet, Text, View} from 'react-native';
import {scale, verticalScale} from "react-native-size-matters";
import {Styles} from "../constants/styles";
import SlidingUpPanel from "rn-sliding-up-panel";
import * as colors from "../constants/colors";

// import styles from './styles';

export default class CustomSlidingUpPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dispenserInfo: this.props.dispenserInfo
        }
    }

    show() {
        this._panel.show(scale(220))
    }

    refreshData(data) {
        console.log('data refreshed');
        console.log(data);
    }

    render() {
        return (
            <View style={{backgroundColor: colors.whiteColor}}>
                <SlidingUpPanel
                    ref={c => this._panel = c}
                    animatedValue={new Animated.Value(0.1)}
                    draggableRange={{top: scale(220), bottom: 0}}>
                    <View style={styles.container}>
                        <View style={styles.deviceContainer}>
                            <Text style={styles.deviceTitle}>Dispenser:</Text>
                            <Text style={styles.deviceContent}>0013</Text>
                        </View>
                        <View style={Styles.horizontalLine}/>
                        <View style={styles.deviceContainer}>
                            <Text style={styles.deviceTitle}>Distance:</Text>
                            <Text style={styles.deviceContent}>231m</Text>
                        </View>
                        <View style={Styles.horizontalLine}/>

                        <View style={styles.deviceContainer}>
                            <Text style={styles.deviceTitle}>Surplus bags:</Text>
                            <Text style={styles.deviceContent}>345</Text>
                        </View>
                        <View style={Styles.horizontalLine}/>
                        <View style={styles.deviceContainer}>
                            <Text style={styles.deviceTitle}>Last used time:</Text>
                            <Text style={styles.deviceContent}>3 days</Text>
                        </View>
                        <View style={Styles.horizontalLine}/>
                    </View>
                </SlidingUpPanel>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        shadowOpacity: 0.25,
        backgroundColor: 'white',
        // alignItems: 'center',
    },
    deviceContainer: {
        flexDirection: 'row',
        marginTop: verticalScale(8)
    },
    deviceTitle: {
        flex: 1,
        paddingLeft: scale(8),
        fontSize: scale(16),
        color: colors.lightColor,
        marginTop: scale(8),
        marginLeft: scale(8)
    },
    deviceContent: {
        flex: 1,
        textAlign: 'right',
        paddingRight: scale(8),
        fontSize: scale(16),
        color: colors.blackColor,
        marginTop: scale(8),
        marginRight: scale(8)
    }
});
