import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import BackIcon from '../../asset/svg/back-icon.svg';
import CrossIcon from '../../asset/svg/cross-icon.svg';
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";

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
                    <Text variant="titleLarge" style={styles.txtSty}>{userContext?.user?.customerName}</Text>
                    <View style={{}}>
                        <TouchableOpacity onPress={() => signOut()}>
                            <Icon

                                source="bell"
                                color={palette.txtWhite}
                                size={24}
                            />
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
        //  alignItems: "center",
        justifyContent: 'space-between',
        padding: 15
    },
    txtSty: {
        fontWeight: '800',
        color: palette.txtWhite
    },


});