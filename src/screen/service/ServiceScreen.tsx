import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { palette } from '../../theme/themes';
import TopBanner from '../../components/header/TopBanner';
import Services from '../../components/services/Services';
import { Text } from 'react-native-paper';
import Store from '../../components/store/Store';
import CityComonent from '../../components/city/CityComonent';
import { UserContext } from '../../context/user/UserContext';
import { FONT } from '../../theme/fonts';
import TopBannerValet from '../../components/header/TopBannerValet';

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
          <TopBannerValet navbar={true} service={service} />
          <View style={styles.compView}>
            <View>
              <Text variant="titleSmall" style={styles.txtTitleSty}>CITIES</Text>
              <CityComonent service={service} />
            </View>
            <View style={{ paddingBottom: 30 }}>
              <Text variant="titleSmall" style={styles.txtTitleSty}>Near you</Text>
              <Store />
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



});


