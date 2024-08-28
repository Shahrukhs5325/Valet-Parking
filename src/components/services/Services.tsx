import React from "react";
import { palette } from "../../theme/themes";
import { Text } from "react-native-paper";
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import Car from '../../assets/svg/car.svg';
import Parking from '../../assets/svg/Parking.svg';
import Smiley from '../../assets/svg/smiley-smile.svg';
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/user/UserContext";


const ImageHeight = Math.round(Dimensions.get('window').width / 3.3);

interface Props {
}

const DATA = [
    { id: 1, key: "Valet_Service", name: "Valet Service", icon: <Car width={40} height={40} /> },
    { id: 2, key: "Airport_Transfer", name: "Airport Transfer Services", icon: <Parking width={40} height={40} /> },
    { id: 3, key: "Meet_Greet", name: "Airport Meet & Greet", icon: <Smiley width={40} height={40} /> },

]

const Services: React.FC<Props> = ({ }) => {
    const navigation = useNavigation();
    const userContext = React.useContext(UserContext);

    return (

        <View style={styles.container}>
            <View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    data={DATA}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => navigation.navigate("ServiceScreen", { service: item })}>
                            <View style={[styles.card, { backgroundColor: userContext?.customTheme?.bgCard }]}>

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
        //   backgroundColor: palette.bgCard,
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