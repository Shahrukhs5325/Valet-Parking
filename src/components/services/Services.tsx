import React from "react";
import { palette } from "../../theme/themes";
import { Text } from "react-native-paper";
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import Car from '../../asset/svg/car.svg';
import Parking from '../../asset/svg/Parking.svg';
import Smiley from '../../asset/svg/smiley-smile.svg';
import { useNavigation } from "@react-navigation/native";

// sizes: "xs", "sm", "md", "lg"
const ImageHeight = Math.round(Dimensions.get('window').width / 3.3);

interface Props {
}

const DATA = [
    { id: 1, name: "Valet Service", icon: <Car width={40} height={40} /> },
    { id: 2, name: "Airport Transfer services", icon: <Parking width={40} height={40} /> },
    { id: 3, name: "Airport Meet & Greet", icon: <Smiley width={40} height={40} /> },
    { id: 1, name: "Valet Service", icon: <Car width={40} height={40} /> },

]

const Services: React.FC<Props> = ({ }) => {
    const navigation = useNavigation();

    return (

        <View style={styles.container}>
            <View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    data={DATA}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => navigation.navigate("ValetScreen")}>
                            <View style={styles.card}>
                                {item.icon}
                                <Text variant="titleSmall" style={styles.txtSty}>{item.name}</Text>

                            </View>
                        </TouchableOpacity>
                    }
                    style={styles.list}
                    contentContainerStyle={styles.listContents}
                    initialNumToRender={5}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                    updateCellsBatchingPeriod={50}
                />
            </View>

        </View>
    );
}



export default Services;

const styles = StyleSheet.create({
    container: {
    },
    txtTitleSty: {
        fontWeight: '600',
        color: palette.txtWhite,
        textTransform: 'uppercase',
        letterSpacing: 3
    },
    list: {
    },
    listContents: {
        gap: 16
    },
    card: {
        padding: 13,
        backgroundColor: palette.primaryLight,
        width: ImageHeight,
        height: ImageHeight,
        borderRadius: 17,
        justifyContent: 'space-between'
    },
    txtSty: {
        fontWeight: '600',
        color: palette.txtWhite,
    }


});