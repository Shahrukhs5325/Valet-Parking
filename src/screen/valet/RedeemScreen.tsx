import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { Text } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import PrimaryButton from '../../components/button/PrimaryButton';
import Header from '../../components/header/Header';
import { UserContext } from '../../context/user/UserContext';
import { palette } from '../../theme/themes';


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

  const ref = useBlurOnFulfill({ storeCode, cellCount: STORE_CODE_COUNT });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    storeCode,
    setStoreCode,
  });



  React.useEffect(() => {

  }, []);





  return (
    <>

      <View style={styles.container}>

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
                value={"gvhvj"}
                // logo={{ uri: payload?.imageLink }}
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
          <PrimaryButton onPress={() => console.log()} buttonColor={palette.primaryLight}>Redeem</PrimaryButton>

        </View>
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
    backgroundColor: palette.primaryDark
  },
  compView: {
    padding: 10,
    marginTop: 26,
    gap: 26,
  },
  txtSty: {
    color: palette.primaryLight,

  },
  txtTitleSty: {
    fontWeight: '700',
    color: palette.primaryLight,
    textTransform: 'capitalize',
    textAlign: 'center'

  },
  txtheadSty: {
    color: palette.primaryLight,
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
    borderColor: palette.primary
  },


});


