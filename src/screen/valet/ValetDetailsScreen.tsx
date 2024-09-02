import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import CallIcon from '../../assets/svg/call.svg';
import DownIcon from '../../assets/svg/Sort Down.svg';
import LocationIcon from '../../assets/svg/Location.svg';
import MapIcon from '../../assets/svg/Waypoint Map.svg';
import PrimaryButton from '../../components/button/PrimaryButton';
import Header from '../../components/header/Header';
import { palette } from '../../theme/themes';
import TermIcon from '../../assets/svg/Rules Book.svg';
import HelpIcon from '../../assets/svg/help.svg';
import { useQuery } from '@tanstack/react-query';
import { UserContext } from '../../context/user/UserContext';
import { getCustomerCouponsByStoreIdNMerchantId } from '../../api/common/commonApi';
import { FONT } from '../../theme/fonts';

import SelectDropdown from 'react-native-select-dropdown';
import { openAddressOnMap } from '../../constant/constFunction';
import TermsModal from './TermsModal';
import RedeemModal from './RedeemModal';

type Props = {
  route?: any;
};

const ArrQty = [{ title: 1 }, { title: 2 }, { title: 3 }];

const WIDTH = Dimensions.get('window').width;
const ImageHeight = Math.round((Dimensions.get('window').width * 6) / 9);

const ValetDetailsScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);
  const scrollViewRef = React.useRef(null);
  const focus = useIsFocused();

  const { store } = route.params;

  const [coupon, setCoupon] = React.useState('');
  const [couponList, setCouponList] = React.useState([]);
  const [selectQty, setSelectQty] = React.useState({ title: 1 });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleRedeem, setModalVisibleRedeem] = useState(false);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['Coupon_list_by_city', userContext?.user, store],
    queryFn: () =>
      getCustomerCouponsByStoreIdNMerchantId(userContext?.user, store),
  });

  React.useEffect(() => {
    setCoupon(data?.data?.data && data?.data?.data?.[0]);
    setCouponList(data?.data?.data);
  }, [data?.data?.data]);

  React.useEffect(() => {
    focus && onScrollToTop(); refetch();
  }, [focus]);

  if (isLoading) {
    return (
      <View
        style={[
          styles.containerErr,
          { backgroundColor: userContext?.customTheme?.primaryDark },
        ]}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }


  const onScrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  const terms = [
    'The gift card is valid for a specified period, typically mentioned on the card or accompanying documentation.',
    'It cannot be redeemed or extended beyond the specified validity period.',
    'The gift card can be redeemed for eligible products or services offered by the issuing company or authorized partners.',
    'The redemption process and eligible redemption locations should be clearly defined.',
    'Gift cards are non-refundable and cannot be exchanged for cash or credit, except as required by law.',
  ];

  const redeemSteps = [
    'Select the number of hours that you would like to avail.',
    'Press redeem to generate the voucher.',
    'Show the voucher to the Valet Representative (VR).',
    'The VR will enter the code in the application.',
    'Handover your vehicle the VR.',
  ];
  return (
    <>
      {coupon ? (
        <View
          style={[
            styles.container,
            { backgroundColor: userContext?.customTheme?.primaryDark },
          ]}>
          <StatusBar
            animated={true}
            backgroundColor={userContext?.customTheme?.primaryDark}
          />
          <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} >
            <ImageBackground
              source={require('../../assets/bg-valet-banner.png')}
              resizeMode="cover"
              style={styles.image}>
              <Header navbar={true} />
            </ImageBackground>
            <View
              style={[
                styles.compView,
                { backgroundColor: userContext?.customTheme?.primaryDark },
              ]}>
              <View style={{ gap: 10 }}>
                <Text style={styles.txtTitleSty}>{coupon.templateName}</Text>
                <Text style={styles.txtaddSty}>{coupon.address}</Text>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <LocationIcon />
                  <Text style={styles.kmTxt}>{store?.distance} Km away</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 6,
                  justifyContent: 'space-evenly',
                }}>
                <View style={styles.viewCall}>
                  <CallIcon />
                  <Text style={styles.txtUtilSty}>Call</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    openAddressOnMap(
                      coupon?.latitude,
                      coupon?.longitude,
                      coupon?.templateName,
                    )
                  }>
                  <View style={styles.viewCall}>
                    <MapIcon />
                    <Text style={styles.txtUtilSty}>Direction</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{ borderBottomWidth: 1.4, borderColor: palette.bgGray }}
              />

              <View style={{ gap: 8 }}>
                <Text style={styles.txtheadSty}>Service description</Text>
                <View style={{ gap: 4, marginLeft: 16 }}>
                  <Text style={styles.txtDataSty}>Safe and secure parking</Text>
                  <Text style={styles.txtDataSty}>
                    Professional and courteous staff
                  </Text>
                  <Text style={styles.txtDataSty}>
                    Quick and easy vehicle retrieval
                  </Text>
                  <Text style={styles.txtDataSty}>
                    Special attention to your vehicle's needs
                  </Text>
                </View>
              </View>

              <View style={{ gap: 18 }}>
                <Text style={styles.txtheadSty}>Parking duration</Text>

                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                  <Text style={[styles.txtheadSty, { width: '40%' }]}>
                    BALANCE HOURS
                  </Text>
                  <View style={styles.viewDataCall}>
                    <Text style={styles.txtheadSty}>100</Text>
                  </View>
                </View>

                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                  <Text style={[styles.txtheadSty, { width: '40%' }]}>
                    SELECT QUANTITY
                  </Text>
                  <View>
                    <SelectDropdown
                      data={ArrQty}
                      onSelect={(selectedItem, index) => {
                        setSelectQty(selectedItem);
                      }}
                      renderButton={(selectedItem, isOpened) => {
                        return (
                          <View style={styles.dropdownButtonStyle}>
                            <Text style={styles.txtSty}>
                              {(selectQty && "0" + selectQty?.title) + ' Hrs' ||
                                'Select hrs'}
                            </Text>
                            <DownIcon />
                          </View>
                        );
                      }}
                      renderItem={(item, index, isSelected) => {
                        return (
                          <View
                            style={{
                              ...styles.dropdownItemStyle,
                              ...(isSelected && {
                                backgroundColor: palette.txtBlack,
                              }),
                            }}>
                            <Text style={styles.txtSty}>0{item.title} Hrs</Text>
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
                {/* <View style={styles.viewTerm}>
                  <View style={{ backgroundColor: palette.bgCard, width: 33, height: 33, borderRadius: 90, justifyContent: 'center', alignItems: 'center' }}>
                    <TermIcon />
                  </View>
                  <Text style={styles.txtTermSty}>Terms & conditions</Text>
                </View> */}
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <View style={styles.viewTerm}>
                    <View
                      style={{
                        backgroundColor: palette.bgCard,
                        width: 33,
                        height: 33,
                        borderRadius: 90,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TermIcon />
                    </View>
                    <Text style={styles.txtTermSty}>Terms & conditions</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setModalVisibleRedeem(true)}>
                  <View style={styles.viewTerm}>
                    <View
                      style={{
                        backgroundColor: palette.bgCard,
                        width: 33,
                        height: 33,
                        borderRadius: 90,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <HelpIcon />
                    </View>
                    <Text style={styles.txtTermSty}>How to redeem</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ marginBottom: 20 }}>
                <PrimaryButton
                  onPress={() =>
                    navigation.navigate('RedeemScreen', {
                      coupon: coupon,
                      qty: selectQty.title,
                      couponList: couponList,
                    })
                  }
                  buttonColor={'light'}>
                  Submit
                </PrimaryButton>
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View
          style={[
            styles.containerErr,
            { backgroundColor: userContext?.customTheme?.primaryDark },
          ]}>
          <Text style={styles.emtTxt}>Data Not Found</Text>
        </View>
      )}
      <View>
        <TermsModal
          modalVisible={modalVisible}
          setModalVisible={() => setModalVisible}
          terms={terms}
          onPress={() => setModalVisible(!modalVisible)}
        />
      </View>
      <View>
        <RedeemModal
          modalVisible={modalVisibleRedeem}
          setModalVisible={() => setModalVisibleRedeem}
          steps={redeemSteps}
          onPress={() => setModalVisibleRedeem(!modalVisibleRedeem)}
        />
      </View>
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
    width: WIDTH / 2.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: palette.bgCard,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.txtGray,
    justifyContent: 'center',
    height: 44,
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
  txtUtilSty: {
    fontFamily: FONT.Able.regular,
    fontSize: 14,
    fontWeight: '400',
    color: palette.txtWhite,
    textAlign: 'center',
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
    textDecorationLine: 'underline',
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
    borderColor: '#FFF',
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
    marginTop: -10,
  },
  listContents: {
    gap: 16,
  },
  list: {},
  emtTxt: {
    color: palette.txtWhite,
    textAlign: 'center',
    paddingVertical: 30,
  },
  viewTerm: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
    backgroundColor: '#6A6868',
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
