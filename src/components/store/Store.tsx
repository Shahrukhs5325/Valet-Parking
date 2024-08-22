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

    const NearStoreList = data?.data?.data
 
    return (
        NearStoreList && NearStoreList.length > 0 ?
            <View style={styles.container}>
                <View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        keyExtractor={(item, index) => index.toString()}
                        data={NearStoreList}
                        renderItem={({ item }) =>
                            <View style={styles.card}>
                                <Image source={require('../../asset/valet.png')}
                                    style={styles.img} />
                                <View style={{ width: WIDTH / 2 }}>
                                    <Text variant="titleMedium" style={styles.txtTitleSty}>{item.name}</Text>
                                    <Text variant="bodySmall" style={styles.txtSty} numberOfLines={2}>{item.address}</Text>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text variant="titleMedium" style={styles.txtTitleSty}>5 Kms</Text>
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

            </View> : null
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