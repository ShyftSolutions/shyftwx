/**
 * Defines types of the values used in the buttons folder
 */

declare type GroupedButtonsProps = {
    options: string[];
    action: (option: string) => void;
};

declare type BasicButtonProps = {
    text?: string;
    action: () => void;
    style?: string;
};
