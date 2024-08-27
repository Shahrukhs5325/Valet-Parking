import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { UserContext } from "../../context/user/UserContext";
import HomeScreen from "../../screen/home/HomeScreen";
import { palette } from "../../theme/themes";
import HomeInActiveIcon from '../../asset/bottomtab/home-gray.svg';
import HomeActiveIcon from '../../asset/bottomtab/home-white.svg';
import BagInActiveIcon from '../../asset/bottomtab/bag-gray.svg';
import BagActiveIcon from '../../asset/bottomtab/bag-white.svg';
import CardInActiveIcon from '../../asset/bottomtab/card-gray.svg';
import CardActiveIcon from '../../asset/bottomtab/card-white.svg';
import PinInActiveIcon from '../../asset/bottomtab/pin-gray.svg';
import PinActiveIcon from '../../asset/bottomtab/pin-white.svg';
import MiddleIcon from '../../asset/bottomtab/middle.svg';
import CommingSoonScreen from "../../screen/commingSoon/CommingSoonScreen";
import TransactionScreen from "../../screen/transaction/valetParking/TransactionScreen";




const Tab = createBottomTabNavigator();



export const RenderTabNavigation = () => {
    const userContext = React.useContext(UserContext);



    const CustomTabBarButton = ({ children, onPress }) => (
        // <View style={{ top: 20, backgroundColor: userContext?.customTheme?.bgCard, width: 160, height: 160, zIndex: -1, borderRadius: 360, alignItems: 'center', padding: 10 }}>
        <TouchableOpacity
            style={{ top: - 16, justifyContent: 'center', alignItems: 'center' }}
            onPress={onPress}
        >
            <View >
                {children}
            </ View>
        </TouchableOpacity >
        //  </ View>
    )

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={() => ({

                tabBarStyle: {
                    backgroundColor: userContext?.customTheme?.bgCard,
                    // paddingBottom: 5, 
                    // paddingTop: 5,
                    // borderTopRightRadius: 20,
                    // borderTopLeftRadius: 20,
                    // shadowColor: '#54336E24',
                    // boxShadow: "0px -4px 12px 0px #54336E24",
                    // shadowOpacity: 4,
                    height: 64,

                    shadowColor: "#000000",
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 5.62,
                    elevation: 7
                },
                headerShown: false,
                tabBarActiveTintColor: palette.primaryDark,
                tabBarInactiveTintColor: palette.bgGray,

            })}


        >
            <Tab.Screen
                name={"Home"}
                component={HomeScreen}

                options={{
                    tabBarShowLabel: false,
                    // tabBarLabel: "Home",
                    tabBarLabelStyle: { fontWeight: "600", },
                    tabBarIcon: ({ color }) => (
                        color === palette.primaryDark ?
                            <HomeActiveIcon width={120} height={120} /> :
                            <HomeInActiveIcon width={120} height={120} fill={palette.bgGray} />
                    ),
                }}
            />
            <Tab.Screen
                name={"TransactionScreen"}
                component={TransactionScreen}

                options={{
                    tabBarShowLabel: false,
                    // tabBarLabel: "Home",
                    tabBarLabelStyle: { fontWeight: "600", },
                    tabBarIcon: ({ color }) => (
                        color === palette.primaryDark ?
                            <BagActiveIcon width={30} height={30} /> :
                            <BagInActiveIcon width={30} height={30} fill={palette.bgGray} />
                    ),

                }}
            />



            <Tab.Screen
                name={"HomeScreenss"}
                component={HomeScreen}

                options={{
                    tabBarShowLabel: false,
                    // tabBarLabel: "Home",
                    tabBarLabelStyle: { fontWeight: "600", },
                    // tabBarIcon: ({ color }) => (
                    //     color === palette.primaryDark ?
                    //         <LocationIcon width={40} height={40} /> :
                    //         <LocationIcon width={30} height={30} fill={palette.bgGray}/>
                    // ),
                    tabBarIcon: ({ focused }) => (
                        <CustomTabBarButton onPress={() => console.log()}>
                            {/* <MiddleIcon width={60} height={60} stroke={"#000"} /> */}
                            <Image source={require('../../asset//bottomtab/middle-img.png')}
                                style={{ width: 60, height: 60 }} />
                        </CustomTabBarButton>
                    ),
                }}
            />


            <Tab.Screen
                name={"CommingSoonScreenb"}
                component={CommingSoonScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarLabel: "abc",
                    tabBarLabelStyle: { fontWeight: "600", },
                    tabBarIcon: ({ color }) => (
                        color === palette.primaryDark ?
                            <CardActiveIcon width={30} height={30} /> :
                            <CardInActiveIcon width={30} height={30} />
                    ),
                }}
            />

            <Tab.Screen
                name={"CommingSoonScreena"}
                component={CommingSoonScreen}

                options={{
                    tabBarShowLabel: false,
                    // tabBarLabel: "Home",
                    tabBarLabelStyle: { fontWeight: "600", },
                    tabBarIcon: ({ color }) => (
                        color === palette.primaryDark ?
                            <PinActiveIcon width={30} height={30} /> :
                            <PinInActiveIcon width={30} height={30} fill={palette.bgGray} />
                    ),

                }}
            />


        </Tab.Navigator>
    );
};