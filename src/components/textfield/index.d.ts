/**
 * Defines types of the values used in the textfield folder
 */

declare type TextFieldProps = {
    label: string;
    action: (input: string) => void;
    state: string;
    helperText?: string;
};

declare type SearchFieldProps = {
    label: string;
    handleChange: (string) => void;
};
