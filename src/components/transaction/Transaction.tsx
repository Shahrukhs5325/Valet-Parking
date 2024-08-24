import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { getNearByStores, getTransactionByCustomerId } from "../../api/common/commonApi";
import Arrow from '../../asset/svg/arrow_forward.svg';
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";
import { utcDateConvoter } from "../../constant/constFunction";

const WIDTH = Math.round(Dimensions.get('window').width);

interface Props {

}



const Transaction: React.FC<Props> = ({ }) => {
    const userContext = React.useContext(UserContext);
    const [transList, setTransList] = React.useState([]);

    // const {
    //     isLoading,
    //     data,
    //     refetch,
    // } = useQuery({
    //     queryKey: ['Transaction_List', userContext?.user],
    //     queryFn: () => getTransactionByCustomerId(userContext?.user),
    // });

    const {
        isLoading,
        data,
        refetch,
    } = useQuery({
        queryKey: ['Near_Store_List', userContext?.user],
        queryFn: () => getNearByStores(userContext?.user, null),
    });

    console.log(data?.data?.data);


    React.useEffect(() => {
        setTransList(data?.data?.data);
    }, [data?.data?.data]);


    return (
        transList && transList.length > 0 ?
            <View style={styles.container}>
                <View style={{ paddingBottom: 30 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        data={transList}
                        renderItem={({ item }) =>
                            <View style={styles.card}>
                                <Image source={require('../../asset/valet.png')}
                                    style={styles.img} />
                                <View style={{ width: '64%' }}>
                                    <Text variant="titleMedium" style={styles.txtTitleSty}>Billoni</Text>
                                    <Text variant="bodySmall" style={styles.txtAddSty} numberOfLines={3}>{item?.address}</Text>
                                    <Text variant="bodySmall" style={styles.txtSty} numberOfLines={1}>{utcDateConvoter(item?.createdDateTime)}</Text>

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
                        ListEmptyComponent={<>
                            <Text variant="bodyMedium" style={styles.emtTxt}>Data Not Found</Text>
                        </>}

                    />
                </View>

            </View> : null
    );
}



export default Transaction;

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
        width: '100%',
        height: 150,
        borderRadius: 17,
        gap: 16
    },
    txtSty: {
        fontWeight: '600',
        color: palette.primaryLight,
    },
    txtAddSty: {
        height: 48,
        fontWeight: '600',
        color: palette.primaryLight,
    },
    img: {
        borderRadius: 17,
        width: 100,
        height: 100
    },
    emtTxt: {
        color: palette.primaryLight,
        textAlign: 'center',
        paddingVertical: 30
    }


});