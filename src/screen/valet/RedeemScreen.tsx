import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { palette } from '../../theme/themes';
import TopBanner from '../../components/header/TopBanner';
import Services from '../../components/services/Services';
import { Text } from 'react-native-paper';
import Store from '../../components/store/Store';
import CityComonent from '../../components/city/CityComonent';
import Header from '../../components/header/Header';
import WalkIcon from '../../asset/svg/directions_walk.svg';
import SpotnIcon from '../../asset/svg/stop.svg';
import LocationIcon from '../../asset/svg/location_on.svg';
import CallIcon from '../../asset/svg/call.svg';
import DirectionIcon from '../../asset/svg/.svg';
import NearmeIcon from '../../asset/svg/near_me.svg';
import ShareIcon from '../../asset/svg/communities.svg';
import PrimaryButton from '../../components/button/PrimaryButton';
import QRCode from 'react-native-qrcode-svg';


type Props = {};


const WIDTH = Dimensions.get('window').width;
const ImageHeight = Math.round(Dimensions.get('window').width * 6 / 9);

const RedeemScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  // const userContext = React.useContext(UserContext);
  const [isEnable, setIsEnable] = React.useState(false);



  React.useEffect(() => {

  }, []);





  return (
    <>
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={palette.primaryDark}
        />

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
          <View>
            <Text variant="titleSmall" style={styles.txtheadSty}>Ask code to redeem this service</Text>

          </View>

        </View>
        <View style={{ width: '100%' }}>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    // textTransform: 'uppercase',
    // letterSpacing: 3
    textAlign: 'center'
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
  }


});


