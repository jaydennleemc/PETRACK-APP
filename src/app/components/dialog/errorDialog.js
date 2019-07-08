import React, { Component } from 'react';
import { Text } from 'react-native';
import { scale } from 'react-native-size-matters'
import Dialog, { DialogButton, DialogContent, DialogFooter, DialogTitle } from 'react-native-popup-dialog';

export default class ErrorDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderFooter() {
        return (
            <DialogFooter>
                <DialogButton
                    text={this.props.confirmText}
                    onPress={() => {
                        this.props.confirmOnPress()
                    }}
                />
            </DialogFooter>
        );
    }

    render() {
        return (
            <Dialog
                visible={this.props.visible}
                dialogTitile={<DialogTitle title={this.props.title} />}
                footer={this.renderFooter()}>
                <DialogContent style={{ width: scale(250) }}>
                    <Text style={{ marginTop: 16, textAlign: 'center', fontSize: 30 }}>{this.props.content}</Text>
                </DialogContent>
            </Dialog>
        )
    }
}
