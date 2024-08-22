import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, } from 'react-native-paper';
import { palette } from '../../theme/themes';
import PrimaryButton from '../../components/button/PrimaryButton';
import TextInputCust from '../../components/textInput/TextInput';
import { Auth, Hub } from 'aws-amplify';
import { handleCognitoError } from '../../constant/constFunction';
import { addCustomerPostApi } from '../../api/user/userApi';
import { UserContext } from '../../context/user/UserContext';

type Props = {};



const RegisterScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSentOTP, setIsSentOTP] = React.useState(false);

  const [otp, setOTP] = React.useState("");
  const [formData, setFormData] = React.useState({
    firstName: '',
    LastName: '',
    email: '',
    password: '',
    activationCode: '',
    lastSixDigit: '456523',
    firstFourDigit: ''
  });
  const [errors, setErrors] = React.useState("");


  React.useEffect(() => {
    setErrors("");
    setOTP("");
    setIsSentOTP(false);
  }, [formData]);

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
    console.log("val", val);

    val && signUpSubmit();
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
        activationCode: "6E32WDGX",
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
        const customerId = res?.data?.data?.customerId;
        console.log("++++++++++ customer added : ", customerId);
        await updateUser(res?.data?.data);
        await userContext.setUser(res?.data?.data);
        navigation.replace("HomeScreen");
      } else {
        navigation.replace("LoginScreen");
      }

    } catch (error) {
      setIsLoading(false);
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

            {isSentOTP ? <View style={{ gap: 4 }}>
              <Text variant="titleSmall"  >Enter OTP</Text>
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

          <View style={{ gap: 6 }}>
            <Text variant="labelMedium" style={{ color: 'red', height: 36 }}>{errors}</Text>

            {!isSentOTP ?
              <PrimaryButton buttonColor={palette.primaryDark} loading={isLoading} onPress={() => submitHandler()}>Send OTP</PrimaryButton> :
              <PrimaryButton buttonColor={palette.primaryDark} loading={isLoading} onPress={() => confirmSignUpHandler()}>Register</PrimaryButton>
            }
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


