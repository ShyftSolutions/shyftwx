declare type WeatherInputProps = {
    onClick: () => void;
};

declare type ThresholdInputProps = {
    impact: string;
};

declare type WelcomePageProps = {
    action: () => void;
};

declare type RouteInputProps = {
    onClick: () => void;
    onStartPointChange: (string) => void;
    onDestinationChange: (string) => void;
}
