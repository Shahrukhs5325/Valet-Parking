import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Checkbox, Snackbar, Text, } from 'react-native-paper';
import { palette } from '../../theme/themes';
import PrimaryButton from '../../components/button/PrimaryButton';
import TextInputCust from '../../components/textInput/TextInput';
import { Auth, Hub } from 'aws-amplify';
import { handleCognitoError } from '../../constant/constFunction';
import { addCustomerPostApi } from '../../api/user/userApi';
import { UserContext } from '../../context/user/UserContext';
import { getActivationCodeDetails, getClientTheme } from '../../api/common/commonApi';
import { FONT } from '../../theme/fonts';

type Props = {};

export const PasswordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{8,}$)';


const RegisterScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSentOTP, setIsSentOTP] = React.useState(false);
  const [isNameAsPer, setIsNameAsPer] = React.useState(false);
  const [isTerm, setIsTerm] = React.useState(false);

  const [visible, setVisible] = React.useState(false);

  const [otp, setOTP] = React.useState("");
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


  React.useEffect(() => {
    setErrors("");
    setOTP("");
    setIsSentOTP(false);
  }, [formData]);

  // React.useEffect(() => {
  //   isNameAsPer && setFormData({ ...formData, creditCardName: formData.firstName + " " + formData.LastName });
  //   !isNameAsPer && setFormData({ ...formData, creditCardName: "" });
  //   setErrors("");
  // }, [isNameAsPer]);

  const validate = () => {
    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = new RegExp(PasswordRegex);

    const isPassValid = passRegex.test(formData.password);

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
    } else if (!formData.password || !isPassValid) {
      setErrors("Password with 8 characters including 1 uppercase letter, 1 special character, and alphanumeric characters");
      return false;
    } else if (!formData?.activationCode) {
      setErrors("Please enter activation code");
      return false;
    } else if (!formData?.creditCardName) {
      setErrors("Please enter card holder name");
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

  const onDismissSnackBar = () => setVisible(false);

  const submitHandler = () => {
    const val = validate()
    val && getStatusHandler();
    // val && signUpSubmit();
  }

  const getStatusHandler = async () => {
    try {
      const res = await getActivationCodeDetails(formData.activationCode);

      if (res?.status === 200 && res?.data?.data) {
        if (res?.data?.data?.redeemed) {
          setErrors("Activation code used");
        } else {
          signUpSubmit();
        }
      } else {
        setErrors("Enter valid activation code");
      }
    } catch (err) {
      setErrors("Enter valid activation code");
      console.log('error fetchCountries : ', err);
    }
  }


  const signUpSubmit = async () => {

    try {
      setIsLoading(true);
      const { user } = await Auth.signUp({
        username: formData.email,
        password: formData.password,
        attributes: {
          email: formData.email,
          name: formData?.firstName + " " + formData?.LastName,
          //  phone_number: formData.phoneNumber,
          "custom:clientId": "1",
          "custom:customerId": "0",
          "custom:employeeId": "0",
        },
        autoSignIn: { enabled: true },
      });
      if (user) {
        console.log("------------ user sent otp---------------------", JSON.stringify(user));

        setIsSentOTP(true);
        // showSnackbar(t("toast.codeSentSuccessfully"), 'success')
      }
      setIsLoading(false);
    } catch (error) {
      console.log('error signing up:', error);
      const msg = handleCognitoError(error)
      setIsLoading(false);
      setErrors(msg);
    }
  }

  const confirmSignUpHandler = async () => {
    try {
      setIsLoading(true);
      const user = await Auth.confirmSignUp(formData?.email, otp, {
        forceAliasCreation: false,
      });
      if (user === "SUCCESS") {
        listenToAutoSignInEvent();
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log('error confirming sign up', error);
      const msg = handleCognitoError(error)
      setIsLoading(false);
      setErrors(msg);
      //  showSnackbar(msg, 'error')
    }
  }

  const listenToAutoSignInEvent = () => {
    Hub.listen('auth', ({ payload }) => {
      const { event } = payload;
      if (event === 'autoSignIn') {
        const user = payload.data;
        console.log('****** autoSignIn ', JSON.stringify(user));
        addCustomer(user);

      } else if (event === 'autoSignIn_failure') {
        // redirect to sign in page
        navigation.replace("LoginScreen");
      }
    })
  }

  const addCustomer = async (user: any) => {
    try {
      setIsLoading(true);
      const payload = {
        customerId: 0,
        customerName: formData?.firstName + " " + formData?.LastName,
        employeeId: "",
        email: formData?.email?.toLowerCase(),
        phoneNo: "919999999999",
        statusId: 1,
        correlationId: "1",
        countryId: "155",
        stateId: 1,
        cityName: "",
        pinCode: "",
        address: "",
        statusName: 0,
        userTypeId: 4,
        errorMsg: "",
        userName: user?.username,
        binNumber: formData?.lastSixDigit,
        activationCode: formData?.activationCode,
        newCustomer: true,
        deleteRequest: false,
        deletionDateTime: 0,
        distributionId: 0,
        cognitoUserName: "",
        corporateCustomer: false,
        employee: {
          "empId": 0,
          "employeeEmail": "",
          "employeeId": "",
          "statusName": ""
        },
      }

      const res = await addCustomerPostApi(payload);

      if (res?.data) {
        const customer = res?.data?.data;
        console.log("++++++++++ customer added : ", customer?.customerId);
        await updateUser(customer);
        await userContext.setUser(customer);
        await getClientThemeApi(customer?.correlationId)
        navigation.replace("HomeScreen");
      } else {
        navigation.replace("LoginScreen");
      }

    } catch (error) {
      setIsLoading(false);
      setErrors("something went wrong");

      console.log("error customer ", error.response.data)
    }
  }

  // Update cognito customerId
  const updateUser = async (data: any) => {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      "custom:customerId": data?.customerId?.toString(),
    });
  }

  const getClientThemeApi = async (id: number | string) => {
    try {

      const res = await getClientTheme(id);
      if (res?.data?.data) {
        const theme = res?.data?.data?.customTheme
        console.log("/n**** Custom Theme Color **** ", theme);
        await userContext.secCustomTheme(palette);
      } else {
        console.log("\n**** Default Theme ****\n");
        await userContext.secCustomTheme(palette);
      }

    } catch (error) {
      await userContext.secCustomTheme(palette);
      console.log("\n**** Default Theme ****\n");
      console.log("getCustomerByIdApi err: ", error);
    }
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <StatusBar
            animated={true}
            backgroundColor={palette.primaryDark}
          />

          <Text style={styles.txtSty}>SIGN UP</Text>
          <View style={{ gap: 0 }}>
            <TextInputCust
              placeholder='First name'
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

          </View>
          <View style={{ gap: 8, marginTop: 10 }}>
            <Text style={styles.txtCreditCardTitle} >Credit card details</Text>

            {/* <View>
              <Checkbox.Item label="Card name as per user"
                // disabled={!formData.firstName && !formData.LastName}
                status={isNameAsPer ? "checked" : "unchecked"}
                onPress={() => setIsNameAsPer(!isNameAsPer)}
                color={palette.txtWhite}
                uncheckedColor={palette.txtWhite}
                labelStyle={styles.txtTextTitle}
                style={{ marginLeft: -15, marginVertical: -2, }}
              />
            </View> */}
            <View style={{ gap: 4 }}>
              <Text style={styles.txtTextTitle} >Enter card holder name</Text>
              <TextInputCust
                placeholder='Card holder name'
                value={formData.creditCardName}
                onChangeText={value => {
                  setFormData({ ...formData, creditCardName: value });
                  setErrors("");
                }}
              />
            </View>
            <View style={{ gap: 4 }}>
              <Text style={styles.txtTextTitle} >Enter first 6 digits</Text>
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
              <Text style={styles.txtTextTitle} >Enter last 4 digits</Text>
              <TextInputCust
                placeholder='x x x x'
                value={formData.firstFourDigit}
                onChangeText={value => {
                  setFormData({ ...formData, firstFourDigit: value });
                  setErrors("");
                }}
              />
            </View>

            {isSentOTP ? <View style={{ gap: 4 }}>
              <Text style={styles.txtTextTitle} >Enter OTP</Text>
              <TextInputCust
                placeholder='OTP'
                value={otp}
                keyboardType={"numeric"}
                onChangeText={value => {
                  setOTP(value);
                  setErrors("");
                }}
              />
            </View> : null}

          </View>

          <View style={{ gap: 8 }}>
            <Text style={{ color: 'red', fontSize: 13 }}>{errors}</Text>

            {!isSentOTP ? <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
              <Checkbox.Item
                status={isTerm ? "checked" : "unchecked"}
                onPress={() => setIsTerm(!isTerm)}
                uncheckedColor={palette.txtWhite}
                labelStyle={styles.txtTextTitle}
              />
              <View style={{ marginBottom: 10, }}>
                <Text style={styles.txtTerm} >I accept the Terms & Conditions</Text>
                <Text style={[styles.txtTerm, { textDecorationLine: 'underline' }]}>Privacy Policy</Text>
              </View>
            </View> : null}

            {!isSentOTP ?
              <PrimaryButton disabled={!isTerm || isLoading} loading={isLoading} onPress={() => submitHandler()}>Send OTP</PrimaryButton> :
              <PrimaryButton disabled={isLoading} loading={isLoading} onPress={() => confirmSignUpHandler()}>Register</PrimaryButton>
            }
          </View>

          <View style={styles.containerRegister}>
            <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
              <Text style={styles.txtSingIn}>Already have an account? Sign in</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
        {errors}
      </Snackbar>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
    gap: 15,
    paddingBottom: 24
  },
  txtSty: {
    color: palette.txtWhite,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 24,
    fontWeight: '400'
  },
  txtCreditCardTitle: {
    letterSpacing: 3,
    color: palette.txtWhite,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 16,
    fontWeight: '400'
  },
  txtTextTitle: {
    fontFamily: FONT.Able.regular,
    color: palette.txtWhite,
    fontSize: 16,
    fontWeight: '400'
  },
  containerRegister: {
    alignSelf: "center",
  },
  txtTerm: {
    fontFamily: FONT.Able.regular,
    color: palette.txtWhite,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  txtSingIn: {
    textAlign: 'center',
    fontFamily: FONT.Able.regular,
    fontSize: 14,
    fontWeight: '400',
    color: palette.txtWhite,
  }

});


