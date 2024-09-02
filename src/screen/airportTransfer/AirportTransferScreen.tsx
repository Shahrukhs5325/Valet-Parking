import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
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
import { FONT } from '../../theme/fonts';
import HeaderTitle from '../../components/header/HeaderTitle';

type Props = {
  route: any;
};

const STEPPER_LABEL = ["Service Details", "Passenger Details", "Confirmation"];
const WIDTH = Dimensions.get('window').width;


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


  const nextStepHandler = (position: number) => {
    setCurrentPosition(position);
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={userContext?.customTheme?.primaryDark}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: 16, gap: 16 }}>

            <HeaderTitle title={'aIRPORT services'} />
            <View style={{ paddingHorizontal: 16, gap: 26, alignItems: 'center' }}>
              <View>
                <Text style={styles.txtHeadingSty}>BOTH</Text>
              </View>

              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <Text style={[styles.txtheadSty, { width: '40%' }]}>
                  TOTAL PACKAGES
                </Text>
                <View style={styles.viewDataCall}>
                  <Text style={styles.txtheadSty}>100</Text>
                </View>
              </View>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <Text style={[styles.txtheadSty, { width: '40%' }]}>
                  SELECT QUANTITY
                </Text>
                <View style={styles.viewDataCall}>
                  <Text style={styles.txtheadSty}>100</Text>
                </View>
              </View>
            </View>
            <View
              style={[styles.compView, { backgroundColor: userContext?.customTheme?.primaryDark }]}
            >
              {currentPosition === 0 ?
                (<Text style={styles.txtSty}>Enter Your TRAVEL Details</Text>)
                : currentPosition === 1 ?
                  (<Text style={styles.txtSty}>Enter Your TRAVEL Details</Text>)
                  :
                  (<Text style={styles.txtSty}>Enter Your TRAVEL Details</Text>)
              }
            </View>
          </View>

          <View style={{ paddingBottom: 30, margin: 16, gap: 16 }}>
            <View style={{ backgroundColor: palette.bgGray, paddingBottom: 16, borderRadius: 5 }}>
              <Stepper
                labels={STEPPER_LABEL}
                currentPosition={currentPosition}
                setCurrentPosition={setCurrentPosition}
                onPress={nextStepHandler}
              />
            </View>

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
                  setCurrentPosition={setCurrentPosition}

                />)
            }


            <View style={styles.btnView}>

              {currentPosition !== 2 ?
                <>
                  <View style={{ width: '40%' }}>
                    <PrimaryButton disabled={currentPosition <= 0} onPress={() => setCurrentPosition(currentPosition - 1)} buttonColor={"light"} >Back</PrimaryButton>
                  </View>
                  <View style={{ width: '40%' }}>
                    <SecondaryButton onPress={() => nextStepHandler(currentPosition + 1)} >Next</SecondaryButton>
                  </View>
                </> :
                <View style={{ width: '100%', paddingHorizontal: 15 }}>
                  <PrimaryButton onPress={() => navigation.navigate("SucessAirportScreen")}>Redeem</PrimaryButton>
                </View>}
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
    marginTop: 20,
    paddingHorizontal: 15,
    gap: 10,
  },
  txtSty: {
    fontWeight: '400',
    color: palette.txtWhite,
    paddingHorizontal: 15,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 24,
  },
  btnView: {
    width: '100%',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  txtHeadingSty: {
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 20,
    fontWeight: '400',
    color: palette.txtWhite,
    textAlign: 'center',
    paddingVertical: 6,
    backgroundColor: palette.bgCard,
    borderWidth: 1,
    borderColor: palette.txtGray,
    borderRadius: 5,
    width: WIDTH - 120,
    alignSelf: 'center',
  },
  viewDataCall: {
    width: WIDTH / 4,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: palette.bgCard,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.txtGray,
  },
  txtheadSty: {
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 16,
  },




});


