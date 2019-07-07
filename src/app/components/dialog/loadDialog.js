import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {scale} from 'react-native-size-matters'
import Dialog, {DialogContent, DialogTitle} from 'react-native-popup-dialog';
import * as colors from "../../constants/colors";

export default class LoadingDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Dialog
                visible={this.props.visible}
                dialogTitile={<DialogTitle title={this.props.title}/>}>
                <DialogContent style={{width: scale(100)}}>
                    <ActivityIndicator style={{marginTop:scale(32)}} size="large" color={colors.lightColor}/>
                </DialogContent>
            </Dialog>
        )
    }
}
