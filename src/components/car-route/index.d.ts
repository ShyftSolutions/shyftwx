declare type WeatherInputProps = {
    onClick: () => void;
    onWindSliderChange: (input: number[]) => void;
    onPrecipSliderChange: (input: number[]) => void;
    onTempSliderChange: (input: number[]) => void;
    onStart: () => void;
};

declare type ThresholdInputProps = {
    impact: string;
    action: (input: number[]) => void;
    sliderValues?: number[];
};

declare type WelcomePageProps = {
    action: () => void;
};

/*
declare type Place = {
    name: string;
    coordinates: number[];
};
 */

declare type RouteInputProps = {
    onClick: () => void;
    onStartPointChange: (input: Feature) => void;
    onDestinationChange: (input: Feature) => void;
    onTimeChange: (Date) => void;
};

declare type Threshold = {
    greaterThan: boolean;
    threshold: number[];
};

declare type FeatureValue = {
    name: string;
    unit: string;
    value: number;
};

declare type RouteLeg = {
    coordinates: [number, number][];
    threshold: any; // Record<string, Threshold>;
    featureValues: any; // Record<string, FeatureValue>;
};

declare type RouteProps = {
    legs: RouteLeg[];
};

declare type ThresholdExpansionPanelProps = {
    summary: string;
    weatherImpact: string;
    sliderValues?: number[];
};

declare type InputDrawerProps = {
    startingPoint?: Feature;
    destination?: Feature;
    time?: Date;
    windParam?: number[];
    precipParam?: number[];
    tempParam?: number[];
};
