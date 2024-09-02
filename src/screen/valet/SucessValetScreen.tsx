import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import PrimaryButton from '../../components/button/PrimaryButton';
import { palette } from '../../theme/themes';
import CircleIcon from '../../assets/svg/check-circle-1.svg';
import SecondaryButton from '../../components/button/SecondaryButton';
import { UserContext } from '../../context/user/UserContext';
import { FONT } from '../../theme/fonts';


type Props = {
  route?: any;
};


const SucessValetScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { response } = route.params;
  const userContext = React.useContext(UserContext);

  React.useEffect(() => {

  }, []);

  return (
    <>
      <View style={[styles.container, { backgroundColor: userContext?.customTheme?.primaryDark }]}>

        <StatusBar
          animated={true}
          backgroundColor={userContext?.customTheme?.primaryDark}
        />
        {/* <Header navbar={true} /> */}

        <View style={styles.compView}>
          <CircleIcon />
          <View style={{ gap: 14, marginVertical: 6, alignItems: 'center' }}>
            <Text style={styles.txtTitleSty}>Thank you</Text>
          </View>
        </View>

        <View style={styles.btnView}>
          <View style={{ width: '46%' }}>
            <SecondaryButton onPress={() => navigation.navigate("HomeScreen")} >Home</SecondaryButton>
          </View>
          <View style={{ width: '46%' }}>
            <PrimaryButton onPress={() => navigation.navigate("History")} buttonColor={"light"} >View Status</PrimaryButton>
          </View>
        </View>
      </View>

    </>
  );
};

export default SucessValetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  compView: {
    gap: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnView: {
    flex: 1,
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  txtTitleSty: {
    fontWeight: '400',
    color: palette.txtWhite,
    textAlign: 'center',
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 22,
  },


});


