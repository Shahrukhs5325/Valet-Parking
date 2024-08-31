import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { palette } from '../../theme/themes';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';


type UserContextProviderType = {
    children?: React.ReactNode;
}

type UserType = {
    address: string;
    cityName: string;
    correlationId: number;
    countryId: number;
    customerId: number;
    customerName: string;
    email: string;
    employeeId: string;
    errorMsg: string;
    phoneNo: string;
    pinCode: string;
    stateId: number;
    statusId: number;
    statusName: number;
    userName: string;
    userTypeId: number;

}


type UserContextType = {
    user?: any;
    setUser?: any;
    location?: any;
    setLocation?: any;
    appLanguage?: any;
    setAppLanguage?: any;
    geoLocation?: any;
    seGeoLocation?: any;
    customTheme?: any;
    secCustomTheme?: any;
}

export const UserContext = React.createContext({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderType) => {

    const [user, setUser] = React.useState<UserType | null>(null);
    const [appLanguage, setAppLanguage] = React.useState<string | null>("en");
    const [geoLocation, seGeoLocation] = React.useState<string | null>(null);
    const [customTheme, secCustomTheme] = React.useState<any | null>(palette);


    React.useEffect(() => {
        getLangDataAsyncStorage();
        requestAuthorizationHandler();
    }, []);

    const getLangDataAsyncStorage = async () => {
        try {
            const lang = await AsyncStorage.getItem('language');
            setAppLanguage(lang ? lang : "en");
        } catch (e) {
            // read error
        }
    }


    const requestAuthorizationHandler = async () => {
        if (Platform.OS === 'ios') {
            getCurrentLocation();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Device current location permission',
                        message:
                            'Allow app to get your current location',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getCurrentLocation();
                } else {
                    console.log('Location permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    }

    const getCurrentLocation = () => {
        Geolocation.requestAuthorization();
        Geolocation.getCurrentPosition(
            (position) => {
                console.log("**** position: ",position);
                
                //   setLocation(position);
                seGeoLocation(position);
                // refetch();
            },
            (error) => {
                console.log("map error: ", error);
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: false, timeout: 1000000, maximumAge: 1000000 }
        );
    }


    return (
        <UserContext.Provider value={{ user, setUser, appLanguage, setAppLanguage, geoLocation, seGeoLocation, customTheme, secCustomTheme }}>
            {children}
        </UserContext.Provider>
    );
}
