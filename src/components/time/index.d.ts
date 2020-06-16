declare type TimeControlProps = {
    onBack: any;
    onNext: any;
    onPlay: any;
    onPause: any;
};

declare type TimeNavigationButtonProps = {
    action: any;
};

declare type TimeActivationButtonProps = {
    onStart: any;
    onStop: any;
};

declare type sliderValueItem = {
    label: string;
    value: number;
};

declare type SliderProps = {
    options: sliderValueItem[];
    action: (value: number) => void;
    selected: string;
    modelTime: Date;
};


declare type ValidTimeProps = {
    time: string;
};
