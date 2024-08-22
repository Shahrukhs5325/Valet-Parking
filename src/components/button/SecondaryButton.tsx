import React from "react";
import { palette } from "../../theme/themes";
import { Button } from "react-native-paper";

interface Props {
    children?: React.ReactNode | any;
    onPress: () => void | any;
    mode?: string;
    disabled?: boolean | undefined;
    icon?: string;
    loading?: boolean | undefined;
    uppercase?: boolean | undefined;
    buttonColor?: string | undefined;
}

const SecondaryButton: React.FC<Props> = ({
    children,
    onPress,
    mode,
    disabled,
    uppercase,
    icon,
    loading,
    buttonColor
}) => {

    return (
        <Button
            // buttonColor={buttonColor}
            textColor={"#fff"}
            icon={icon}
            mode={"outlined"}
            loading={loading}
            disabled={disabled}
            uppercase={uppercase}
            onPress={() => onPress()}
            style={{ borderRadius: 5, height: 52, justifyContent: 'center' }}
        >
            {children}
        </Button>
    );
}



export default SecondaryButton;
