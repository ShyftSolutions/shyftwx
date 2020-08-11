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

declare type RouteInputProps = {
    onClick: (any) => void;
    onStartPointChange: (input: Feature) => void;
    onDestinationChange: (input: Feature) => void;
    onTimeChange: (Date) => void;
};

declare type FeatureValue = {
    name: string;
    unit: string;
    value: number;
};

declare type RouteLeg = {
    coordinates: [number, number][];
    // threshold: any; // Record<string, Threshold>;
    featureValues: any; // Record<string, FeatureValue>;
};

declare type RouteProps = {
    legs: RouteLeg[];
    thresholds: any; // Record<string, Threshold>;
};

declare type ThresholdExpansionPanelProps = {
    summary: string;
    weatherImpact: string;
    sliderValues?: Threshold;
    onSliderValueChange: any;
};

declare type InputDrawerProps = {
    startingPoint?: Feature;
    destination?: Feature;
    time?: Date;
    windParam?: Threshold;
    precipParam?: Threshold;
    tempParam?: Threshold;
    carRouteData: RouteLeg[];
    onWindSliderChange: (input: Threshold) => void;
    onPrecipSliderChange: (input: Threshold) => void;
    onTempSliderChange: (input: Threshold) => void;
};

declare type MapBackgroundProps = {
    children: any; // what is this one?
    // data: RouteLeg[];
    // thresholds: any; // Record<string, Threshold>;
};
