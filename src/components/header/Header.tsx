import React from "react";
import { palette } from "../../theme/themes";
import { Button, Icon, Text } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import BackIcon from '../../asset/svg/back-icon.svg';
import { useNavigation } from "@react-navigation/native";

// sizes: "xs", "sm", "md", "lg"

interface Props {
    navbar?: boolean | undefined;
}

const Header: React.FC<Props> = ({
    navbar
}) => {
    const navigation = useNavigation();

    return (

        <View style={styles.container}>
            {!navbar ?
                <>
                    <Text variant="titleLarge" style={styles.txtSty}>User Name</Text>
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