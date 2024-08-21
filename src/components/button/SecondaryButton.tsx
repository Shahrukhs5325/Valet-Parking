import React from "react";
import { palette } from "../../theme/themes";
import { Button } from "react-native-paper";

// sizes: "xs", "sm", "md", "lg"

interface Props {
    children?: React.ReactNode | any;
    onPress: () => void | any;
    mode?: string;
    disabled?: boolean | undefined;
    icon?: string;
    loading?: boolean | undefined;
    uppercase?: boolean | undefined;

}

const SecondaryButton: React.FC<Props> = ({
    children,
    onPress,
    mode,
    disabled,
    uppercase,
    icon,
    loading
}) => {

    return (
        <Button
            buttonColor={palette.primaryDark}
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
