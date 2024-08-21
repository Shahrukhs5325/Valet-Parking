import React from "react";
import { TextInput } from "react-native-paper";
import { palette } from "../../theme/themes";

// sizes: "xs", "sm", "md", "lg"

interface Props {
    onChangeText?: (value: any) => void;
    placeholder?: string;
    disabled?: boolean | undefined;
    value?: string;
    secureTextEntry?: boolean | undefined;
    right?: React.ReactNode;
}

const TextInputCust: React.FC<Props> = ({
    onChangeText,
    placeholder,
    disabled,
    value,
    secureTextEntry,
    right

}) => {

    return (
        <TextInput
            placeholder={placeholder}
            mode='outlined'
            value={value}
            disabled={disabled}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            style={{ borderWidth: 0, backgroundColor: palette.primaryLight }}
            outlineStyle={{ borderWidth: 0 }}
            right={right}
            placeholderTextColor={palette.txtGray}

        />
    );
}

export default TextInputCust;
