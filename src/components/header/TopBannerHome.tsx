import React from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { palette } from "../../theme/themes";
import Header from "./Header";
import { FONT } from "../../theme/fonts";


interface Props {
    navbar?: boolean | undefined;
    service?: any;
}
const WIDTH = Dimensions.get('window').width;
const ImageHeight = Math.round(Dimensions.get('window').width * 9 / 9);

const TopBannerHome: React.FC<Props> = ({ navbar, service }) => {

    return (
        <View style={styles.image}>
            <ImageBackground
                source={require('../../assets/hotel.png')}
                resizeMode="cover"
                style={styles.image}>
                <Header navbar={navbar} />
                <View style={{ position: 'absolute', bottom: 0, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', padding: 20, gap: 6 }}>
                    <Text style={styles.txtTitle}>Hotels</Text>
                    <Text style={styles.txtSubTitle}>Unmatched luxury and comfort at premium hotels</Text>
                </View>
            </ImageBackground>

        </View>

    );
}



export default TopBannerHome;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        height: 300,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        width: WIDTH,
        height: ImageHeight,
    },
    txtTitle: {
        fontWeight: '400',
        color: palette.txtWhite,
        fontFamily: FONT.JuliusSansOne.regular,
        fontSize: 30,
    },
    txtSubTitle: {
        fontWeight: '400',
        color: palette.txtWhite,
        fontFamily: FONT.JuliusSansOne.regular,
        fontSize: 14,
        textAlign: 'center',
    }


});