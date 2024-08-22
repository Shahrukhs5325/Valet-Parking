import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, FlatList, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { palette } from '../../theme/themes';
import { Text } from 'react-native-paper';
import Arrow from '../../asset/svg/arrow_forward.svg';
import Header from '../../components/header/Header';
import { useQuery } from '@tanstack/react-query';
import { UserContext } from '../../context/user/UserContext';
import { getCustomerCoupons, getNearByCoupon, getStoresByCityName } from '../../api/common/commonApi';

type Props = {
  route?: any;
};

const WIDTH = Math.round(Dimensions.get('window').width);

const DATA = [
  { id: 1, name: "Valet Service", address: "Forum Sujana Mall-Kphb Colony, Hyderabad.", km: 5 },
  { id: 2, name: "Store 2", address: "Forum Sujana Mall-Kphb Colony, Hyderabad.", km: 10 },
  { id: 3, name: "Store 3", address: "Forum Sujana Mall-Kphb Colony, Hyderabad.", km: 12 },
  { id: 1, name: "Valet Service", address: "Forum Sujana Mall-Kphb Colony, Hyderabad.", km: 15 },

]


const ValetServicesScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { city } = route.params;

  const userContext = React.useContext(UserContext);
  const [couponList, setCouponList] = React.useState([]);

  const {
    isLoading,
    data,
    refetch,
  } = useQuery({
    queryKey: ['near_by_coupon', userContext?.user],
    queryFn: () => getCustomerCoupons(userContext?.user),
  });

  console.log("getCustomerCoupons", couponList);

  React.useEffect(() => {
    setCouponList(data?.data?.data);
  }, [data?.data?.data]);





  return (
    <View style={{ backgroundColor: palette.primaryDark, gap: 50 }}>
      <Header navbar={true} />
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={palette.primaryDark}
        />

        <View style={{ gap: 15 }}>
          <Text variant="titleLarge" style={styles.txtTitleSty}>Premium Valet Services Across {city.cityName}</Text>

          {couponList && couponList.length > 0 ?
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={couponList}
              renderItem={({ item }) =>
                <View style={styles.card}>
                  <Text variant="titleMedium" style={styles.txtSty}>{item?.templateName}</Text>
                  <TouchableOpacity onPress={() => navigation.navigate("ValetDetailsScreen", { coupon: item })}>
                    <View style={{ borderRadius: 90, backgroundColor: palette.primaryLight, padding: 6, borderWidth: 5, borderColor: palette.bgGray, height: 46, width: 46, alignItems: 'center', justifyContent: 'center' }}>
                      <Arrow width={20} height={20} />
                    </View>
                  </TouchableOpacity>
                </View>
              }
              style={styles.list}
              contentContainerStyle={styles.listContents}
              initialNumToRender={5}
              maxToRenderPerBatch={10}
              windowSize={10}
              updateCellsBatchingPeriod={50}
            /> : null}

        </View>
      </View>
    </View>
  );
};

export default ValetServicesScreen;

const styles = StyleSheet.create({
  container: {
    //  flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.primaryDark
  },
  txtTitleSty: {
    fontWeight: '600',
    color: palette.primaryLight,
    textTransform: 'uppercase',
    letterSpacing: 3,
    paddingBottom: 12
  },
  listContents: {
    gap: 16
  },
  list: {

  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: palette.primaryLight,
    width: WIDTH - 40,
    height: 100,
    borderRadius: 17,
    gap: 16
    //   justifyContent: 'space-between'
  },
  txtSty: {
    fontWeight: '700',
    color: palette.primaryDark,
  },
  img: {
    borderRadius: 17,
    width: WIDTH / 4,
    height: WIDTH / 4
  }



});


