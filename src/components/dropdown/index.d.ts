/**
 * Defines the types used in the dropdown folder
 */

declare type SimpleSelectProps = {
    choices: string[];
    action: (option: string) => void;
};