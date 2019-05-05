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
    horizontalLine: {
        marginTop: scale(16),
        marginHorizontal: scale(8),
        height: 1,
        backgroundColor: colors.lightColor
    },
    verticalLine: {
        borderLeftWidth: 1,
        borderLeftColor: colors.lightColor,
    }
});
