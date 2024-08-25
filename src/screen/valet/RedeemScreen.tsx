import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { Snackbar, Text } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import PrimaryButton from '../../components/button/PrimaryButton';
import Header from '../../components/header/Header';
import { UserContext } from '../../context/user/UserContext';
import { palette } from '../../theme/themes';
import { redeemCouponByqrCode } from '../../api/common/commonApi';


type Props = {
  route?: any;
};

const STORE_CODE_COUNT = 4
const WIDTH = Dimensions.get('window').width;
const ImageHeight = Math.round(Dimensions.get('window').width * 6 / 9);

const RedeemScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { coupon } = route.params;

  const userContext = React.useContext(UserContext);
  const [storeCode, setStoreCode] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const ref = useBlurOnFulfill({ storeCode, cellCount: STORE_CODE_COUNT });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    storeCode,
    setStoreCode,
  });


  React.useEffect(() => {

  }, []);

  const onDismissSnackBar = () => setVisible(false);


  const redeemCouponByqrCodeHandler = async () => {
    setIsLoading(true);
    const payload = {
      "couponCode": coupon?.couponCode,
      "redeemptionId": 0,
      "storeId": 0,
      "couponId": coupon?.couponId ? coupon?.couponId : 0,
      "statusId": 0,
      "userId": userContext?.user?.customerId,
      "invoiceAmount": 0,
      "phoneNumber": userContext?.user?.phoneNo,
      "merchantId": coupon?.merchantId,
      "binNumber": 0,
      "redemptionAmount": 0,
      "redeemptionTypeName": "online",
      "redeemptionTypeId": 0,
      "points": coupon?.sellingPoints,
      "email": userContext?.user?.email,
      "name": userContext?.user?.customerName,
      "merchantName": coupon?.merchantName,
      "qrCode": "",
      "storePin": storeCode,
      "redeemByPin": true
    }

    try {
      const res = await redeemCouponByqrCode(payload);
      if (res.status === 200) {
        console.log("___________res:", res?.data?.data?.coupondetails);
        const resData = res?.data?.data?.coupondetails
        navigation.navigate("SucessScreen", { response: resData });
        setIsLoading(false);
      }
    } catch (err) {

      setError(err.response.data.errorMessages ? err.response.data.errorMessages : "Error");
      setVisible(true);
      setIsLoading(false);

      console.log("error redeemCouponByqrCode ", err.response.data.errorMessages)
    }
  }

  return (
    <>

      <View style={[styles.container, { backgroundColor: userContext?.customTheme?.primaryDark }]}>

        <StatusBar
          animated={true}
          backgroundColor={palette.primaryDark}
        />
        <Header navbar={true} />

        <View style={styles.compView}>
          <View style={{ gap: 8, marginVertical: 6, alignItems: 'center' }}>
            <Text variant="headlineMedium" style={styles.txtTitleSty}>Billionaire</Text>
            <Text variant="bodySmall" style={styles.txtSty}>DISTRICT, RIYADH - DAB AB ST. SULAIMANIYA, Riyadh Saudi Arabia</Text>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>
            <Text variant="titleSmall" style={styles.txtheadSty}>Please share this QR to valet counter</Text>
            <View style={{ backgroundColor: "#FFF", height: 140, width: 140, borderRadius: 17, alignItems: 'center', justifyContent: 'center' }}>
              <QRCode
                value={coupon?.couponCode}
                logoSize={30}
                logoBorderRadius={20}
                logoBackgroundColor="transparent"
              />
            </View>
          </View>
          <Text variant="titleSmall" style={styles.txtheadSty}>OR</Text>

          <View>
            <Text variant="titleSmall" style={styles.txtheadSty}>Ask code to redeem this service</Text>
            <View style={{ width: '60%', alignSelf: 'center' }}>
              <CodeField
                ref={ref}
                value={storeCode}
                onChangeText={setStoreCode}
                cellCount={STORE_CODE_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                blurOnSubmit={true}
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            </View>
          </View>

        </View>
        <View style={{ width: '100%', marginTop: 60 }}>
          <PrimaryButton loading={isLoading} onPress={() => redeemCouponByqrCodeHandler()} buttonColor={"light"}>Redeem</PrimaryButton>

        </View>
      </View>
      <View style={{}}>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Undo',
            onPress: () => {
              // Do something
            },
          }}>
          {error && error?.[0]}
        </Snackbar>
      </View>
    </>
  );
};

export default RedeemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  compView: {
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
    textAlign: 'center'

  },
  txtheadSty: {
    color: palette.txtWhite,
    textAlign: 'center'
  },
  image: {
    resizeMode: 'cover',
    width: WIDTH,
    height: ImageHeight,
  },
  img: {
    borderRadius: 17,
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: '#FFF'
  },
  root: { padding: 20, minHeight: 300 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#FFF',
    textAlign: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10
  },
  focusCell: {
    borderColor: palette.txtWhite
  },


});


