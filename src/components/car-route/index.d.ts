declare type WeatherInputProps = {
    onClick: () => void;
    onWindSliderChange: (input: number[]) => void;
    onPrecipSliderChange: (input: number[]) => void;
    onTempSliderChange: (input: number[]) => void;
};

declare type ThresholdInputProps = {
    impact: string;
    action: (input: number[]) => void;
};

declare type WelcomePageProps = {
    action: () => void;
};

declare type RouteInputProps = {
    onClick: () => void;
    onStartPointChange: (string) => void;
    onDestinationChange: (string) => void;
    onTimeChange: (Date) => void;
    startPoint: string;
    destination: string;
};
