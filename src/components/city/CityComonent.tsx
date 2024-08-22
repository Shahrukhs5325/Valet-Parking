import React from "react";
import { palette } from "../../theme/themes";
import { Text } from "react-native-paper";
import { Dimensions, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Car from '../../asset/svg/car.svg';
import Parking from '../../asset/svg/Parking.svg';
import Smiley from '../../asset/svg/smiley-smile.svg';

// sizes: "xs", "sm", "md", "lg"
const ImageHeight = Math.round(Dimensions.get('window').width / 4);

interface Props {

}

const DATA = [
    { id: 1, name: "Riyadh", icon: <Car width={40} height={40} /> },
    { id: 2, name: "Jeddah", icon: <Parking width={40} height={40} /> },
    { id: 3, name: "Khobar", icon: <Smiley width={40} height={40} /> },
    { id: 4, name: "Makkah", icon: <Car width={40} height={40} /> },
    { id: 5, name: "Dammam", icon: <Car width={40} height={40} /> },
    { id: 6, name: "Al ula", icon: <Car width={40} height={40} /> },

    { id: 7, name: "Al ula", icon: <Car width={40} height={40} /> },

]

const CityComonent: React.FC<Props> = ({

}) => {

    return (

        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                directionalLockEnabled={true}
                alwaysBounceVertical={false}
            >
                <FlatList
                    numColumns={Math.ceil(DATA.length / 2)}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    data={DATA}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => console.log()}>
                            <View style={styles.card}>
                                {/* {item.icon} */}
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
            </ScrollView>
        </View>
    );
}



export default CityComonent;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    txtTitleSty: {
        fontWeight: '600',
        color: palette.primaryLight,
        textTransform: 'uppercase',
        letterSpacing: 3
    },
    list: {
    },
    listContents: {
        // gap: 16,
        alignSelf: 'flex-start'
    },
    card: {
        margin: 6,
        padding: 13,
        backgroundColor: "#333333",
        width: ImageHeight,
        height: ImageHeight,
        borderRadius: 17,
        justifyContent: 'flex-end'
    },
    txtSty: {
        fontWeight: '600',
        color: palette.primaryLight,
    }


});