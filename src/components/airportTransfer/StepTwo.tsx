import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, Dimensions, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { getAllCity } from "../../api/common/commonApi";
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";
import TextInputCust from "../textInput/TextInput";

const ImageHeight = Math.round(Dimensions.get('window').width / 4);

interface Props {
    formData: any;
    setFormData: any;
    setErrors: any;
}


const StepTwo: React.FC<Props> = ({ formData, setFormData, setErrors }) => {
    const userContext = React.useContext(UserContext);





    return (
        <>
            <View style={{ gap: 0, margin: 15, paddingBottom: 100 }}>
                <TextInputCust
                    placeholder='Flight Number'
                    value={formData.firstName}
                    onChangeText={value => {
                        setFormData({ ...formData, firstName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Flight Origin'
                    value={formData.LastName}
                    onChangeText={value => {
                        setFormData({ ...formData, LastName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Arrival Terminal'
                    value={formData.LastName}
                    onChangeText={value => {
                        setFormData({ ...formData, LastName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Flight Date'
                    value={formData.LastName}
                    onChangeText={value => {
                        setFormData({ ...formData, LastName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Flight Time'
                    value={formData.LastName}
                    onChangeText={value => {
                        setFormData({ ...formData, LastName: value });
                        setErrors("");
                    }}
                />

            </View>
        </>
    );
}



export default StepTwo;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    txtTitleSty: {
        fontWeight: '600',
        color: palette.txtWhite,
        textTransform: 'uppercase',
        letterSpacing: 3
    },
    list: {
    },
    listContents: {
        // gap: 16,
        alignSelf: 'flex-start'
    },
    card: {
        margin: 6,
        padding: 13,
        //   backgroundColor: palette.bgCard,
        width: ImageHeight,
        height: ImageHeight,
        borderRadius: 17,
        justifyContent: 'flex-end'
    },
    txtSty: {
        fontWeight: '600',
        color: palette.txtWhite,
    }


});