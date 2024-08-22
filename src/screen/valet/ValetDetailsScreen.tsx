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


type Props = {};


const WIDTH = Dimensions.get('window').width;
const ImageHeight = Math.round(Dimensions.get('window').width * 6 / 9);

const ValetDetailsScreen: React.FC<Props> = () => {
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
        <ScrollView>
          {/* <TopBanner navbar={true} /> */}
          <ImageBackground
            source={require('../../asset/man-sitting-car.png')}
            resizeMode="cover"
            style={styles.image}>
            <Header navbar={true} />
            <View style={{ position: 'absolute', bottom: 0, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', padding: 20, gap: 6 }}>
              <Text variant="titleLarge" style={{ color: palette.primaryLight, fontWeight: 800 }}>Valet Services</Text>
              <Text variant="bodyMedium" style={{ color: palette.primaryLight, textAlign: 'center' }}>Our professional valet team ensures your vehicle is safe and secure.</Text>

            </View>
          </ImageBackground>
          <View style={styles.compView}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text variant="headlineMedium" style={styles.txtTitleSty}>Billionaire</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginVertical: 6 }}>
                  <LocationIcon />
                  <Text variant="titleSmall" style={styles.txtSty}>Billionaire</Text>
                </View>
              </View>
              <Image source={require('../../asset/valet.png')}
                style={styles.img} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 40, }}>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginVertical: 6 }}>
                <View style={{ width: 16, height: 16, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' }}><WalkIcon /></View>
                <Text variant="titleSmall" style={styles.txtSty}>800m away</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginVertical: 6 }}>
                <SpotnIcon />
                <Text variant="titleSmall" style={styles.txtSty}>19 Spots</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6, justifyContent: "space-between" }}>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#333333', borderRadius: 10 }}>
                <CallIcon />
                <Text variant="titleSmall" style={styles.txtSty}>Call</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#333333', borderRadius: 10 }}>
                <NearmeIcon />
                <Text variant="titleSmall" style={styles.txtSty}>Direction</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#333333', borderRadius: 10 }}>
                <ShareIcon />
                <Text variant="titleSmall" style={styles.txtSty}>Share</Text>
              </View>

            </View>

            <View>
              <Text variant="titleSmall" style={styles.txtheadSty}>Service description</Text>

            </View>
            <View>
              <Text variant="titleSmall" style={styles.txtheadSty}>parking duration</Text>

            </View>
            <View>
            <PrimaryButton onPress={() => console.log()} buttonColor={palette.primaryLight}>Redeem</PrimaryButton>

            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ValetDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingHorizontal: 15,
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

  },
  txtheadSty: {
    color: palette.primaryLight,
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
  }


});


