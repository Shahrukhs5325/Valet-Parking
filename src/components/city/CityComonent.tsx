import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, Dimensions, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { getAllCity } from "../../api/common/commonApi";
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";

const ImageHeight = Math.round(Dimensions.get('window').width / 4);

interface Props {
    service: any;
}


const CityComonent: React.FC<Props> = ({ service }) => {
    const navigation = useNavigation();
    const userContext = React.useContext(UserContext);

    const {
        isLoading,
        data,
        refetch,
    } = useQuery({
        queryKey: ['City_List', userContext?.user],
        queryFn: () => getAllCity(userContext?.user),
    });


    React.useEffect(() => { }, [data]);

    if (isLoading) {
        return (
            <View style={[styles.container, { backgroundColor: userContext?.customTheme?.primaryDark }]}>
                <ActivityIndicator size="small" color="#FFF" />
            </View>
        )
    }

    const serviceScreenHandler = (item: any) => {
        if (service?.key === "valet_service") {
            navigation.navigate("ValetServicesStoreScreen", { city: item });
        } else if (service?.key === "airport_services") {
            navigation.navigate("AirportTransferScreen", { city: item });
        } else if (service?.key === "Meet_Greet") {

        } else {

        }
    }

    return (

        data && data?.data && data?.data.length > 0 ?
            <View style={styles.container}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    directionalLockEnabled={true}
                    alwaysBounceVertical={false}
                >
                    <FlatList
                        numColumns={Math.ceil(data?.data?.length / 2)}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        data={data?.data.length > 0 ? data?.data : []}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => serviceScreenHandler(item)}>
                                <View
                                    style={[styles.card, { backgroundColor: userContext?.customTheme?.bgCard }]}
                                >
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
        color: palette.txtWhite,
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
        //   backgroundColor: palette.bgCard,
        width: ImageHeight,
        height: ImageHeight,
        borderRadius: 17,
        justifyContent: 'flex-end'
    },
    txtSty: {
        fontWeight: '500',
        color: palette.txtWhite,
        fontSize: 11,

    }


});