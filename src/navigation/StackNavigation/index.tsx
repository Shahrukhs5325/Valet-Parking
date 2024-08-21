import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { Hub } from 'aws-amplify';
import React, { useEffect } from "react";
import SplashScreen from "../../screen/splashScreen/SplashScreen";


const Stack = createStackNavigator();

const Navigation = () => {

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFF'
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


      </Stack.Navigator>
    </NavigationContainer >
  );
};


export default Navigation;
