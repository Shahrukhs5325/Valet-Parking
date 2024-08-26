import React from "react";
import { palette } from "../../theme/themes";
import { Button } from "react-native-paper";
import { UserContext } from "../../context/user/UserContext";


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

const PrimaryButton: React.FC<Props> = ({
    children,
    onPress,
    mode,
    disabled,
    uppercase,
    icon,
    loading,
    buttonColor,
}) => {
    const userContext = React.useContext(UserContext);

    return (
        <Button
            buttonColor={buttonColor === "light" ? palette.txtWhite : userContext?.customTheme?.primaryDark}
            textColor={buttonColor === "light" ? palette.primaryDark : palette.txtWhite}
            icon={icon}
            mode={"contained"}
            loading={loading}
            disabled={disabled}
            uppercase={uppercase}
            onPress={() => onPress()}
            style={{
                borderRadius: 5, height: 52, justifyContent: 'center',
                borderColor: buttonColor === "light" ? palette.primaryDark : userContext?.customTheme?.txtWhite,
                borderWidth: 1
            }}
        >
            {children}
        </Button>
    );
}

export default PrimaryButton;
