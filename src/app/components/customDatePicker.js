import React, { Component } from 'react';
import DatePicker from 'react-native-date-picker';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Styles } from "../constants/styles";

export default class CustomDatePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            selectedDate: new Date()
        }
    }

    render() {
        return (
            <View>
                <SafeAreaView />
                <View>

                </View>
                <View style={{ alignSelf: 'center', shadowOpacity: 0.1, backgroundColor: 'white', borderRadius: 25 }}>
                    <DatePicker

                        mode={'date'}
                        maximumDate={this.state.date}
                        date={this.state.selectedDate}
                        onDateChange={date => this.setState({ selectedDate: date })}
                    />
                    <View style={[Styles.horizontalLine, { marginTop: 0 }]} />
                    <View style={{ flexDirection: 'row', margin: 16 }}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                            this.props.confirmPress(this.state.date);
                        }}>
                            <Text style={{ textAlign: 'center', fontSize:18 }}>Confirm</Text>
                        </TouchableOpacity>
                        <View style={Styles.verticalLine} />
                        <TouchableOpacity style={{ flex: 1 }} onPress={this.props.cancelPress}>
                            <Text style={{ textAlign: 'center', fontSize:18 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
