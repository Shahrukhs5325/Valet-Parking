import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import CallIcon from '../../assets/svg/call.svg';
import ShareIcon from '../../assets/svg/communities.svg';
import DownIcon from '../../assets/svg/Sort Down.svg';
import LocationIcon from '../../assets/svg/Location.svg';
import MapIcon from '../../assets/svg/Waypoint Map.svg';
import SpotnIcon from '../../assets/svg/stop.svg';
import PrimaryButton from '../../components/button/PrimaryButton';
import Header from '../../components/header/Header';
import { palette } from '../../theme/themes';
import TermIcon from '../../assets/svg/Rules Book.svg';
import HelpIcon from '../../assets/svg/help.svg';
import { useQuery } from '@tanstack/react-query';
import { UserContext } from '../../context/user/UserContext';
import { getCustomerCouponsByStoreIdNMerchantId } from '../../api/common/commonApi';
import { FONT } from '../../theme/fonts';

import SelectDropdown from 'react-native-select-dropdown'
import { openAddressOnMap } from '../../constant/constFunction';

type Props = {
  route?: any;
};

const ArrQty = [
  { title: 1, },
  { title: 2, },
  { title: 3, },
]


const WIDTH = Dimensions.get('window').width;
const ImageHeight = Math.round(Dimensions.get('window').width * 6 / 9);

const ValetDetailsScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);

  const { store } = route.params;

  const [coupon, setCoupon] = React.useState("");
  const [couponList, setCouponList] = React.useState([]);
  const [selectQty, setSelectQty] = React.useState({ title: 1, });



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
    setCouponList(data?.data?.data);
  }, [data?.data?.data]);


  if (isLoading) {
    return (
      <View style={[styles.containerErr, { backgroundColor: userContext?.customTheme?.primaryDark }]}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    )
  }


  return (
    <>
      {coupon ?
        <View style={[styles.container, { backgroundColor: userContext?.customTheme?.primaryDark }]}>
          <StatusBar
            animated={true}
            backgroundColor={userContext?.customTheme?.primaryDark}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <ImageBackground
              source={require('../../assets/valet-store-img.png')}
              resizeMode="cover"
              style={styles.image}>
              <Header navbar={true} />
            </ImageBackground>
            <View style={[styles.compView, { backgroundColor: userContext?.customTheme?.primaryDark }]}>
              <View style={{ gap: 10 }}>
                <Text style={styles.txtTitleSty}>{coupon.templateName}</Text>
                <Text style={styles.txtaddSty}>{coupon.address}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <LocationIcon />
                  <Text style={styles.kmTxt}>5 Kms away</Text>
                </View>
              </View>


              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6, justifyContent: "space-evenly" }}>
                <View style={styles.viewCall}>
                  <CallIcon />
                  <Text style={styles.txtSty}>Call</Text>
                </View>
                <TouchableOpacity onPress={() => openAddressOnMap(coupon?.latitude, coupon?.longitude, coupon?.templateName)}>
                  <View style={styles.viewCall}>
                    <MapIcon />
                    <Text style={styles.txtSty}>Direction</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ borderBottomWidth: 1.4, borderColor: palette.bgGray }} />

              <View style={{ gap: 8 }}>
                <Text style={styles.txtheadSty}>Service description</Text>
                <View style={{ gap: 4, marginLeft: 16 }}>
                  <Text style={styles.txtDataSty}>Safe and secure parking</Text>
                  <Text style={styles.txtDataSty}>Professional and courteous staff</Text>
                  <Text style={styles.txtDataSty}>Quick and easy vehicle retrieval</Text>
                  <Text style={styles.txtDataSty}>Special attention to your vehicle's needs</Text>
                </View>

              </View>

              <View style={{ gap: 18 }}>
                <Text style={styles.txtheadSty}>Parking duration</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                  <Text style={[styles.txtheadSty, { width: "40%" }]}>BALANCE HOURS</Text>
                  <View style={styles.viewDataCall}>
                    <Text style={styles.txtheadSty}>100</Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                  <Text style={[styles.txtheadSty, { width: "40%" }]}>SELECT QUANTITY</Text>
                  <View >
                    <SelectDropdown
                      data={ArrQty}
                      onSelect={(selectedItem, index) => {
                        setSelectQty(selectedItem);
                      }}
                      renderButton={(selectedItem, isOpened) => {
                        return (
                          <View style={styles.dropdownButtonStyle}>
                            <Text style={styles.txtSty}>
                              {(selectQty && selectQty?.title) + " Hrs" || 'Select hrs'}
                            </Text>
                            <DownIcon />
                          </View>
                        );
                      }}
                      renderItem={(item, index, isSelected) => {
                        return (
                          <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: palette.txtBlack }) }}>
                            <Text style={styles.txtSty}>{item.title} Hrs</Text>
                          </View>
                        );
                      }}
                      showsVerticalScrollIndicator={false}
                      dropdownStyle={styles.dropdownMenuStyle}
                    />
                  </View>
                </View>
              </View>

              <View>
                <View style={styles.viewTerm}>
                  <View style={{ backgroundColor: palette.bgCard, width: 33, height: 33, borderRadius: 90, justifyContent: 'center', alignItems: 'center' }}>
                    <TermIcon />
                  </View>
                  <Text style={styles.txtTermSty}>Terms & conditions</Text>
                </View>
                <View style={styles.viewTerm}>
                  <View style={{ backgroundColor: palette.bgCard, width: 33, height: 33, borderRadius: 90, justifyContent: 'center', alignItems: 'center' }}>
                    <HelpIcon />
                  </View>
                  <Text style={styles.txtTermSty}>How to redeem</Text>
                </View>

              </View>
              <View style={{ marginBottom: 20 }}>
                <PrimaryButton onPress={() => navigation.navigate("RedeemScreen", { coupon: coupon, qty: selectQty.title, couponList: couponList })} buttonColor={"light"}>Redeem</PrimaryButton>

              </View>
            </View>
          </ScrollView>
        </View> :
        <View style={[styles.containerErr, { backgroundColor: userContext?.customTheme?.primaryDark }]}>
          <Text style={styles.emtTxt}>Data Not Found</Text>
        </View>
      }
    </>
  );
};

