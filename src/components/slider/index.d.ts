declare type ThresholdSliderProps = {
    label: string;
    min: number;
    max: number;
    values: number[];
    units: string;
    key: string;
    onChange: (values: number[]) => void;
    onAfterChange?: (data: any) => void;
    isGreaterThan?: boolean;
};
