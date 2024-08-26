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
import StepTwo from '../../components/airportTransfer/StepTwo';
import StepThree from '../../components/airportTransfer/StepThree';

type Props = {
  route: any;
};

const STEPPER_LABEL = ["Airport Service", "Flight details", "Confirmation"];


const AirportTransferScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { city } = route.params;
  const userContext = React.useContext(UserContext);

  const [currentPosition, setCurrentPosition] = React.useState(0);

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

  const nextStepHandler = () => {
    setCurrentPosition(currentPosition + 1);
  }

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
              {currentPosition === 0 ?
                (<Text variant="titleLarge" style={styles.txtSty}>Enter Your Details for a Smooth Journey</Text>)
                : currentPosition === 1 ?
                  (<Text variant="titleLarge" style={styles.txtSty}>Almost there! Just a few more details.</Text>)
                  :
                  (<Text variant="titleLarge" style={styles.txtSty}>You've done it! Just confirm your flight details</Text>)
              }
            </View>
          </View>

          <View style={{ flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -20, backgroundColor: palette.bgGray, paddingBottom: 30 }}>
            <Stepper
              labels={STEPPER_LABEL}
              currentPosition={currentPosition}
              setCurrentPosition={setCurrentPosition}
              onPress={nextStepHandler}
            />

            {currentPosition === 0 ?
              (<StepOne
                formData={formData}
                setFormData={setFormData}
                setErrors={setErrors}

              />)
              : currentPosition === 1 ?
                (<StepTwo
                  formData={formData}
                  setFormData={setFormData}
                  setErrors={setErrors}

                />) :
                (<StepThree
                  formData={formData}
                  setFormData={setFormData}
                  setErrors={setErrors}

                />)
            }


            <View style={styles.btnView}>
              <View style={{ width: '40%' }}>
                <PrimaryButton disabled={currentPosition <= 0} onPress={() => setCurrentPosition(currentPosition - 1)} buttonColor={"light"} >Back</PrimaryButton>
              </View>
              <View style={{ width: '40%' }}>
                <SecondaryButton onPress={() => nextStepHandler()} >Next</SecondaryButton>
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
  },
  txtSty: {
    fontWeight: '800',
    color: palette.txtWhite,
    paddingHorizontal: 15,
  },
  btnView: {
    width: '100%', marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }




});


