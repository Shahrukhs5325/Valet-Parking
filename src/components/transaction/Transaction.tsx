import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { getTransactionByCustomerId } from "../../api/common/commonApi";
import Arrow from '../../assets/svg/arrow_forward.svg';
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";
import { utcDateConvoter } from "../../constant/constFunction";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { FONT } from "../../theme/fonts";


interface Props {

}



const Transaction: React.FC<Props> = ({ }) => {
    const navigation = useNavigation();
    const focus = useIsFocused();  // useIsFocused as shown   


    const userContext = React.useContext(UserContext);
    const [transList, setTransList] = React.useState([]);

    const {
        isLoading,
        data,
        refetch,
    } = useQuery({
        queryKey: ['Transaction_List', userContext?.user],
        queryFn: () => getTransactionByCustomerId(userContext?.user),
    });

    React.useEffect(() => {
        focus && refetch();
    }, [focus]);

    React.useEffect(() => {
        setTransList(data?.data?.data?.cTransaction);
    }, [data?.data?.data]);


    if (isLoading) {
        return (
            <View style={[styles.container, { backgroundColor: userContext?.customTheme?.primaryDark }]}>
                <ActivityIndicator size="small" color="#FFF" />
            </View>
        )
    }


    return (
        transList && transList.length > 0 ?
            <View >
                <View style={{ paddingBottom: 30 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        data={transList}
                        renderItem={({ item }) =>
                            <View
                                style={[styles.card, { backgroundColor: userContext?.customTheme?.bgCard }]}
                            >
                                <Image source={require('../../assets/valet.png')}
                                    style={styles.img} />
                                <View style={{ width: '68%', gap: 6 }}>
                                    <Text style={styles.txtTitleSty}>{item?.templateName}</Text>
                                    <Text style={styles.txtAddSty} numberOfLines={2}>{item?.address}</Text>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={styles.txtSty} numberOfLines={1}>{utcDateConvoter(item?.createdDateTime)}</Text>
                                        <TouchableOpacity onPress={() => navigation.navigate("TransactionDetailsScreen", { coupon: item })}>
                                            <View style={styles.viewTirdArrBtn}>
                                                <View style={styles.viewSecArrBtn}>
                                                    <View style={styles.viewFristArrBtn}>
                                                        <Arrow width={10} height={11} />
                                                    </View>
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
                        ListEmptyComponent={<>
                            <Text style={styles.emtTxt}>Data Not Found</Text>
                        </>}
                    />
                </View>

            </View> : null
    );
}



export default Transaction;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        padding: 14,
        //   backgroundColor: palette.bgCard,
        width: '100%',
        height: 148,
        borderRadius: 17,
        gap: 14
    },
    txtSty: {
        fontWeight: '400',
        color: palette.txtWhite,
        fontFamily: FONT.Able.regular,
        fontSize: 12,
    },
    txtAddSty: {
        height: 30,
        fontWeight: '400',
        color: palette.txtWhite,
        fontFamily: FONT.Able.regular,
        fontSize: 12,
    },
    img: {
        borderRadius: 17,
        width: 100,
        height: 100
    },
    emtTxt: {
        color: palette.txtWhite,
        textAlign: 'center',
        paddingVertical: 30
    },
    viewFristArrBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 90,
        backgroundColor: palette.txtWhite,
        padding: 6,
        width: 20,
        height: 20,
    },
    viewSecArrBtn: {
        alignItems: 'center',
        borderRadius: 90,
        backgroundColor: '#D9D9D9',
        padding: 5,
    },
    viewTirdArrBtn: {
        alignItems: 'center',
        borderRadius: 90,
        backgroundColor: '#D9D9D91A',
        padding: 5,
        marginVertical: 6,
    },
    kmTxt: {
        fontWeight: '400',
        fontSize: 12,
        color: palette.txtWhite,
        fontFamily: FONT.Able.regular,
        lineHeight: 12.7,
    },


});