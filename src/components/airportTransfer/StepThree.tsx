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


const StepThree: React.FC<Props> = ({ formData, setFormData, setErrors }) => {
    const userContext = React.useContext(UserContext);





    return (
        <>
            <View style={{ marginTop: 15 }}>
                <View style={{ padding: 15, gap: 8 }}>
                    <Text variant="titleMedium" style={styles.txtBlackHeading}>Booking Summary</Text>
                    <View style={{}}>
                        <Text variant="titleMedium" style={styles.txtSummHeading}>Booking ID</Text>
                        <Text variant="bodyLarge" style={styles.txtBodyHeading}>987654321</Text>
                    </View>
                    <View style={{}}>
                        <Text variant="titleMedium" style={styles.txtSummHeading}>Booked for</Text>
                        <Text variant="bodyLarge" style={styles.txtBodyHeading}>{userContext.user?.customerName}</Text>
                    </View>
                    <View style={{}}>
                        <Text variant="titleMedium" style={styles.txtSummHeading}>Booked Date</Text>
                        <Text variant="bodyLarge" style={styles.txtBodyHeading}>h</Text>
                    </View>
                </View>
                <View style={{ borderBottomWidth: 1, borderColor: palette.txtGray, marginHorizontal: 30 }}></View>
                <View style={{ padding: 15, gap: 8 }}>
                    <Text variant="titleMedium" style={styles.txtBlackHeading}>Service Details</Text>
                    <View style={{}}>
                        <Text variant="titleMedium" style={styles.txtSummHeading}>Service Type</Text>
                        <Text variant="bodyLarge" style={styles.txtBodyHeading}>Valet Parking Service</Text>
                    </View>
                    <View style={{}}>
                        <Text variant="titleMedium" style={styles.txtSummHeading}>Service Name</Text>
                        <Text variant="bodyLarge" style={styles.txtBodyHeading}>h</Text>
                    </View>

                </View>
                <View style={{ borderBottomWidth: 1, borderColor: palette.txtGray, marginHorizontal: 30 }}></View>
                <View style={{ padding: 15, gap: 8 }}>
                    <Text variant="titleMedium" style={styles.txtBlackHeading}>Service Time</Text>
                    <View style={{}}>
                        <Text variant="titleMedium" style={styles.txtSummHeading}>Duration</Text>
                        <Text variant="bodyLarge" style={styles.txtBodyHeading}> Hour</Text>
                    </View>
                    <View style={{}}>
                        <Text variant="titleMedium" style={styles.txtSummHeading}>Start Date & Time</Text>
                        <Text variant="bodyLarge" style={styles.txtBodyHeading}>j</Text>
                    </View>
                    <View style={{}}>
                        <Text variant="titleMedium" style={styles.txtSummHeading}>End Date & Time</Text>
                        <Text variant="bodyLarge" style={styles.txtBodyHeading}>j</Text>
                    </View>
                </View>
            </View>
        </>
    );
}



export default StepThree;

const styles = StyleSheet.create({
    txtBlackHeading: {
        color: palette.txtBlack,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    txtSummHeading: {
        color: palette.txtBlack,
        fontWeight: '800',
    },
    txtBodyHeading: {
        color: palette.txtGray,
    }




});