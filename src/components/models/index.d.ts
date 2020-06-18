/**
 * Defines the types of the values in the models folder
 */

declare type ModelSelectorProps = {
    options: string[];
    label?: string;
    action: (option: string) => void;
};