import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import LocationIcon from '../../asset/svg/call.svg';
import { UserContext } from "../../context/user/UserContext";
import HomeScreen from "../../screen/home/HomeScreen";
import { palette } from "../../theme/themes";




const Tab = createBottomTabNavigator();



export const RenderTabNavigation = () => {
    //  const userContext = React.useContext(UserContext);



    const CustomTabBarButton = ({ children, onPress }) => (
        <TouchableOpacity
            style={{ top: - 12, justifyContent: 'center', alignItems: 'center' }}
            onPress={onPress}
        >
            <View style={{ width: 60, height: 60, backgroundColor: palette.primaryLight, borderRadius: 90, justifyContent: 'center', alignItems: 'center' }}>
                {children}
            </ View>
        </TouchableOpacity >
    )

    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={() => ({

                tabBarStyle: {
                    backgroundColor: palette.bgcard,
                    paddingBottom: 5, paddingTop: 5,
                    // borderTopRightRadius: 20,
                    // borderTopLeftRadius: 20,
                    // shadowColor: '#54336E24',
                    // boxShadow: "0px -4px 12px 0px #54336E24",
                    // shadowOpacity: 4,
                    height: 80,

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
                name={"HomeScreen"}
                component={HomeScreen}

                options={{
                    tabBarShowLabel: false,
                    // tabBarLabel: "Home",
                    tabBarLabelStyle: { fontWeight: "600", },
                    tabBarIcon: ({ color }) => (
                        color === palette.primaryDark ?
                            <LocationIcon width={40} height={40} /> :
                            <LocationIcon width={30} height={30} fill={palette.bgGray} />
                    ),

                }}
            />



            <Tab.Screen
                name={"HomeScreens"}
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
                            <LocationIcon width={40} height={40} stroke={"#000"} />
                        </CustomTabBarButton>
                    ),
                }}
            />


            <Tab.Screen
                name={"AccountScreen"}
                component={HomeScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarLabel: "abc",
                    tabBarLabelStyle: { fontWeight: "600", },
                    tabBarIcon: ({ color }) => (
                        color === palette.primaryDark ?
                            <LocationIcon width={40} height={40} /> :
                            <LocationIcon width={30} height={30} />
                    ),
                }}
            />


        </Tab.Navigator>
    );
};