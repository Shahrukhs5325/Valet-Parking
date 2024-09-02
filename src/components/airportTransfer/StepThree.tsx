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
                    <View style={{ gap: 16 }}>

                        <View style={[styles.listItem]}>
                            <Text style={styles.itemText}>Service</Text>
                            <Text style={styles.itemValueText}>bh</Text>
                        </View>
                        <View style={[styles.listItem]}>
                            <Text style={styles.itemText}>Service</Text>
                            <Text style={styles.itemValueText}>bh</Text>
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
        paddingHorizontal: 14,
        height: 50,
    },
    itemText: {
        fontFamily: FONT.JuliusSansOne.regular,
        fontSize: 14,
        fontWeight: '400',
        color: palette.txtWhite,
        width: '30%',
    },
    itemValueText: {
        fontFamily: FONT.JuliusSansOne.regular,
        fontSize: 14,
        fontWeight: '400',
        color: palette.txtWhite,
        width: '100%',
    },




});