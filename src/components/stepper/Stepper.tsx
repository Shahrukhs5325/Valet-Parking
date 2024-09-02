import React from "react";
import { View } from "react-native";
import StepIndicator from 'react-native-step-indicator';
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";

interface Props {
    labels: string[];
    currentPosition: number;
    setCurrentPosition: any;
    onPress: (position: number) => void;
}

const Stepper: React.FC<Props> = ({ labels, currentPosition, setCurrentPosition, onPress }) => {
    const userContext = React.useContext(UserContext);

    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 2,
        stepStrokeCurrentColor: palette.txtWhite,
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: palette.primaryDark,
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: userContext?.customTheme?.primaryDark,
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: palette.primaryDark,
        stepIndicatorUnFinishedColor: '#aaaaaa',
        stepIndicatorCurrentColor: palette.primaryDark,
        stepIndicatorLabelFontSize: 12,
        currentStepIndicatorLabelFontSize: 12,
        stepIndicatorLabelCurrentColor: palette.txtWhite,
        stepIndicatorLabelFinishedColor: palette.txtWhite,
        stepIndicatorLabelUnFinishedColor: userContext?.customTheme?.primaryDark,
        labelColor: palette.txtWhite,
        labelSize: 12,
        currentStepLabelColor: userContext?.customTheme?.txtWhite,

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
