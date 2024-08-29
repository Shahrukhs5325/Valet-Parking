import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";
import { UserContext } from "../../context/user/UserContext";
import HomeScreen from "../../screen/home/HomeScreen";
import CommingSoonScreen from "../../screen/commingSoon/CommingSoonScreen";
import TransactionScreen from "../../screen/transaction/valetParking/TransactionScreen";
import HomeActiveIcon from '../../assets/bottomtab/home-white.svg';
import HomeInActiveIcon from '../../assets/bottomtab/home-gray.svg';
import BagInActiveIcon from '../../assets/bottomtab/bag-gray.svg';
import BagActiveIcon from '../../assets/bottomtab/bag-white.svg';
import CardInActiveIcon from '../../assets/bottomtab/card-gray.svg';
import CardActiveIcon from '../../assets/bottomtab/card-white.svg';
import PinInActiveIcon from '../../assets/bottomtab/pin-gray.svg';
import PinActiveIcon from '../../assets/bottomtab/pin-white.svg';
import { palette } from "../../theme/themes";
import { FONT } from "../../theme/fonts";
const Tab = createBottomTabNavigator();
export const RenderTabNavigation = () => {
    const userContext = React.useContext(UserContext);

    const CustomTabBarButton = ({ onPress }) => (
        <TouchableOpacity onPress={onPress} style={styles.middleButtonContainer}>
            <Image
                source={require('../../assets/bottomtab/middle-img.png')}
                style={styles.middleButtonImage}
            />
        </TouchableOpacity>
    );

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    paddingHorizontal: 14,
                    backgroundColor: userContext?.customTheme?.bgCard,
                    borderColor: userContext?.customTheme?.bgCard,
                    marginTop: -20,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    height: 74,
                    shadowColor: "#FFF",
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 5.62,
                    elevation: 7,
                },
                headerShown: false,
                tabBarShowLabel: true,
                tabBarLabelStyle: styles.lableSty,
                tabBarIcon: ({ focused }) => {
                    let IconComponent;

                    if (route.name === "Home") {
                        IconComponent = focused ?
                            <View style={styles.activeIconContainer}>
                                <Image
                                    source={require('../../assets/bottomtab/middle-img.png')}
                                    style={styles.middleButtonImage}
                                />
                            </View>
                            : <HomeInActiveIcon width={100} height={100} />;
                    } else if (route.name === "Privileges") {
                        IconComponent = focused ?
                            <View style={styles.activeIconContainer}>
                                <Image
                                    source={require('../../assets/bottomtab/middle-img.png')}
                                    style={styles.middleButtonImage}
                                />
                            </View>
                            : <BagInActiveIcon width={30} height={30} />;

                    } else if (route.name === "History") {
                        IconComponent = focused ?
                            <View style={styles.activeIconContainer}>
                                <Image
                                    source={require('../../assets/bottomtab/middle-img.png')}
                                    style={styles.middleButtonImage}
                                />
                            </View>
                            : <CardInActiveIcon width={30} height={30} />;
                    } else if (route.name === "Profile") {
                        IconComponent = focused ?
                            <View style={styles.activeIconContainer}>
                                <Image
                                    source={require('../../assets/bottomtab/middle-img.png')}
                                    style={styles.middleButtonImage}
                                />
                            </View>
                            : <PinInActiveIcon width={30} height={30} />;
                    }

                    return IconComponent;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Privileges" component={CommingSoonScreen} />
            <Tab.Screen name="History" component={TransactionScreen} />
            <Tab.Screen name="Profile" component={CommingSoonScreen} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    activeIconContainer: {
        backgroundColor: '#5C8374', // Gold color
        width: 74,
        height: 70,
        borderRadius: 90,
        alignItems: 'center',
        justifyContent: 'center',
        top: -5, // This will lift the active icon above others
        shadowColor: '#5C8374',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    middleButtonContainer: {
        top: -2,
        width: 105,
        height: 100,
        borderRadius: 90,
        alignItems: 'center',
        paddingTop: 14,
    },
    middleButtonImage: {
        width: 48,
        height: 48,
    },
    lableSty: {
        fontFamily: FONT.Able.regular,
        color: palette.txtWhite,
        fontSize: 14,
        fontWeight: '400'
    }
});