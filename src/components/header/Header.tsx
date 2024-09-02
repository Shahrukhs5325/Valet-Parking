import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import BackIcon from '../../assets/svg/back-icon.svg';
import CrossIcon from '../../assets/svg/cross-icon.svg';
import BellIcon from '../../assets/svg/bell-Icon.svg';

import SABIcon from '../../assets/svg/sab-logo-small.svg';

import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";
import { FONT } from "../../theme/fonts";

interface Props {
    navbar?: boolean | undefined;
    isCross?: boolean | undefined;
}

const Header: React.FC<Props> = ({ navbar, isCross = false }) => {
    const navigation = useNavigation();
    const userContext = React.useContext(UserContext);

    const [isLoading, setIsLoading] = React.useState(false);

    const signOut = async () => {
        try {
            setIsLoading(true);
            await Auth.signOut();
            await userContext.setUser(null);
            await userContext.secCustomTheme(palette);

            navigation.replace('LoginScreen');

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log('error signing out: ', error);
        }
    };


    return (

        <View style={styles.container}>
            {!navbar ?
                <>
                    <Text style={styles.txtSty}>Hi, {userContext?.user?.customerName}</Text>
                    <View style={{ flexDirection: 'row', gap: 14, alignItems: "center" }}>
                        <TouchableOpacity onPress={() => signOut()}>
                            <BellIcon />
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => signOut()}>
                            <View style={{ padding: 3, backgroundColor: palette.txtWhite, borderRadius: 4 }}><SABIcon /></View>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={() => signOut()}>
                            <View style={{ borderRadius: 90, borderWidth: 1.2, borderColor: '#fff', width: 23, height: 23, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#fff' }}>ار</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </> :
                <View style={{}}>
                    <TouchableOpacity onPress={() => { isCross ? navigation.navigate("HomeScreen") : navigation.goBack() }}>
                        {isCross ?
                            <View style={{ marginTop: 10 }}>
                                <CrossIcon width={44} />
                            </View> :
                            <View style={{ width: 30, height: 30 }}>
                                <BackIcon />
                            </View>}

                    </TouchableOpacity>
                </View>}

        </View>
    );
}



export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    txtSty: {
        fontWeight: '400',
        color: palette.txtWhite,
        fontFamily: FONT.JuliusSansOne.regular,
        fontSize: 20,
    },


});