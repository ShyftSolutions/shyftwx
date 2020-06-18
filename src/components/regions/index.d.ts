/**
 * Defines the types for the values used in the regions file
 */

declare type RegionSelectorProps = {
    options: string[];
    label?: string;
    action: (option: string) => void;
};
