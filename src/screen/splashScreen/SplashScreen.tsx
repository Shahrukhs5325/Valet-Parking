import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ZapsIcon from '../../asset/svg/logo.svg'
import { palette } from '../../theme/themes';

type Props = {};



const SplashScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  // const userContext = React.useContext(UserContext);



  const [isLoginIn, setIsLoginIn] = React.useState(false);
  const [isNewVersion, setIsNewVersion] = React.useState(false);


  React.useEffect(() => {

  }, []);





  // const checkCustomerLogin = async () => {
  //   try {
  //     const user = await Auth.currentAuthenticatedUser();
  //     if (user && user?.username) {
  //       const customerId = user?.attributes?.["custom:customerId"];
  //       getCustDetails(customerId);
  //     }
  //   } catch (error) {
  //     console.log('Error: ' + JSON.stringify(error));

  //   }
  // };

  // const getCustDetails = async (customerId: number | string) => {
  //   try {
  //     const user = await getCustomerByIdApi(customerId);
  //     if (user?.status === 200 && user?.data?.data) {

  //       setIsLoginIn(true);
  //       await storeDataAsyncStorage(user?.data?.data);
  //       navigation.replace("MarketPlace");
  //       console.log("***** Zaps user *****", user?.data?.data)
  //     } else {
  //       navigation.replace("CheckUserScreen");
  //     }
  //   } catch (error) {
  //     console.log("get customer details ", error);
  //     navigation.replace("CheckUserScreen");

  //   }
  // }

  const storeDataAsyncStorage = async (user: any) => {
    // store user data in AsyncStorage
    try {
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem('userData', jsonValue);
    } catch (error) {
      console.log("user data store ", error);
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


