import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import ZapsIcon from '../../assets/svg/logo.svg';
import { palette } from '../../theme/themes';
import { Auth } from 'aws-amplify';
import { getCustomerByIdApi } from '../../api/user/userApi';
import { UserContext } from '../../context/user/UserContext';
import { getClientTheme } from '../../api/common/commonApi';

type Props = {};



const SplashScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);



  const [isLoginIn, setIsLoginIn] = React.useState(false);
  const [isNewVersion, setIsNewVersion] = React.useState(false);


  React.useEffect(() => {
    timerFunction();
  }, []);


  const timerFunction = () => {
    const timerId = setTimeout(() => {
      checkCustomerLogin();
    }, 2000);

    return () => clearTimeout(timerId);
  }



  const checkCustomerLogin = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user && user?.username) {
        const customerId = user?.attributes?.["custom:customerId"];
        console.log('****** autoSignIn ', customerId);

        getCustDetails(customerId);
      }
    } catch (error) {
      console.log('Error: ' + JSON.stringify(error));
      navigation.replace("LoginScreen");
      // timerFunction();
    }
  };

  const getCustDetails = async (customerId: number | string) => {
    try {
      const user = await getCustomerByIdApi(customerId);
      if (user?.status === 200 && user?.data?.data) {
        await userContext.setUser(user?.data?.data);
        await getClientThemeApi(user?.data?.data?.correlationId);

        setIsLoginIn(true);
        await navigation.replace("HomeScreen");
        console.log("***** Zaps user *****", user?.data?.data)
      } else {
        await navigation.replace("LoginScreen");
      }
    } catch (error) {
      console.log("getCustomerByIdApi err: ", error);
      navigation.replace("LoginScreen");

    }
  }

  const getClientThemeApi = async (id: number | string) => {
    try {
      const res = await getClientTheme(id);
      if (res?.data?.data) {
        const theme = res?.data?.data?.customTheme
        console.log("\n**** Custom Theme Color **** ", theme);

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
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={palette.primaryDark}
        />
        <ZapsIcon width={100} />
      </View>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.primaryDark
  },

});


