import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, } from 'react-native-paper';
import { palette } from '../../theme/themes';
import PrimaryButton from '../../components/button/PrimaryButton';
import TextInputCust from '../../components/textInput/TextInput';

type Props = {};



const RegisterScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  // const userContext = React.useContext(UserContext);
  const [otp, setOTP] = React.useState("");
  const [formData, setFormData] = React.useState({
    firstName: '',
    LastName: '',
    email: '',
    password: '',
    activationCode: '',
    lastSixDigit: '',
    firstFourDigit: ''
  });
  const [errors, setErrors] = React.useState("");


  React.useEffect(() => {
  }, []);

  const validate = () => {
    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isEmailValid = EmailRegex.test(formData.email);

    if (!formData?.firstName) {
      setErrors("Please enter first name");
      return false;
    } else if (!formData?.LastName) {
      setErrors("Please enter last name");
      return false;
    } else if (!formData?.email) {
      setErrors("Please enter email");
      return false;
    } else if (!isEmailValid) {
      setErrors("Please enter valid email");
      return false;
    } else if (formData.password.length < 5) {
      setErrors("Password with 8 characters including 1 uppercase letter, 1 special character, and alphanumeric characters");
      return false; errors
    } else if (!formData?.activationCode) {
      setErrors("Please enter activation code");
      return false;
    } else if (!formData?.lastSixDigit) {
      setErrors("Please enter last 6 digit number");
      return false;
    } else if (!formData?.firstFourDigit) {
      setErrors("Please enter first 4 digit number");
      return false;
    }

    return true;
  };

  const submitHandler = () => {
    const val = validate()
    console.log("submit ", val);
    !val && navigation.replace("HomeScreen")
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar
            animated={true}
            backgroundColor={palette.bgGray}
          />

          <Text variant="titleLarge" style={styles.txtSty}>Register</Text>
          <View style={{ gap: 0 }}>
            <TextInputCust
              placeholder='First Name'
              value={formData.firstName}
              onChangeText={value => {
                setFormData({ ...formData, firstName: value });
                setErrors("");
              }}
            />
            <TextInputCust
              placeholder='Last name'
              value={formData.LastName}
              onChangeText={value => {
                setFormData({ ...formData, LastName: value });
                setErrors("");
              }}
            />
            <TextInputCust
              placeholder='Email'
              value={formData.email}
              onChangeText={value => {
                setFormData({ ...formData, email: value });
                setErrors("");
              }}
            />
            <TextInputCust
              placeholder='Password'
              value={formData.password}
              onChangeText={value => {
                setFormData({ ...formData, password: value });
                setErrors("");
              }}
              secureTextEntry={false}
              right={<TextInputCust.Icon icon="eye" />}
            />
            <TextInputCust
              placeholder='Activation code'
              value={formData.activationCode}
              onChangeText={value => {
                setFormData({ ...formData, activationCode: value });
                setErrors("");
              }}
            />
            <TextInputCust
              placeholder='OTP'
              value={otp}
              keyboardType={"numeric"}
              onChangeText={value => {
                setOTP(value);
                setErrors("");
              }}
            />
          </View>
          <View style={{ gap: 8, marginTop: 10 }}>
            <Text variant="titleMedium" style={{ letterSpacing: 3, textTransform: 'uppercase' }} >Credit card details</Text>

            <View style={{ gap: 4 }}>
              <Text variant="titleSmall"  >Enter last 6 digits</Text>
              <TextInputCust
                placeholder='x x x x x x'
                value={formData.lastSixDigit}
                onChangeText={value => {
                  setFormData({ ...formData, lastSixDigit: value });
                  setErrors("");
                }}
              />
            </View>
            <View style={{ gap: 4 }}>
              <Text variant="titleSmall"  >Enter first 4 digits</Text>
              <TextInputCust
                placeholder='x x x x'
                value={formData.firstFourDigit}
                onChangeText={value => {
                  setFormData({ ...formData, firstFourDigit: value });
                  setErrors("");
                }}
              />
            </View>

          </View>

          <View style={{ gap: 6 }}>
            <Text variant="labelMedium" style={{ color: 'red', height: 36 }}>{errors}</Text>

            <PrimaryButton onPress={() => submitHandler()}>Register</PrimaryButton>
          </View>
          <View style={styles.containerRegister}>
            <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
              <Text variant="labelLarge" style={{ textAlign: 'center', color: palette.txtGray }}>Already have an account? <Text variant="labelLarge">Sign in</Text></Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //  alignItems: "center",
    margin: 15,
    gap: 15,
    paddingBottom: 24
  },
  txtSty: {
    fontWeight: '800'
  },
  containerRegister: {
    position: 'absolute',
    bottom: 0,
    // alignItems: "center",
    // textAlign: 'center',

  }

});


