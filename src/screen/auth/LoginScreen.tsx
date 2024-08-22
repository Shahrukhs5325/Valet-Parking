import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { palette } from '../../theme/themes';
import PrimaryButton from '../../components/button/PrimaryButton';
import TextInputCust from '../../components/textInput/TextInput';
import { Auth } from 'aws-amplify';
import { handleCognitoError } from '../../constant/constFunction';
import { getCustomerByIdApi } from '../../api/user/userApi';

type Props = {};



const LoginScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  // const userContext = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [emailId, setEmailId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState("");

  React.useEffect(() => {

  }, []);

  const validate = () => {
    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isEmailValid = EmailRegex.test(emailId);

    if (!emailId) {
      setErrors("Please enter email");
      return false;
    } else if (!isEmailValid) {
      setErrors("Please enter valid email");
      return false;
    } else if (password.length < 5) {
      setErrors("Password with 8 characters including 1 uppercase letter, 1 special character, and alphanumeric characters");
      return false;
    }

    return true;
  };

  const submitHandler = async () => {
    const val = validate()
    if (val) {
      try {
        setIsLoading(true);
        const user = await Auth.signIn(emailId?.toLowerCase(), password);
        if (user?.attributes) {
          console.log("***** cognito user *****", user?.attributes)
          const customerId = user?.attributes?.["custom:customerId"];
          getCustDetails(customerId);
          // setIsLoading(false);
        }
      } catch (error) {
        console.log('error signing in', error);
        const msg = handleCognitoError(error);
        setIsLoading(false);
        setErrors(msg);
      }
    }
    console.log("submit ", val);
    // val && navigation.replace("HomeScreen")
  }

  const getCustDetails = async (customerId: number | string) => {
    try {
      const user = await getCustomerByIdApi(customerId);
      if (user?.status === 200 && user?.data?.data) {
        console.log("***** Zaps user *****", user?.data?.data)

        // userContext.setUser(user?.data?.data);
        navigation.replace("HomeScreen")
      } else {
        setIsLoading(false);
        // await AsyncStorage.clear();
      }
    } catch (error) {
      setIsLoading(false);
      console.log("get customer details ", error)
      // showSnackbar(t("toast.somethingWrong"), 'error')
    }
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={palette.primaryLight}
        />
        <Text variant="titleLarge" style={styles.txtSty}>Login</Text>
        <View style={{ gap: 0 }}>
          <TextInputCust
            placeholder='Email'
            value={emailId}
            onChangeText={(text: any) => { setEmailId(text); setErrors("") }}
          />
          <TextInputCust
            placeholder='Password'
            value={password}
            onChangeText={(text: any) => { setPassword(text); setErrors("") }}
            secureTextEntry={false}
            right={<TextInputCust.Icon icon="eye" />}
          />
          <Text variant="labelMedium" style={{ marginVertical: 8, color: 'red', height: 36 }}>{errors}</Text>
        </View>
        <View style={{ gap: 30 }}>
          <PrimaryButton loading={isLoading} onPress={() => submitHandler()}>Sign In</PrimaryButton>
          <Text variant="labelLarge" style={{ textAlign: 'center' }}>Forgot password?</Text>
        </View>
        <View style={styles.containerRegister}>
          <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
            <Text variant="labelLarge" style={{ textAlign: 'center', color: palette.txtGray }}>Don’t have an account? <Text variant="labelLarge">Sign up</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //  alignItems: "center",
    margin: 15,
    gap: 15
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


