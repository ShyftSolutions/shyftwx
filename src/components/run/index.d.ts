/**
 * Defines types used for the values used in the run file
 */

declare type RunsSelectorProps = {
    options: number[];
    label?: string;
    action: (option: string) => void;
};
