import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import TopBanner from '../../components/header/TopBanner';
import Transaction from '../../components/transaction/Transaction';
import { palette } from '../../theme/themes';

type Props = {};

const ImageHeight = Math.round(Dimensions.get('window').width * 9 / 9);


const TransactionScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const [location, setLocation] = React.useState(null);


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
              <Text variant="titleSmall" style={styles.txtTitleSty}>Valete History</Text>
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
  container: {
    flex: 1,
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


