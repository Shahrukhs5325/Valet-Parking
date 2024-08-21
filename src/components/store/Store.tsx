import React from "react";
import { palette } from "../../theme/themes";
import { Text } from "react-native-paper";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import Arrow from '../../asset/svg/arrow_forward.svg';

// sizes: "xs", "sm", "md", "lg"
const WIDTH = Math.round(Dimensions.get('window').width);

interface Props {

}

const DATA = [
    { id: 1, name: "Valet Service", address: "Forum Sujana Mall-Kphb Colony, Hyderabad.", km: 5 },
    { id: 2, name: "Store 2", address: "Forum Sujana Mall-Kphb Colony, Hyderabad.", km: 10 },
    { id: 3, name: "Store 3", address: "Forum Sujana Mall-Kphb Colony, Hyderabad.", km: 12 },
    { id: 1, name: "Valet Service", address: "Forum Sujana Mall-Kphb Colony, Hyderabad.", km: 15 },

]

const Store: React.FC<Props> = ({

}) => {

    return (

        <View style={styles.container}>
            <View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    data={DATA}
                    renderItem={({ item }) =>
                        <View style={styles.card}>
                            <Image source={require('../../asset/valet.png')}
                                style={styles.img} />
                            <View style={{ width: WIDTH / 2 }}>
                                <Text variant="titleMedium" style={styles.txtTitleSty}>{item.name}</Text>
                                <Text variant="bodySmall" style={styles.txtSty} numberOfLines={2}>{item.address}</Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text variant="titleMedium" style={styles.txtTitleSty}>{item.km} Kms</Text>
                                    <View style={{ borderRadius: 90, backgroundColor: palette.primaryLight, padding: 6 }}>
                                        <Arrow width={20} height={20} />
                                    </View>
                                </View>
                            </View>
                        </View>
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



export default Store;

const styles = StyleSheet.create({
    container: {

    },
    txtTitleSty: {
        fontWeight: '600',
        color: palette.primaryLight,
    },
    list: {
    },
    listContents: {
        gap: 16
    },
    card: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: "#424242",
        width: WIDTH - 40,
        height: WIDTH / 3,
        borderRadius: 17,
        gap: 16
        //   justifyContent: 'space-between'
    },
    txtSty: {
        fontWeight: '600',
        color: palette.primaryLight,
        height: 52
    },
    img: {
        borderRadius: 17,
        width: WIDTH / 4,
        height: WIDTH / 4
    }


});