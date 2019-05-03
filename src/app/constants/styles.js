import {StyleSheet} from "react-native";
import * as colors from './colors';
import {scale} from "react-native-size-matters";

export const Styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerWithThemeColor: {
        flex: 1,
        backgroundColor: colors.themeColor,
    },
    underLine: {
        marginTop:scale(16),
        marginHorizontal:scale(8),
        height:1,
        backgroundColor:colors.greyColor
    }
});
