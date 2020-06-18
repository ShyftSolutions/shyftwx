/**
 * Defines the types used in the dropdown folder
 */

declare type SimpleSelectProps = {
    options: string[];
    action: (option: string) => void;
};