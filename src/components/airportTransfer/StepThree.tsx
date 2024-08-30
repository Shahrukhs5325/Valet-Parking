import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";
import EditIcon from '../../assets/svg/pencil-1.svg';
import { FONT } from "../../theme/fonts";


interface Props {
    formData: any;
    setFormData: Dispatch<SetStateAction<any>>;
    setErrors: Dispatch<SetStateAction<any>>;
    setCurrentPosition: Dispatch<SetStateAction<number>>
}


const StepThree: React.FC<Props> = ({ formData, setFormData, setErrors, setCurrentPosition }) => {
    const userContext = React.useContext(UserContext);
    const user = userContext.user;




    return (
        <>
            <View style={{ marginTop: 15, gap: 20 }}>
                <View style={styles.containerView}>
                    <Text style={styles.txtBlackHeading}>Personal Details</Text>
                    <View style={styles.dataContView}>
                        <View style={styles.txtGapView}>
                            <Text style={styles.txtHeading}>Name</Text>
                            <Text style={styles.txtSummHeading}>{user?.customerName}</Text>
                        </View>
                        <View style={styles.bottomLineSty}></View>
                        <View style={styles.txtGapView}>
                            <Text style={styles.txtHeading}>Mobile number</Text>
                            <Text style={styles.txtSummHeading}>{user?.phoneNo}</Text>
                        </View>
                        <View style={styles.bottomLineSty}></View>
                        <View style={styles.txtGapView}>
                            <Text style={styles.txtHeading}>Email address</Text>
                            <Text style={styles.txtSummHeading}>{user?.email}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.containerView}>
                    <View style={styles.headTxtView}>
                        <Text style={styles.txtBlackHeading}>Travel and Service Details</Text>
                        <TouchableOpacity onPress={() => setCurrentPosition(0)}>
                            <EditIcon />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dataContView}>
                        <View style={styles.txtGapView}>
                            <Text style={styles.txtHeading}>Airport</Text>
                            <Text style={styles.txtSummHeading}>King Abdulaziz International Airport</Text>
                        </View>
                        <View style={styles.bottomLineSty}></View>
                        <View style={styles.txtGapView}>
                            <Text style={styles.txtHeading}>Type of Travel</Text>
                            <Text style={styles.txtSummHeading}>Departure</Text>
                        </View>
                        <View style={styles.bottomLineSty}></View>
                        <View style={styles.txtGapView}>
                            <Text style={styles.txtHeading}>Service Area   </Text>
                            <Text style={styles.txtSummHeading}>Al Rayaan, Jeddah 23642, Saudi Arabia</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.containerView}>
                    <View style={styles.headTxtView}>
                        <Text style={styles.txtBlackHeading}>Flight Details</Text>
                        <TouchableOpacity onPress={() => setCurrentPosition(1)}>
                            <EditIcon />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dataContView}>
                        <View style={styles.txtGapView}>
                            <Text style={styles.txtHeading}>Flight Number</Text>
                            <Text style={styles.txtSummHeading}>AB123</Text>
                        </View>
                        <View style={styles.bottomLineSty}></View>
                        <View style={styles.txtGapView}>
                            <Text style={styles.txtHeading}>Flight Origin</Text>
                            <Text style={styles.txtSummHeading}>Jeddah</Text>
                        </View>
                        <View style={styles.bottomLineSty}></View>
                        <View style={styles.txtGapView}>
                            <Text style={styles.txtHeading}>Flight Date & Time</Text>
                            <Text style={styles.txtSummHeading}>Sun, 18 August - 3:00PM</Text>
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
        color: palette.txtWhite,
        fontWeight: '400',
        fontFamily: FONT.Able.regular,
        fontSize: 16,
    },
    txtSummHeading: {
        color: palette.txtBlack,
        fontWeight: '400',
        fontFamily: FONT.Able.regular,
        fontSize: 16,
    },
    txtHeading: {
        color: palette.txtGray,
        fontWeight: '400',
        fontFamily: FONT.Able.regular,
        fontSize: 14,
    }




});