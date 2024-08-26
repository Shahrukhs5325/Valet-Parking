import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, FlatList, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import CallIcon from '../../asset/svg/call.svg';
import ShareIcon from '../../asset/svg/communities.svg';
import WalkIcon from '../../asset/svg/directions_walk.svg';
import LocationIcon from '../../asset/svg/location_on.svg';
import NearmeIcon from '../../asset/svg/near_me.svg';
import SpotnIcon from '../../asset/svg/stop.svg';
import PrimaryButton from '../../components/button/PrimaryButton';
import Header from '../../components/header/Header';
import { palette } from '../../theme/themes';
import TermIcon from '../../asset/svg/gifts.svg';
import { useQuery } from '@tanstack/react-query';
import { UserContext } from '../../context/user/UserContext';
import { getCustomerCouponsByStoreIdNMerchantId } from '../../api/common/commonApi';


type Props = {
  route?: any;
};


const WIDTH = Dimensions.get('window').width;
const ImageHeight = Math.round(Dimensions.get('window').width * 6 / 9);

const ValetDetailsScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);

  const { store } = route.params;

  const [coupon, setCoupon] = React.useState("");
  const [couponList, setCouponList] = React.useState([]);
  const [selectQty, setSelectQty] = React.useState(1);


  const ArrQty = [1, 2, 3];

  const {
    isLoading,
    data,
    refetch,
  } = useQuery({
    queryKey: ['Coupon_list_by_city', userContext?.user, store],
    queryFn: () => getCustomerCouponsByStoreIdNMerchantId(userContext?.user, store),
  });


  React.useEffect(() => {
    setCoupon(data?.data?.data && data?.data?.data?.[0]);
    setCouponList(data?.data?.data)
  }, [data?.data?.data]);



  return (
    <>
      {coupon ?
        <View style={[styles.container, { backgroundColor: userContext?.customTheme?.primaryDark }]}>
          <StatusBar
            animated={true}
          // backgroundColor={palette.primaryDark}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <TopBanner navbar={true} /> */}
            <ImageBackground
              source={require('../../asset/man-sitting-car.png')}
              resizeMode="cover"
              style={styles.image}>
              <Header navbar={true} />
            </ImageBackground>
            <View style={[styles.compView, { backgroundColor: userContext?.customTheme?.primaryDark }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ width: '75%' }}>
                  <Text variant="headlineMedium" style={styles.txtTitleSty}>{coupon.templateName}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginVertical: 6 }}>
                    <LocationIcon />
                    <Text variant="titleSmall" style={styles.txtSty}>{coupon.address}</Text>
                  </View>
                </View>
                <Image source={require('../../asset/valet.png')}
                  style={styles.img} />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 40, }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 6 }}>
                  <View style={{ width: 16, height: 16, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' }}><WalkIcon /></View>
                  <Text variant="titleSmall" style={styles.txtSty}>800m away</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 6 }}>
                  <SpotnIcon />
                  <Text variant="titleSmall" style={styles.txtSty}>19 Spots</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6, justifyContent: "space-between" }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: userContext?.customTheme?.bgCard, borderRadius: 10 }}>
                  <CallIcon />
                  <Text variant="titleSmall" style={styles.txtSty}>Call</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: userContext?.customTheme?.bgCard, borderRadius: 10 }}>
                  <NearmeIcon />
                  <Text variant="titleSmall" style={styles.txtSty}>Direction</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: userContext?.customTheme?.bgCard, borderRadius: 10 }}>
                  <ShareIcon />
                  <Text variant="titleSmall" style={styles.txtSty}>Share</Text>
                </View>

              </View>

              <View style={{ gap: 8 }}>
                <Text variant="titleSmall" style={styles.txtheadSty}>Service description</Text>
                <View style={{ gap: 4, marginLeft: 16 }}>
                  <Text variant="bodySmall" style={styles.txtSty}>Safe and secure parking</Text>
                  <Text variant="bodySmall" style={styles.txtSty}>Professional and courteous staff</Text>
                  <Text variant="bodySmall" style={styles.txtSty}>Quick and easy vehicle retrieval</Text>
                  <Text variant="bodySmall" style={styles.txtSty}>Special attention to your vehicle's needs</Text>

                </View>

              </View>

              {/* <View style={{ gap: 8 }}>
                <Text variant="titleSmall" style={styles.txtheadSty}>parking duration</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6, justifyContent: "space-between" }}>

                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    data={couponList}
                    renderItem={({ item }) =>
                      <View style={{}}>
                        <View style={[styles.serviceView, { backgroundColor: userContext?.customTheme?.bgCard }]}>
                          <Text variant="bodySmall" style={styles.txtSty}>{coupon?.denomination} Hour</Text>
                        </View>
                        <View style={[styles.serviceBtmView, { backgroundColor: userContext?.customTheme?.bgCard }]}>
                          <Text variant="bodySmall" style={styles.txtSty}>1-Redeems</Text>
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
              </View> */}

              <View style={{ gap: 8 }}>
                <Text variant="titleSmall" style={styles.txtheadSty}>parking duration</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6, justifyContent: "space-around" }}>

                  {ArrQty.map((item, i) => (
                    <TouchableOpacity onPress={() => setSelectQty(item)}>
                      <View key={i} style={item === selectQty ? [styles.serviceView, { backgroundColor: userContext?.customTheme?.txtBlack, borderColor: userContext?.customTheme?.txtWhite }] : [styles.serviceView, { backgroundColor: userContext?.customTheme?.bgCard }]}>
                        <Text variant="bodySmall" style={styles.txtSty}>{item} Hour</Text>
                      </View>
                      {/* <View style={[styles.serviceBtmView, { backgroundColor: userContext?.customTheme?.bgCard }]}> */}
                      <View style={item === selectQty ? [styles.serviceBtmView, { backgroundColor: userContext?.customTheme?.txtBlack, borderColor: userContext?.customTheme?.txtWhite }] : [styles.serviceBtmView, { backgroundColor: userContext?.customTheme?.bgCard }]}>

                        <Text variant="bodySmall" style={styles.txtSty}>1-Redeems</Text>
                      </View>
                    </TouchableOpacity>
                  ))}

                </View>
              </View>

              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingVertical: 10, }}>
                  <TermIcon />
                  <Text variant="bodyLarge" style={styles.txtSty}>Terms & conditions</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingVertical: 10, }}>
                  <TermIcon />
                  <Text variant="bodyLarge" style={styles.txtSty}>How to redeem</Text>
                </View>

              </View>
              <View style={{ marginBottom: 20 }}>
                <PrimaryButton onPress={() => navigation.navigate("RedeemScreen", { coupon: coupon, qty: selectQty, couponList: couponList })} buttonColor={"light"}>Redeem</PrimaryButton>

              </View>
            </View>
          </ScrollView>
        </View> :
        <View style={[styles.containerErr, { backgroundColor: userContext?.customTheme?.primaryDark }]}>
          <Text variant="bodyMedium" style={styles.emtTxt}>Data Not Found</Text>
        </View>
      }
    </>
  );
};

