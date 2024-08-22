import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { palette } from '../../theme/themes';
import TopBanner from '../../components/header/TopBanner';
import Services from '../../components/services/Services';
import { Text } from 'react-native-paper';
import Store from '../../components/store/Store';
import { UserContext } from '../../context/user/UserContext';

type Props = {};

const ImageHeight = Math.round(Dimensions.get('window').width * 9 / 9);


const HomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);


console.log("userContext",userContext);

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
          <TopBanner />
          <View style={styles.compView}>
            <View>
              <Text variant="titleSmall" style={styles.txtTitleSty}>Services you have</Text>
              <Services />
            </View>
            <View>
              <Text variant="titleSmall" style={styles.txtTitleSty}>Services you have</Text>
              <Store />
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
    backgroundColor: palette.primaryDark
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


