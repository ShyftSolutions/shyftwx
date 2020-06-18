/**
 * Defines types of the values used in the buttons folder
 */

declare type GroupedButtonsProps = {
    options: string[];
    action: (option: string) => void;
};