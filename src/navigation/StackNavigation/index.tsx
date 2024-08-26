import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SplashScreen from "../../screen/splashScreen/SplashScreen";
import LoginScreen from "../../screen/auth/LoginScreen";
import RegisterScreen from "../../screen/auth/RegisterScreen";
import ServiceScreen from "../../screen/service/ServiceScreen";
import ValetServicesScreen from "../../screen/valet/ValetServicesScreen";
import ValetDetailsScreen from "../../screen/valet/ValetDetailsScreen";
import RedeemScreen from "../../screen/valet/RedeemScreen";
import SucessScreen from "../../screen/valet/SucessScreen";
import { RenderTabNavigation } from "../TabNavigation";
import TransactionDetailsScreen from "../../screen/transaction/TransactionDetailsScreen";
import { UserContext } from "../../context/user/UserContext";
import AirportTransferScreen from "../../screen/airportTransfer/AirportTransferScreen";


const Stack = createStackNavigator();

const Navigation = () => {
  const userContext = React.useContext(UserContext);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: userContext?.customTheme?.bgGray
    },
  };



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
          component={RenderTabNavigation}
        />
        {/* <Stack.Screen
          name={"HomeScreen"}
          component={HomeScreen}
        /> */}
        <Stack.Screen
          name={"ServiceScreen"}
          component={ServiceScreen}
        />
        <Stack.Screen
          name={"ValetServicesScreen"}
          component={ValetServicesScreen}
        />
        <Stack.Screen
          name={"ValetDetailsScreen"}
          component={ValetDetailsScreen}
        />
        <Stack.Screen
          name={"RedeemScreen"}
          component={RedeemScreen}
        />
        <Stack.Screen
          name={"SucessScreen"}
          component={SucessScreen}
        />
        <Stack.Screen
          name={"TransactionDetailsScreen"}
          component={TransactionDetailsScreen}
        />
        <Stack.Screen
          name={"AirportTransferScreen"}
          component={AirportTransferScreen}
        />


      </Stack.Navigator>
    </NavigationContainer >
  );
};


export default Navigation;
