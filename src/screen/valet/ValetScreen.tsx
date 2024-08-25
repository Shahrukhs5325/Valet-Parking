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

type Props = {};

const ImageHeight = Math.round(Dimensions.get('window').width * 9 / 9);


const ValetScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);
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
          backgroundColor={palette.primaryDark}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <TopBanner navbar={true} />
          <View style={styles.compView}>
            <View>
              <Text variant="titleSmall" style={styles.txtTitleSty}>Services you have</Text>
              <CityComonent />
            </View>
            <View style={{ paddingBottom: 30 }}>
              <Text variant="titleSmall" style={styles.txtTitleSty}>Services you have</Text>
              <Store />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ValetScreen;

const styles = StyleSheet.create({
  compView: {
    padding: 10,
    gap: 26,
    marginTop: ImageHeight + 10
  },
  txtTitleSty: {
    fontWeight: '600',
    color: palette.txtWhite,
    textTransform: 'uppercase',
    letterSpacing: 3,
    paddingBottom: 12
  },



});


