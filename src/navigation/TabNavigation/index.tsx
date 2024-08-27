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



    const CustomTabBarButton = ({ onPress }) => (

        <View style={{ top: -2, backgroundColor: userContext?.customTheme?.bgCard, width: 105, height: 100, borderRadius: 90, alignItems: 'center', paddingTop: 14 }}>
            <TouchableOpacity>
                <Image
                    source={require('../../asset//bottomtab/middle-img.png')}
                    style={{ width: 58, height: 58 }}
                />
            </TouchableOpacity>
        </ View>
    )

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={() => ({
                tabBarStyle: {
                    backgroundColor: userContext?.customTheme?.bgCard,
                    marginTop: -16,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
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
                    //tabBarLabelStyle: { fontWeight: "600", },
                    // tabBarIcon: ({ color }) => (
                    //     color === palette.primaryDark ?
                    //         <LocationIcon width={40} height={40} /> :
                    //         <LocationIcon width={30} height={30} fill={palette.bgGray}/>
                    // ),
                    tabBarIcon: ({ focused }) => (
                        <CustomTabBarButton onPress={() => console.log()} />
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