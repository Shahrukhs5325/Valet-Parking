import React, { Dispatch, SetStateAction } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";
import TextInputCust from "../textInput/TextInput";
import { Text } from "react-native-paper";
import { FONT } from "../../theme/fonts";

const ImageHeight = Math.round(Dimensions.get('window').width / 4);

interface Props {
    formData: any;
    setFormData: Dispatch<SetStateAction<any>>;
    setErrors: Dispatch<SetStateAction<any>>;
}


const StepOne: React.FC<Props> = ({ formData, setFormData, setErrors }) => {
    const userContext = React.useContext(UserContext);





    return (
        <>
            <View style={{ gap: 8, }}>
                <TextInputCust
                    placeholder='Airport'
                    value={formData.firstName}
                    onChangeText={value => {
                        // setFormData({ ...formData, firstName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Travel type'
                    // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, firstName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Flight number'
                    // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, firstName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Flight date and time'
                    // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, firstName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Arrival/Departure Terminal'
                    // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, firstName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Origin'
                    // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, firstName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Destination'
                    // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, firstName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Carrier'
                    // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, firstName: value });
                        setErrors("");
                    }}
                />

                <Text style={styles.txtSty}>Airport Transfer Details:</Text>


                <TextInputCust
                    placeholder='Area'
                    // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, firstName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Location'
                    // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, firstName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Passenger contact details'
                    // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, firstName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Pick-up date & time'
                    // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, firstName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Additional information'
                    // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, firstName: value });
                        setErrors("");
                    }}
                />

            </View>
        </>
    );
}



export default StepOne;

const styles = StyleSheet.create({

    txtSty: {
        fontWeight: '400',
        color: palette.txtWhite,
        fontFamily: FONT.JuliusSansOne.regular,
        fontSize: 14,
        marginVertical: 16
    }


});