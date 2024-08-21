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
    isLoading?: boolean | undefined;
}

const SecondaryButton: React.FC<Props> = ({
    children,
    onPress,
    isDisabled,
    size,
    colorScheme,
    isLoading
}) => {

    return (
        <Button
            size={size}
            colorScheme={colorScheme}
            variant="outline"
            isDisabled={isDisabled}
            isLoading={isLoading}
            isLoadingText="Loading"
            onPress={() => onPress()}
            style={{
                borderColor: palette.primary,
                borderWidth: 1,
                borderRadius: 5,
                width: '100%'
            }}
        >
            {children}
        </Button>
    );
}

export default SecondaryButton;
