import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import CallIcon from '../../asset/svg/call-white.svg';
import Header from '../../components/header/Header';
import { utcDateConvoter } from '../../constant/constFunction';
import { UserContext } from '../../context/user/UserContext';
import { palette } from '../../theme/themes';
import moment from 'moment';
import TextInputCust from '../../components/textInput/TextInput';
import SecondaryButton from '../../components/button/SecondaryButton';
import PrimaryButton from '../../components/button/PrimaryButton';

type Props = {};



const AirportTransferScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  // const { city } = route.params;
  const coupon = ""
  const userContext = React.useContext(UserContext);

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

            <View style={{ gap: 0, margin: 20, }}>
              <TextInputCust
                placeholder='Select Airport'
                value={formData.firstName}
                onChangeText={value => {
                  setFormData({ ...formData, firstName: value });
                  setErrors("");
                }}
              />
              <TextInputCust
                placeholder='Type of Travel'
                value={formData.LastName}
                onChangeText={value => {
                  setFormData({ ...formData, LastName: value });
                  setErrors("");
                }}
              />
              <TextInputCust
                placeholder='Service Area'
                value={formData.LastName}
                onChangeText={value => {
                  setFormData({ ...formData, LastName: value });
                  setErrors("");
                }}
              />
              <TextInputCust
                placeholder='Pickup/Dropoff Location'
                value={formData.LastName}
                onChangeText={value => {
                  setFormData({ ...formData, LastName: value });
                  setErrors("");
                }}
              />
              <TextInputCust
                placeholder='Pickup Date & Time'
                value={formData.LastName}
                onChangeText={value => {
                  setFormData({ ...formData, LastName: value });
                  setErrors("");
                }}
              />
              <TextInputCust
                placeholder='Select Vehicle Type'
                value={formData.LastName}
                onChangeText={value => {
                  setFormData({ ...formData, LastName: value });
                  setErrors("");
                }}
              />
              <TextInputCust
                placeholder='Special Requests'
                value={formData.LastName}
                onChangeText={value => {
                  setFormData({ ...formData, LastName: value });
                  setErrors("");
                }}
              />
            </View>

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


