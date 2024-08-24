import React from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { palette } from "../../theme/themes";
import Header from "./Header";


interface Props {
    navbar?: boolean | undefined;
}
const WIDTH = Dimensions.get('window').width;
const ImageHeight = Math.round(Dimensions.get('window').width * 9 / 9);

const TopBanner: React.FC<Props> = ({
    navbar
}) => {

    return (
        <View style={styles.image}>
            <ImageBackground
                source={require('../../asset/velet-car.png')}
                resizeMode="cover"
                style={styles.image}>
                <Header navbar={navbar} />
                <View style={{ position: 'absolute', bottom: 0, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', padding: 20, gap: 6 }}>
                    <Text variant="titleLarge" style={{ color: palette.txtWhite, fontWeight: 800 }}>Valet Services</Text>
                    <Text variant="bodyMedium" style={{ color: palette.txtWhite, textAlign: 'center' }}>Our professional valet team ensures your vehicle is safe and secure.</Text>

                </View>
            </ImageBackground>

        </View>

    );
}



export default TopBanner;

const styles = StyleSheet.create({
    container: {
        //   flexDirection: 'row',
        //  alignItems: "center",
        justifyContent: 'space-between',
        height: 300,
        // width: '100%'
    },
    image: {

        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        width: WIDTH,
        // width: 50,
        height: ImageHeight,
        //  backgroundColor:'red'
    },


});