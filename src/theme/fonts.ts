import { Platform } from "react-native";

export const FONT = {
    // Inter
    regular: "Inter-Regular",
    thin: "Inter-Thin",
    bold: "Inter-Bold",
    semiBold: "Inter-SemiBold",
    extraBold: "Inter-ExtraBold",
};

export const fontConfig = {
    ios: {
        regular: {
            fontFamily: 'SFPRODISPLAYREGULAR',
            fontWeight: 'regular',
        },
        medium: {
            fontFamily: 'SFPRODISPLAYMEDIUM',
            fontWeight: 'medium',
        },
        light: {
            fontFamily: 'SFPRODISPLAYREGULAR',
            fontWeight: 'light',
        },
        thin: {
            fontFamily: 'SFPRODISPLAYREGULAR',
            fontWeight: 'thin',
        },
    },
    android: {
        regular: {
            fontFamily: 'SFPRODISPLAYREGULAR',
            fontWeight: 'regular',
        },
        medium: {
            fontFamily: 'SFPRODISPLAYMEDIUM',
            fontWeight: 'medium',
        },
        light: {
            fontFamily: 'SFPRODISPLAYREGULAR',
            fontWeight: 'normal',
        },
        thin: {
            fontFamily: 'SFPRODISPLAYREGULAR',
            fontWeight: 'thin',
        },
        bold: {
            fontFamily: 'SFPRODISPLAYBOLD',
            fontWeight: 'bold',
        },


    }
};