export default ValetDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingHorizontal: 15,

  },
  containerErr: {
    flex: 1,
    //paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',

  },
  compView: {
    // borderRadius:17,
    padding: 10,
    marginTop: 26,
    gap: 26,
  },
  txtSty: {
    color: palette.txtWhite,
  },
  txtTitleSty: {
    fontWeight: '700',
    color: palette.txtWhite,
    textTransform: 'capitalize',

  },
  txtheadSty: {
    color: palette.txtWhite,
    textTransform: 'uppercase',
    letterSpacing: 3
  },
  image: {

    // ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    width: WIDTH,
    // width: 50,
    height: ImageHeight,
    //  backgroundColor:'red'
  },
  img: {
    borderRadius: 17,
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: '#FFF'
  },
  serviceView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    // backgroundColor: palette.bgCard,
    borderRadius: 10,
    // borderColor: '#FFF',
    borderWidth: 1,
    zIndex: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  serviceBtmView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    // backgroundColor: palette.bgCard,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // borderColor: '#FFF',
    borderWidth: 1,
    // position: "relative",
    // bottom: 10,
    paddingTop: 18,
    marginTop: -10
  },
  listContents: {
    gap: 16,

  },
  list: {

  },
  emtTxt: {
    color: palette.txtWhite,
    textAlign: 'center',
    paddingVertical: 30
  },


});


