import React, {Component} from 'react';
import {Text} from 'react-native';
import {scale} from 'react-native-size-matters'
import Dialog, {DialogButton, DialogContent, DialogFooter, DialogTitle} from 'react-native-popup-dialog';

export default class CustomDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderFooter() {
        if (this.props.confirmOnPress != null && this.props.cancelOnPress != null) {
            return (
                <DialogFooter>
                    <DialogButton
                        text={this.props.cancelText}
                        onPress={() =>
                            this.props.cancelOnPress()
                        }
                    />
                    <DialogButton
                        text={this.props.confirmText}
                        onPress={() =>
                            this.props.confirmOnPress()
                        }
                    />
                </DialogFooter>
            )
        } else if (this.props.confirmOnPress != null) {
            return (
                <DialogFooter>
                    <DialogButton
                        text={this.props.confirmText}
                        onPress={() => {
                            this.props.confirmOnPress()
                        }}
                    />
                </DialogFooter>
            )
        } else if (this.props.cancelOnPress != null) {
            return (
                <DialogFooter>
                    <DialogButton
                        text={this.props.cancelText}
                        onPress={() => {
                            this.props.cancelOnPress()
                        }}
                    />
                </DialogFooter>
            )
        }
    }

    render() {
        return (
            <Dialog
                visible={this.props.visible}
                dialogTitile={<DialogTitle title={this.props.title}/>}
                footer={this.renderFooter()}>
                <DialogContent style={{width: scale(250)}}>
                    <Text style={{marginTop: 16, textAlign: 'center'}}>{this.props.content}</Text>
                </DialogContent>
            </Dialog>
        )
    }
}
