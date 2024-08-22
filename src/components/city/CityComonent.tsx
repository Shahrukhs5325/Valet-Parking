import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { getAllCity } from "../../api/common/commonApi";
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";

const ImageHeight = Math.round(Dimensions.get('window').width / 4);

interface Props {

}


const CityComonent: React.FC<Props> = ({

}) => {
    const navigation = useNavigation();
    const userContext = React.useContext(UserContext);

    const {
        isLoading,
        data: CityList,
        refetch,
    } = useQuery({
        queryKey: ['City_List', userContext?.user],
        queryFn: () => getAllCity(userContext?.user),
    });


    return (

        CityList && CityList.length > 0 ?
            <View style={styles.container}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    directionalLockEnabled={true}
                    alwaysBounceVertical={false}
                >
                    <FlatList
                        numColumns={Math.ceil(CityList?.length / 2)}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        data={CityList.length > 0 ? CityList : []}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => navigation.navigate("ValetServicesScreen", { city: item })}>
                                <View style={styles.card}>
                                    <Text variant="titleSmall" style={styles.txtSty}>{item.cityName}</Text>
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
            </View> : null
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