export default ValetDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerErr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compView: {
    borderRadius: 17,
    padding: 16,
    paddingTop: 26,
    marginTop: -10,
    gap: 26,
  },
  viewCall: {
    width: WIDTH / 3.4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: palette.bgCard,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.txtGray,
  },
  viewDataCall: {
    width: WIDTH / 4,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: palette.bgCard,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.txtGray,
  },
  txtSty: {
    fontFamily: FONT.Able.regular,
    fontSize: 14,
    fontWeight: '400',
    color: palette.txtWhite,
  },
  txtTitleSty: {
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 24,
  },
  txtaddSty: {
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 12,
  },
  kmTxt: {
    fontWeight: '400',
    fontSize: 12,
    color: palette.txtWhite,
    fontFamily: FONT.Able.regular,
  },
  txtheadSty: {
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 16,
  },
  txtDataSty: {
    fontWeight: '400',
    fontSize: 12,
    color: palette.txtWhite,
    fontFamily: FONT.Able.regular,
  },
  txtTermSty: {
    fontWeight: '400',
    fontSize: 14,
    color: palette.txtWhite,
    fontFamily: FONT.Able.regular,
    textDecorationLine: 'underline'
  },
  image: {
    resizeMode: 'cover',
    width: WIDTH,
    // width: 50,
    height: ImageHeight,
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
    borderRadius: 10,
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
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    paddingTop: 18,
    borderTopWidth: 0,
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
  viewTerm: {
    flexDirection: 'row',
    alignItems: 'center', gap: 10,
    paddingVertical: 10,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontWeight: '400',
    fontSize: 12,
    color: palette.txtWhite,
    fontFamily: FONT.Able.regular,
  },
  dropdownButtonStyle: {
    width: WIDTH / 4,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: "#6A6868",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.txtGray,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    paddingVertical: 14,
  },
  dropdownMenuStyle: {
    backgroundColor: palette.bgCard,
    borderRadius: 8,
  },







});


