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
import LeisIcon from '../../assets/svg/privilege/Joystick.svg';
import EntIcon from '../../assets/svg/privilege/Food.svg';

const ImageHeight = Math.round(Dimensions.get('window').width / 3.43);

interface Props {
}

const DATA = [
    { id: 1, key: "airport_services", name: "Airport Services", count: '100 Hrs', credit: 12, icon: <AirportIcon width={40} height={40} /> },
    { id: 2, key: "valet_service", name: "Valet Services", count: '100 Hrs', credit: 10, icon: <ParkingIcon width={40} height={40} /> },
    { id: 3, key: "entertainment", name: "Entertainment", count: '100 Hrs', credit: 20, icon: <PopcornIcon width={40} height={40} /> },
    { id: 4, key: "leisure", name: "Leisure", count: '100 Hrs', credit: 8, icon: <LeisIcon width={40} height={40} /> },
    { id: 5, key: "entertainment", name: "F & B", count: '100 Hrs', credit: 12, icon: <EntIcon width={40} height={40} /> },

]

const Services: React.FC<Props> = ({ }) => {
    const navigation = useNavigation();
    const userContext = React.useContext(UserContext);


    const serviceScreenHandler = (item: any) => {
        if (item?.key === "valet_service") {
            navigation.navigate("ServiceScreen", { service: item })
        } else if (item?.key === "airport_services") {
            navigation.navigate("ServiceScreen", { service: item });
        } else if (item?.key === "Meet_Greet") {
            navigation.navigate("CommingSoonScreen");
        } else {
            navigation.navigate("CommingSoonScreen");
        }
    }

    return (

        <View style={styles.container}>
            <View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    data={DATA}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => serviceScreenHandler(item)}>
                            <View style={[styles.card, { backgroundColor: userContext?.customTheme?.bgCard }]}>

                                {item.icon}
                                <Text style={styles.txtSty}>{item.name}</Text>
                                <View style={styles.viewCredit}>
                                    <Text style={styles.txtSty}>{item.credit}</Text>
                                </View>
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
        gap: 16,
        marginTop: 8,
        paddingRight: 12
    },
    card: {
        paddingHorizontal: 12,
        paddingVertical: 16,
        width: ImageHeight,
        height: ImageHeight,
        borderRadius: 17,
        justifyContent: 'space-between',
        borderColor: palette.borderClr,
        borderWidth: 1
    },
    txtSty: {
        fontWeight: '400',
        color: palette.txtWhite,
        fontFamily: FONT.JuliusSansOne.regular,
        fontSize: 11,
    },
    viewCredit: {
        flex: 1,
        top: -5,
        right: -5,
        position: 'absolute',
        backgroundColor: palette.txtGold,
        width: 24,
        height: 24,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 90
    }


});