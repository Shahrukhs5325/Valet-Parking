import React from "react";
import { palette } from "../../theme/themes";
import { Button, Icon, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

// sizes: "xs", "sm", "md", "lg"

interface Props {

}

const Header: React.FC<Props> = ({

}) => {

    return (

        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.txtSty}>User Name</Text>
            <View style={{}}>
                <Icon
                    source="bell"
                    color={palette.primaryLight}
                    size={24}
                />
            </View>
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