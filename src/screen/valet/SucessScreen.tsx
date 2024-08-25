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
  route?: any;
};


const SucessScreen: React.FC<Props> = ({ route }) => {
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
          backgroundColor={palette.primaryDark}
        />
        {/* <Header navbar={true} /> */}

        <View style={styles.compView}>
          <CircleIcon />
          <View style={{ gap: 8, marginVertical: 6, alignItems: 'center' }}>
            <Text variant="titleLarge" style={styles.txtTitleSty}>Thank you</Text>
            <Text variant="titleSmall" style={styles.txtSty}>You’re using valet service at {response?.templateName}</Text>
          </View>


        </View>
        <View style={{ marginTop: 50, flexDirection: 'row', gap: 20, justifyContent: 'space-evenly' }}>
          <SecondaryButton onPress={() => navigation.navigate("HomeScreen")} >Home</SecondaryButton>
          <PrimaryButton onPress={() => navigation.navigate("HomeScreen")} buttonColor={"light"} >View Status</PrimaryButton>
        </View>
      </View>

    </>
  );
};

export default SucessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 70,
  },
  compView: {
    padding: 10,
    marginTop: 100,
    gap: 26,
    justifyContent: 'center',
    alignItems: 'center',
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


