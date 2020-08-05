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

declare type Threshold = {
    greaterThan: boolean;
    threshold: number[];
}

declare type FeatureValue = {
    name: string;
    unit: string;
    value: number;
}

declare type RouteLeg = {
    coordinates: [number, number][];
    threshold: any; // Record<string, Threshold>;
    featureValues: any; // Record<string, FeatureValue>;
}

declare type RouteProps = {
    legs: RouteLeg[]
}