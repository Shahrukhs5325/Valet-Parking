import React, { Dispatch, SetStateAction } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";
import TextInputCust from "../textInput/TextInput";
import { FONT } from "../../theme/fonts";
import { Checkbox, Text } from "react-native-paper";

const ImageHeight = Math.round(Dimensions.get('window').width / 4);

interface Props {
    formData: any;
    setFormData: Dispatch<SetStateAction<any>>;
    setErrors: Dispatch<SetStateAction<any>>;
}


const StepTwo: React.FC<Props> = ({ formData, setFormData, setErrors }) => {
    const userContext = React.useContext(UserContext);





    return (
        <>
            <View style={{ gap: 8, }}>
                <TextInputCust
                    placeholder='Title'
                    //  value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, firstName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Pax name'
                    // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, LastName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Age'
                    // // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, LastName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='PNR'
                    // // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, LastName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Class'
                    // // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, LastName: value });
                        setErrors("");
                    }}
                />

                <TextInputCust
                    placeholder='Passenger contact details'
                    // // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, LastName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Remarks'
                    // // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, LastName: value });
                        setErrors("");
                    }}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 12 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Checkbox.Item
                            status={"unchecked"}
                            //  onPress={() => setIsTerm(!isTerm)}
                            uncheckedColor={palette.txtWhite}
                        />
                        <Text style={styles.txtSty}>Primary Card Holder</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                        <Checkbox.Item
                            status={"unchecked"}
                            //  onPress={() => setIsTerm(!isTerm)}
                            uncheckedColor={palette.txtWhite}
                        />
                        <Text style={styles.txtSty}>Add Companion</Text>
                    </View>
                </View>

                <TextInputCust
                    placeholder='Title'
                    // // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, LastName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Pax name'
                    // // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, LastName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Age'
                    // // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, LastName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Remarks'
                    // // value={formData.LastName}
                    onChangeText={value => {
                        // setFormData({ ...formData, LastName: value });
                        setErrors("");
                    }}
                />

            </View>
        </>
    );
}



export default StepTwo;

const styles = StyleSheet.create({
    txtSty: {
        fontWeight: '400',
        color: palette.txtWhite,
        fontFamily: FONT.Able.regular,
        fontSize: 14,
        marginVertical: 16
    }


});