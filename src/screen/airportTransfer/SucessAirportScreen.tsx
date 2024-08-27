import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import PrimaryButton from '../../components/button/PrimaryButton';
import { palette } from '../../theme/themes';
import CircleIcon from '../../asset/svg/check-circle-1.svg';
import SecondaryButton from '../../components/button/SecondaryButton';
import { UserContext } from '../../context/user/UserContext';


type Props = {
  // route?: any;
};


const SucessAirportScreen: React.FC<Props> = ({ }) => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);

  React.useEffect(() => {

  }, []);

  return (
    <>
      <View style={[styles.container, { backgroundColor: userContext?.customTheme?.primaryDark }]}>

        <StatusBar
          animated={true}
          backgroundColor={palette.primaryDark}
        />

        <View style={styles.compView}>
          <CircleIcon />
          <View style={{ gap: 8, marginVertical: 6, alignItems: 'center' }}>
            <Text variant="titleLarge" style={styles.txtTitleSty}>Booking Confirmed!</Text>
            <Text variant="titleSmall" style={styles.txtSty}>Thank you for booking your exclusive airport service with us!</Text>
          </View>
        </View>

        <View style={styles.btnView}>
          <View style={{ width: '45%' }}>
            <SecondaryButton onPress={() => navigation.navigate("HomeScreen")} >Home</SecondaryButton>
          </View>
          <View style={{ width: '45%' }}>
            <PrimaryButton onPress={() => navigation.replace("AirportTransTransactionDetailsScreen")} buttonColor={"light"} >View Status</PrimaryButton>
          </View>
        </View>
      </View>

    </>
  );
};

export default SucessAirportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compView: {
    gap: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnView: {
    flex: 1,
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  txtSty: {
    color: palette.txtWhite,
  },
  txtTitleSty: {
    fontWeight: '700',
    color: palette.txtWhite,
    textTransform: 'capitalize',
    textAlign: 'center'
  },
  txtheadSty: {
    color: palette.txtWhite,
    textAlign: 'center'
  },


});


