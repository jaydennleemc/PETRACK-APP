import React, {Component} from 'react';
import DatePicker from 'react-native-date-picker';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from "../constants/styles";

export default class CustomDatePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        }
    }

    render() {
        return (
            <View>
                <SafeAreaView/>
                <View>

                </View>
                <View style={{alignSelf: 'center', shadowOpacity: 0.1, backgroundColor: 'white', borderRadius: 25}}>
                    <DatePicker
                        mode={'date'}
                        date={this.state.date}
                        onDateChange={date => this.setState({date})}
                    />
                    <View style={[Styles.horizontalLine, {marginTop: 0}]}/>
                    <View style={{flexDirection: 'row', margin: 16}}>
                        <TouchableOpacity style={{flex: 1}} onPress={() => {
                            this.props.confirmPress(this.state.date);
                        }}>
                            <Text style={{textAlign: 'center'}}>Confirm</Text>
                        </TouchableOpacity>
                        <View style={Styles.verticalLine}/>
                        <TouchableOpacity style={{flex: 1}} onPress={this.props.cancelPress}>
                            <Text style={{textAlign: 'center'}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
