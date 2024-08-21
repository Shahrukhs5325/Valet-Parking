import { Button } from "native-base";
import React from "react";
import { palette } from "../../theme/themes";

// sizes: "xs", "sm", "md", "lg"

interface Props {
    children?: React.ReactNode | any;
    onPress: () => void | any;
    isDisabled?: boolean | undefined;
    size?: string;
    colorScheme?: string;
    variant?: string;
    isLoading?: boolean | undefined;
    style?: any;
    leftIcon?: any;
}

const IconButton: React.FC<Props> = ({
    children,
    onPress,
    isDisabled,
    size,
    colorScheme,
    variant,
    isLoading,
    style,
    leftIcon
}) => {
    return (
        <Button
            size={size}
            // colorScheme={colorScheme}
            variant={variant}
            isDisabled={isDisabled}
            isLoading={isLoading}
            isLoadingText="Loading"
            onPress={() => onPress()}
            style={style}
            borderRadius={20}
            leftIcon={leftIcon}
            _text={{ color: palette.primary }}
        >
            {children}
        </Button>
    );
}

export default IconButton;
