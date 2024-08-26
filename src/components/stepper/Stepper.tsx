import React from "react";
import { palette } from "../../theme/themes";
import { Button } from "react-native-paper";
import { UserContext } from "../../context/user/UserContext";
import { View } from "react-native";
import StepIndicator from 'react-native-step-indicator';

interface Props {
    // children?: React.ReactNode | any;
    // onPress: () => void | any;
    // mode?: string;
    // disabled?: boolean | undefined;
    // icon?: string;
    // loading?: boolean | undefined;
    // uppercase?: boolean | undefined;
    labels: string[];
    currentPosition: number;
    setCurrentPosition: any;
    onPress: () => void;
}

const Stepper: React.FC<Props> = ({ labels, currentPosition, setCurrentPosition, onPress }) => {
    const userContext = React.useContext(UserContext);

    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: userContext?.customTheme?.primaryDark,
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: userContext?.customTheme?.primaryDark,
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: userContext?.customTheme?.primaryDark,
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: userContext?.customTheme?.primaryDark,
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: userContext?.customTheme?.primaryLight,
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: userContext?.customTheme?.primaryDark,
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: userContext?.customTheme?.primaryDark,
        labelColor: palette.txtBlack,
        labelSize: 13,
        currentStepLabelColor: userContext?.customTheme?.primaryDark,
    }

    return (
        <View style={{ marginHorizontal: 15, marginTop: 20 }}>
            <StepIndicator
                customStyles={customStyles}
                currentPosition={currentPosition}
                labels={labels}
                stepCount={labels.length}
                onPress={onPress}
            />
        </View>
    );
}



export default Stepper;
