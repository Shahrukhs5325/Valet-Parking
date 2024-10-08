import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import TopBanner from '../../../components/header/TopBanner';
import Transaction from '../../../components/transaction/Transaction';
import { palette } from '../../../theme/themes';
import { UserContext } from '../../../context/user/UserContext';
import { FONT } from '../../../theme/fonts';

type Props = {};

const ImageHeight = Math.round(Dimensions.get('window').width * 9 / 9);


const TransactionScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const [location, setLocation] = React.useState(null);
  const userContext = React.useContext(UserContext);


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
          <TopBanner navbar={true} />
          <View style={styles.compView}>
            <View>
              <Text style={styles.txtTitleSty}>Valet History</Text>
              <Transaction />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  compView: {
    padding: 10,
    gap: 26,
    marginTop: ImageHeight + 10
  },
  txtTitleSty: {
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 16,
    paddingBottom: 12
  },



});


