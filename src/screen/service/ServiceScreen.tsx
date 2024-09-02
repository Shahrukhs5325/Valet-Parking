import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { palette } from '../../theme/themes';
import { Text } from 'react-native-paper';
import Store from '../../components/store/Store';
import CityComonent from '../../components/city/CityComonent';
import { UserContext } from '../../context/user/UserContext';
import { FONT } from '../../theme/fonts';
import TopBannerValet from '../../components/header/TopBannerValet';
import TopBannerAirport from '../../components/header/TopBannerAirport';
import Airport from '../../components/store/Airport';

type Props = {
  route?: any;
};

const ImageHeight = Math.round(Dimensions.get('window').width * 9 / 9);


const ServiceScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);
  const { service } = route.params;

  const [isEnable, setIsEnable] = React.useState(false);



  React.useEffect(() => {

  }, []);



  return (
    <>
      <View style={{
        flex: 1,
        backgroundColor: userContext?.customTheme?.primaryDark,
      }}>
        <StatusBar
          animated={true}
          backgroundColor={userContext?.customTheme?.primaryDark}
        />
        <ScrollView showsVerticalScrollIndicator={false}>

          {service?.key === "valet_service" ?
            <TopBannerValet navbar={true} service={service} />
            :
            <TopBannerAirport navbar={true} service={service} />
          }
          <View style={styles.compView}>
            <View>
              {service?.key === "valet_service" ?
                <Text style={styles.countText}>NUMBER OF HOURS: 100</Text>
                :
                <Text style={styles.countText}>NUMBER OF PACKAGES: 12</Text>
              }
            </View>
            <View>
              <Text style={styles.txtTitleSty}>CITIES</Text>
              <CityComonent service={service} />
            </View>

            <View style={{ paddingBottom: 30 }}>
              <Text style={styles.txtTitleSty}>Near you</Text>
              {service?.key === "valet_service" ?
                <Store /> :
                <Airport />}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  compView: {
    padding: 10,
    gap: 26,
    marginTop: ImageHeight + 10
  },
  txtTitleSty: {
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 16,
    fontWeight: '400',
    color: palette.txtWhite,
    textTransform: 'uppercase',
    letterSpacing: 3,
    paddingBottom: 12
  },
  countText: {
    textAlign: 'center',
    justifyContent: 'center',
    //width: 120,
    backgroundColor: 'rgba(199, 149, 75, 1)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.Able.regular,
    fontSize: 18,
  },



});


