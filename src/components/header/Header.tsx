import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import BackIcon from '../../asset/svg/back-icon.svg';
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";

interface Props {
    navbar?: boolean | undefined;
}

const Header: React.FC<Props> = ({
    navbar
}) => {
    const navigation = useNavigation();
    const userContext = React.useContext(UserContext);

    return (

        <View style={styles.container}>
            {!navbar ?
                <>
                    <Text variant="titleLarge" style={styles.txtSty}>{userContext?.user?.customerName}</Text>
                    <View style={{}}>
                        <Icon
                            source="bell"
                            color={palette.primaryLight}
                            size={24}
                        />
                    </View>
                </> :
                <View style={{}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={{ width: 30, height: 30 }}>
                            <BackIcon />
                        </View>
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
        color: palette.primaryLight
    },


});