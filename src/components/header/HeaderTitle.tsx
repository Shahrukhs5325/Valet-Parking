import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import BackIcon from '../../assets/svg/back-icon.svg';
import { FONT } from "../../theme/fonts";
import { palette } from "../../theme/themes";

interface Props {
    title: string;
}

const HeaderTitle: React.FC<Props> = ({ title }) => {
    const navigation = useNavigation();



    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                <BackIcon width={44} height={44} />
            </TouchableOpacity>
            <Text style={styles.txtSty}>{title}</Text>
        </View>
    );
}



export default HeaderTitle;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    txtSty: {
        fontWeight: '400',
        color: palette.txtGold,
        fontFamily: FONT.JuliusSansOne.regular,
        fontSize: 30,
    },


});