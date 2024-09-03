import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";
import EditIcon from '../../assets/svg/pencil-1.svg';
import { FONT } from "../../theme/fonts";
import LinearGradient from "react-native-linear-gradient";


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
            <View style={[styles.gradientWrapper]}>
                <LinearGradient
                    colors={['rgba(22, 22, 22, 1)', 'rgba(40, 40, 40, 1)']} // Gradient color
                    style={styles.gradientContainer}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <View style={{ gap: 0 }}>

                        <View style={[styles.listItem]}>
                            <Text style={styles.itemText}>Service</Text>
                            <Text style={styles.itemValueText}>Airport transfer</Text>
                        </View>
                        <View style={styles.viewBorder} />
                        <View style={[styles.listItem]}>
                            <Text style={styles.itemText}>No. of Pax</Text>
                            <Text style={styles.itemValueText}>1</Text>
                        </View>
                        <View style={styles.viewBorder} />
                        <View style={[styles.listItem]}>
                            <Text style={styles.itemText}>Title</Text>
                            <Text style={styles.itemValueText}>Mr.</Text>
                        </View>
                        <View style={styles.viewBorder} />
                        <View style={[styles.listItem]}>
                            <Text style={styles.itemText}>Name</Text>
                            <Text style={styles.itemValueText}>Pasha</Text>
                        </View>
                        <View style={styles.viewBorder} />
                        <View style={[styles.listItem]}>
                            <Text style={styles.itemText}>Mobile</Text>
                            <Text style={styles.itemValueText}>+966 8451 685451 51</Text>
                        </View>
                        <View style={styles.viewBorder} />
                        <View style={[styles.listItem]}>
                            <Text style={styles.itemText}>Email</Text>
                            <Text style={styles.itemValueText}>zaps@zapsmarketing.com</Text>
                        </View>

            
                        <View style={styles.viewBorder} />
                        <View style={[styles.listItem]}>
                            <Text style={styles.itemText}>Type of travel</Text>
                            <Text style={styles.itemValueText}>Departure</Text>
                        </View>
                        <View style={styles.viewBorder} />
                        <View style={[styles.listItem]}>
                            <Text style={styles.itemText}>Flight number</Text>
                            <Text style={styles.itemValueText}>SV761</Text>
                        </View>
                        <View style={styles.viewBorder} />
                        <View style={[styles.listItem]}>
                            <Text style={styles.itemText}>Flight date & time</Text>
                            <Text style={styles.itemValueText}>11 September 2024 | 11:59 PM</Text>
                        </View>
                        <View style={styles.viewBorder} />
                        <View style={[styles.listItem]}>
                            <Text style={styles.itemText}>Terminal</Text>
                            <Text style={styles.itemValueText}>3</Text>
                        </View>
                        <View style={styles.viewBorder} />
                        <View style={[styles.listItem]}>
                            <Text style={styles.itemText}>Carrier</Text>
                            <Text style={styles.itemValueText}>Saudi Airlines</Text>
                        </View>
                        <View style={styles.viewBorder} />
                        <View style={[styles.listItem]}>
                            <Text style={styles.itemText}>Remarks</Text>
                            <Text style={styles.itemValueText}>Please take care</Text>
                        </View>

    

                        <View style={[styles.listItem]}>
                            <Text style={styles.itemText}>Area</Text>
                            <Text style={styles.itemValueText}>Dubai Marina</Text>
                        </View>
                        <View style={styles.viewBorder} />
                        <View style={[styles.listItem]}>
                            <Text style={styles.itemText}>Location</Text>
                            <Text style={styles.itemValueText}>Novotel Suites</Text>
                        </View>
                        <View style={styles.viewBorder} />
                        <View style={[styles.listItem]}>
                            <Text style={styles.itemText}>Pick-up date</Text>
                            <Text style={styles.itemValueText}>11 September 2024</Text>
                        </View>
                        <View style={styles.viewBorder} />
                        <View style={[styles.listItem]}>
                            <Text style={styles.itemText}>Pick-up time</Text>
                            <Text style={styles.itemValueText}>11:59 PM</Text>
                        </View>
                        <View style={styles.viewBorder} />
                        <View style={[styles.listItem]}>
                            <Text style={styles.itemText}>Additional info</Text>
                            <Text style={styles.itemValueText}>Please be on time</Text>
                        </View>





                    </View>
                </LinearGradient>
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
    gradientContainer: {
        paddingHorizontal: 20,
    },
    gradientWrapper: {
        // flex: 1,
        marginTop: 25,
        marginBottom: 12,
        borderRadius: 17,
        borderWidth: 1,
        borderColor: palette.borderClr,
        overflow: 'hidden'
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 52,
    },
    itemText: {
        fontFamily: FONT.Able.regular,
        fontSize: 14,
        fontWeight: '400',
        color: palette.txtWhite,
        width: '33%',
    },
    itemValueText: {
        fontFamily: FONT.Able.regular,
        fontSize: 14,
        fontWeight: '400',
        color: palette.txtWhite,
        width: '100%',
    },
    viewBorder: {
        borderBottomWidth: 0.8,
        borderBottomColor: palette.borderClr,
    },
    txtTitle: {
        fontFamily: FONT.Able.regular,
        fontSize: 15,
        fontWeight: '400',
        color: palette.txtWhite,
        width: '100%',
        paddingVertical: 26
    }




});