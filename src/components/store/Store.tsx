import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { getNearByStores } from "../../api/common/commonApi";
import Arrow from '../../asset/svg/arrow_forward.svg';
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";

const WIDTH = Math.round(Dimensions.get('window').width);

interface Props {
    location?: any;
}



const Store: React.FC<Props> = ({ location }) => {
    const userContext = React.useContext(UserContext);
    const [storeList, setStoreList] = React.useState([]);

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

                                <Image source={require('../../asset/valet.png')}
                                    style={styles.img} />
                                <View style={{ width: WIDTH / 2, gap: 3 }}>
                                    <Text variant="titleMedium" style={styles.txtTitleSty}>{item.storeName}</Text>
                                    <Text variant="bodySmall" style={styles.txtSty} numberOfLines={2}>{item.address}</Text>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text variant="titleMedium" style={styles.txtTitleSty}>5 Kms</Text>
                                        <View style={{ borderRadius: 90, backgroundColor: palette.txtWhite, padding: 6 }}>
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

            </View> : null
    );
}



export default Store;

const styles = StyleSheet.create({
    container: {

    },
    txtTitleSty: {
        fontWeight: '600',
        color: palette.txtWhite,
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
        fontWeight: '600',
        color: palette.txtWhite,
        height: 52
    },
    img: {
        borderRadius: 17,
        width: 110,
        height: 110
    }


});