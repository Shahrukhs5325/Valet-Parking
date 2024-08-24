import React from "react";
import Svg, { Defs, Rect, RadialGradient, Stop, Ellipse } from 'react-native-svg';
import { StyleSheet, View } from "react-native";
import { palette } from "../../theme/themes";


interface Props {
    height?: string;
    width?: string;
}

const CustomRadialGradient: React.FC<Props> = ({ height, width }) => {
    return (
        <View style={{ width: '100%' }}>
            <Svg height={height} width={'100%'} style={StyleSheet.absoluteFillObject}>
                <Defs>
                    <RadialGradient id="grad" cx="50%" cy="50%" rx="50%" ry="50%" gradientUnits="userSpaceOnUse">
                        <Stop offset="0" stopColor={palette.primaryDark} stopOpacity="1" />
                        <Stop offset="1" stopColor={palette.txtWhite} stopOpacity="1" />
                    </RadialGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#grad)" />
            </Svg>
        </View>
    );
}

export default CustomRadialGradient;
