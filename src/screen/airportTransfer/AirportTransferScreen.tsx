import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import StepOne from '../../components/airportTransfer/StepOne';
import PrimaryButton from '../../components/button/PrimaryButton';
import SecondaryButton from '../../components/button/SecondaryButton';
import Header from '../../components/header/Header';
import { UserContext } from '../../context/user/UserContext';
import { palette } from '../../theme/themes';
import Stepper from '../../components/stepper/Stepper';

type Props = {
  route: any;
};

const STEPPER_LABEL = ["Airport Service", "Flight details", "Confirmation"];


const AirportTransferScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { city } = route.params;
  const userContext = React.useContext(UserContext);

  const [currentPosition, setCurrentPosition] = React.useState(3);

  const [formData, setFormData] = React.useState({
    firstName: '',
    LastName: '',
    email: '',
    password: '',
    activationCode: '',
    lastSixDigit: '',
    firstFourDigit: '',
    creditCardName: '',
  });
  const [errors, setErrors] = React.useState("");

  return (
    <>
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={userContext?.customTheme?.primaryDark}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, backgroundColor: userContext?.customTheme?.primaryDark, paddingBottom: 50 }}>
            <Header navbar={true} />
            <View
              style={[styles.compView, { backgroundColor: userContext?.customTheme?.primaryDark }]}
            >
              <Text variant="titleLarge" style={styles.txtSty}>Enter Your Detailsfor a Smooth Journey</Text>
            </View>
          </View>

          <View style={{ flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -20, backgroundColor: palette.bgGray, paddingBottom: 30 }}>
            <Stepper
              labels={STEPPER_LABEL}
              currentPosition={currentPosition}
              setCurrentPosition={setCurrentPosition}
            />
            <StepOne
              formData={formData}
              setFormData={setFormData}
              setErrors={setErrors}
            />

            <View style={{ width: '100%', marginTop: 30, flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={{ width: '40%' }}>
                <PrimaryButton onPress={() => console.log()} buttonColor={"light"} >View Status</PrimaryButton>
              </View>
              <View style={{ width: '40%' }}>
                <SecondaryButton onPress={() => navigation.navigate("HomeScreen")} >Next</SecondaryButton>
              </View>
            </View>

          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default AirportTransferScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  compView: {
    marginTop: 50,
    paddingHorizontal: 15,
    gap: 10,
    marginBottom: 25
    //  backgroundColor: palette.primaryDark
  },
  txtSty: {
    fontWeight: '800',
    color: palette.txtWhite,
    width: '70%'
  },
  txtStysec: {
    color: palette.txtWhite,
  },
  txtTitleSty: {
    fontWeight: '800',
    color: palette.txtWhite,
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  img: {
    width: 100,
    height: 100
  },
  txtStatusSty: {
    backgroundColor: palette.txtGold,
    color: palette.txtWhite,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 15
  },
  txtBlackHeading: {
    color: palette.txtBlack,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  txtSummHeading: {
    color: palette.txtBlack,
    fontWeight: '800',
  },
  txtBodyHeading: {
    color: palette.txtGray,
  }



});


