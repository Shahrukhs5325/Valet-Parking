import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";
import EditIcon from '../../asset/svg/pencil-1.svg';

const ImageHeight = Math.round(Dimensions.get('window').width / 4);

interface Props {
    formData: any;
    setFormData: any;
    setErrors: any;
    setCurrentPosition: any;
}


const StepThree: React.FC<Props> = ({ formData, setFormData, setErrors, setCurrentPosition }) => {
    const userContext = React.useContext(UserContext);
    const user = userContext.user;

    console.log();



    return (
        <>
            <View style={{ marginTop: 15, gap: 20 }}>
                <View style={styles.containerView}>
                    <Text variant="titleMedium" style={styles.txtBlackHeading}>Personal Details</Text>
                    <View style={styles.dataContView}>
                        <View style={styles.txtGapView}>
                            <Text variant="bodyMedium" style={styles.txtHeading}>Name</Text>
                            <Text variant="titleMedium" style={styles.txtSummHeading}>{user?.customerName}</Text>
                        </View>
                        <View style={styles.bottomLineSty}></View>
                        <View style={styles.txtGapView}>
                            <Text variant="bodyMedium" style={styles.txtHeading}>Mobile number</Text>
                            <Text variant="titleMedium" style={styles.txtSummHeading}>{user?.phoneNo}</Text>
                        </View>
                        <View style={styles.bottomLineSty}></View>
                        <View style={styles.txtGapView}>
                            <Text variant="bodyMedium" style={styles.txtHeading}>Email address</Text>
                            <Text variant="titleMedium" style={styles.txtSummHeading}>{user?.email}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.containerView}>
                    <View style={styles.headTxtView}>
                        <Text variant="titleMedium" style={styles.txtBlackHeading}>Travel and Service Details</Text>
                        <TouchableOpacity onPress={() => setCurrentPosition(0)}>
                            <EditIcon />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dataContView}>
                        <View style={styles.txtGapView}>
                            <Text variant="bodyMedium" style={styles.txtHeading}>Airport</Text>
                            <Text variant="titleMedium" style={styles.txtSummHeading}>King Abdulaziz International Airport</Text>
                        </View>
                        <View style={styles.bottomLineSty}></View>
                        <View style={styles.txtGapView}>
                            <Text variant="bodyMedium" style={styles.txtHeading}>Type of Travel</Text>
                            <Text variant="titleMedium" style={styles.txtSummHeading}>Departure</Text>
                        </View>
                        <View style={styles.bottomLineSty}></View>
                        <View style={styles.txtGapView}>
                            <Text variant="bodyMedium" style={styles.txtHeading}>Service Area   </Text>
                            <Text variant="titleMedium" style={styles.txtSummHeading}>Al Rayaan, Jeddah 23642, Saudi Arabia</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.containerView}>
                    <View style={styles.headTxtView}>
                        <Text variant="titleMedium" style={styles.txtBlackHeading}>Flight dETAILS</Text>
                        <TouchableOpacity onPress={() => setCurrentPosition(1)}>
                            <EditIcon />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dataContView}>
                        <View style={styles.txtGapView}>
                            <Text variant="bodyMedium" style={styles.txtHeading}>Flight Number</Text>
                            <Text variant="titleMedium" style={styles.txtSummHeading}>AB123</Text>
                        </View>
                        <View style={styles.bottomLineSty}></View>
                        <View style={styles.txtGapView}>
                            <Text variant="bodyMedium" style={styles.txtHeading}>Flight Origin</Text>
                            <Text variant="titleMedium" style={styles.txtSummHeading}>Jeddah</Text>
                        </View>
                        <View style={styles.bottomLineSty}></View>
                        <View style={styles.txtGapView}>
                            <Text variant="bodyMedium" style={styles.txtHeading}>Flight Date & Time</Text>
                            <Text variant="titleMedium" style={styles.txtSummHeading}>Sun, 18 August - 3:00PM</Text>
                        </View>
                    </View>
                </View>



            </View>
        </>
    );
}



export default StepThree;

const styles = StyleSheet.create({
    containerView: {
        marginTop: 15,
        paddingHorizontal: 15,
        gap: 8
    },
    dataContView: {
        backgroundColor: palette.txtWhite,
        padding: 14,
        borderRadius: 10,
        gap: 4,
        marginTop: 6

    },
    bottomLineSty: {
        borderBottomWidth: 1,
        borderColor: palette.bgGray,
        marginHorizontal: 10,
        marginVertical: 5
    },
    headTxtView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10
    },
    txtGapView: {
        gap: 4
    },
    txtBlackHeading: {
        color: palette.txtBlack,
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: '800',
    },
    txtSummHeading: {
        color: palette.txtBlack,
        fontWeight: '800',
    },
    txtHeading: {
        color: palette.txtGray,
    }




});