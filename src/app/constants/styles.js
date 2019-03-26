import {StyleSheet} from "react-native";
import * as colors from './colors';

export const Styles = StyleSheet.create({
    container:{
        flex:1
    },
    containerWithThemeColor:{
        flex:1,
        backgroundColor:colors.themeColor,
    }
})