import React, { Dispatch, SetStateAction } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";
import TextInputCust from "../textInput/TextInput";

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
            <View style={{ gap: 0, margin: 15, }}>
                <TextInputCust
                    placeholder='Select Airport'
                    value={formData.firstName}
                    onChangeText={value => {
                        setFormData({ ...formData, firstName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Type of Travel'
                    value={formData.LastName}
                    onChangeText={value => {
                        setFormData({ ...formData, LastName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Service Area'
                    value={formData.LastName}
                    onChangeText={value => {
                        setFormData({ ...formData, LastName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Pickup/Dropoff Location'
                    value={formData.LastName}
                    onChangeText={value => {
                        setFormData({ ...formData, LastName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Pickup Date & Time'
                    value={formData.LastName}
                    onChangeText={value => {
                        setFormData({ ...formData, LastName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Select Vehicle Type'
                    value={formData.LastName}
                    onChangeText={value => {
                        setFormData({ ...formData, LastName: value });
                        setErrors("");
                    }}
                />
                <TextInputCust
                    placeholder='Special Requests'
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



export default StepOne;

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