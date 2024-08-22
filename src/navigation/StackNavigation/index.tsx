import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { Hub } from 'aws-amplify';
import React, { useEffect } from "react";
import SplashScreen from "../../screen/splashScreen/SplashScreen";
import LoginScreen from "../../screen/auth/LoginScreen";
import RegisterScreen from "../../screen/auth/RegisterScreen";
import { palette } from "../../theme/themes";
import HomeScreen from "../../screen/home/HomeScreen";
import ValetScreen from "../../screen/valet/ValetScreen";
import ValetServicesScreen from "../../screen/valet/ValetServicesScreen";
import ValetDetailsScreen from "../../screen/valet/ValetDetailsScreen";


const Stack = createStackNavigator();

const Navigation = () => {

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: palette.bgGray
    },
  };


  useEffect(() => {
    // listenToAutoSignInEvent();
  }, []);


  // function listenToAutoSignInEvent() {
  //   Hub.listen('auth', ({ payload }) => {
  //     const { event } = payload;
  //     if (event === 'autoSignIn') {
  //       const user = payload.data;
  //       console.log("user ", user);

  //       // assign user
  //     } else if (event === 'autoSignIn_failure') {
  //       // redirect to sign in page
  //       console.log("user ", event);

  //     }
  //   })
  // }


  return (
    <NavigationContainer theme={MyTheme} >
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen
          name={"SplashScreen"}
          component={SplashScreen}
        />
        <Stack.Screen
          name={"LoginScreen"}
          component={LoginScreen}
        />
        <Stack.Screen
          name={"RegisterScreen"}
          component={RegisterScreen}
        />
         <Stack.Screen
          name={"HomeScreen"}
          component={HomeScreen}
        />
        <Stack.Screen
          name={"ValetScreen"}
          component={ValetScreen}
        />
         <Stack.Screen
          name={"ValetServicesScreen"}
          component={ValetServicesScreen}
        />
         <Stack.Screen
          name={"ValetDetailsScreen"}
          component={ValetDetailsScreen}
        />


      </Stack.Navigator>
    </NavigationContainer >
  );
};


export default Navigation;
