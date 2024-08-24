import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, PermissionsAndroid, Platform, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import TopBanner from '../../components/header/TopBanner';
import Services from '../../components/services/Services';
import Store from '../../components/store/Store';
import { UserContext } from '../../context/user/UserContext';
import { palette } from '../../theme/themes';

type Props = {};

const ImageHeight = Math.round(Dimensions.get('window').width * 9 / 9);


const HomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);
  const [location, setLocation] = React.useState(null);


  React.useEffect(() => {
    requestAuthorizationHandler();
  }, []);


  const requestAuthorizationHandler = async () => {
    if (Platform.OS === 'ios') {
      getCurrentLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Device current location permission',
            message:
              'Allow app to get your current location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }

  const getCurrentLocation = () => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        userContext?.seGeoLocation(position);
        // refetch();
      },
      (error) => {
        console.log("map error: ", error);
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: false, timeout: 1000000, maximumAge: 1000000 }
    );
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={palette.primaryDark}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <TopBanner />
          <View style={styles.compView}>
            <View>
              <Text variant="titleSmall" style={styles.txtTitleSty}>Services you have</Text>
              <Services />
            </View>
            <View style={{ paddingBottom: 30 }}>
              <Text variant="titleSmall" style={styles.txtTitleSty}>Services you have</Text>
              <Store location={location} />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 15,
    backgroundColor: palette.primaryDark,
  },
  compView: {
    padding: 10,
    gap: 26,
    marginTop: ImageHeight + 10
  },
  txtSty: {
    fontWeight: '800'
  },
  txtTitleSty: {
    fontWeight: '600',
    color: palette.primaryLight,
    textTransform: 'uppercase',
    letterSpacing: 3,
    paddingBottom: 12
  },



});


