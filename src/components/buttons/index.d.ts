/**
 * Defines types of the values used in the buttons folder
 */

declare type GroupedButtonsProps = {
    options: string[];
    onClick: (option: string) => void;
};

declare type BasicButtonProps = {
    text?: string;
    type?: string;
    onClick?: () => void;
};
