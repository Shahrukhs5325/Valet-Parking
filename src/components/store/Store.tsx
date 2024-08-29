import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { getNearByStores } from "../../api/common/commonApi";
import Arrow from '../../assets/svg/arrow_forward.svg';
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";
import { useNavigation } from "@react-navigation/native";
import { FONT } from "../../theme/fonts";

const WIDTH = Math.round(Dimensions.get('window').width);

interface Props {
    location?: any;
}



const Store: React.FC<Props> = ({ location }) => {
    const userContext = React.useContext(UserContext);
    const [storeList, setStoreList] = React.useState([]);
    const navigation = useNavigation();

    const {
        isLoading,
        data,
        refetch,
    } = useQuery({
        queryKey: ['Near_Store_List', userContext?.user],
        queryFn: () => getNearByStores(userContext?.user, location),
    });

    React.useEffect(() => {
        refetch();
    }, [location]);


    React.useEffect(() => {
        setStoreList(data?.data?.data);
    }, [data?.data?.data]);


    if (isLoading) {
        return (
            <View style={[styles.container, { backgroundColor: userContext?.customTheme?.primaryDark }]}>
                <ActivityIndicator size="small" color="#FFF" />
            </View>
        )
    }

    return (
        storeList && storeList.length > 0 ?
            <View style={styles.container}>
                <View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        keyExtractor={(item, index) => index.toString()}
                        data={storeList}
                        renderItem={({ item }) =>
                            <View
                                style={[styles.card, { backgroundColor: userContext?.customTheme?.bgCard }]}
                            >

                                <Image source={require('../../assets/valet.png')}
                                    style={styles.img} />
                                <View style={{ width: WIDTH / 2, gap: 3 }}>
                                    <Text variant="titleMedium" style={styles.txtTitleSty}>{item.storeName}</Text>
                                    <Text variant="bodySmall" style={styles.txtSty} numberOfLines={3}>{item.address}</Text>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text variant="titleMedium" style={styles.kmTxt}>5 Kms</Text>
                                        <TouchableOpacity onPress={() => navigation.navigate("ValetDetailsScreen", { store: item })}>
                                            <View style={{ borderRadius: 90, backgroundColor: palette.bgGray, padding: 6 }}>
                                                <View style={{ borderRadius: 90, backgroundColor: palette.txtWhite, padding: 6 }}>
                                                    <Arrow width={10} height={11} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
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

            </View> : null
    );
}



export default Store;

const styles = StyleSheet.create({
    container: {

    },
    txtTitleSty: {
        fontWeight: '400',
        color: palette.txtWhite,
        fontFamily: FONT.JuliusSansOne.regular,
        fontSize: 16,
    },
    list: {
    },
    listContents: {
        gap: 16
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        //   backgroundColor: palette.bgCard,
        width: WIDTH - 40,
        height: 145,
        borderRadius: 17,
        gap: 16
    },
    txtSty: {
        fontWeight: '400',
        color: palette.txtWhite,
        height: 34,
        fontFamily: FONT.JuliusSansOne.regular,
        fontSize: 10,

    },
    img: {
        borderRadius: 12,
        width: 110,
        height: 110
    },
    kmTxt: {
        fontWeight: '400',
        fontSize: 12,
        color: palette.txtWhite,
        fontFamily: FONT.Able.regular,
    }


});