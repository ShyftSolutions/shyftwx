declare type Threshold = {
  greaterThan: boolean;
  threshold: number[];
};

declare type WeatherInputProps = {
    onClick: () => void;
    onWindSliderChange: (input: Threshold) => void;
    onPrecipSliderChange: (input: Threshold) => void;
    onTempSliderChange: (input: Threshold) => void;
    onStart: () => void;
};

declare type ThresholdInputProps = {
    impact: string;
    action: (input: Threshold) => void;
    sliderValues?: Threshold;
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
    destination?: Feature;
    onClick: (any) => void;
    onStartPointChange: (input: Feature) => void;
    onDestinationChange: (input: Feature) => void;
    onTimeChange: (Date) => void;
    startPoint?: Feature;
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
    sliderValues?: Threshold;
};

declare type InputDrawerProps = {
    startingPoint?: Feature;
    destination?: Feature;
    time?: Date;
    windParam?: Threshold;
    precipParam?: Threshold;
    tempParam?: Threshold;
    carRouteData: RouteLeg[];
};

declare type MapBackgroundProps = {
    data: RouteLeg[];
};
