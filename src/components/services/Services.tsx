import React from "react";
import { palette } from "../../theme/themes";
import { Text } from "react-native-paper";
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import ParkingIcon from '../../assets/svg/Valet Parking.svg';
import AirportIcon from '../../assets/svg/Airport.svg';
import PopcornIcon from '../../assets/svg/Popcorn.svg';
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/user/UserContext";
import { FONT } from "../../theme/fonts";


const ImageHeight = Math.round(Dimensions.get('window').width / 3.43);

interface Props {
}

const DATA = [
    { id: 1, key: "Valet_Service", name: "Valet Service", icon: <ParkingIcon /> },
    { id: 2, key: "Airport_Transfer", name: "Airport Transfer Services", icon: <AirportIcon /> },
    { id: 3, key: "Meet_Greet", name: "Airport Meet & Greet", icon: <PopcornIcon /> },

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
                        <TouchableOpacity onPress={() => navigation.navigate("ValetServiceScreen", { service: item })}>
                            <View style={[styles.card, { backgroundColor: userContext?.customTheme?.bgCard }]}>

                                {item.icon}
                                <Text style={styles.txtSty}>{item.name}</Text>

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
    list: {
    },
    listContents: {
        gap: 16
    },
    card: {
        paddingHorizontal: 12,
        paddingVertical: 16,
        width: ImageHeight,
        height: ImageHeight,
        borderRadius: 17,
        justifyContent: 'space-between',
    },
    txtSty: {
        fontWeight: '400',
        color: palette.txtWhite,
        fontFamily: FONT.JuliusSansOne.regular,
        fontSize: 11,
    }


});