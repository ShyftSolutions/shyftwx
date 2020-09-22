/**
 * Defines the types for the values used in the time folder
 */

declare type TimeControlProps = {
    onBack: () => void;
    onNext: () => void;
    onToggle: (isRunning: boolean) => void;
};

declare type TimeNavigationButtonProps = {
    action: () => void;
};

declare type TimeActivationButtonProps = {
    onToggle: (isRunning: boolean) => void;
};

declare type SliderValueItem = {
    label: string;
    value: number;
};

declare type SliderProps = {
    options: SliderValueItem[];
    action: (value: number) => void;
    selected: number;
};

declare type ValidTimeProps = {
    time: string;
};

declare type TimeSelectorProps = {
    action: (Date) => void;
    value?: Date;
};
