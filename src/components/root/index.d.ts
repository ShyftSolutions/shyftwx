/**
 * Defines the types of the values used in the root file
 */

declare type DynamicFeature = 'routes';

declare type ShyftWxProps = {
    dataset?: string;
    customer?: string;
    url: string;
    themeOverride?: Theme;
    dynamicFeatures?: DynamicFeature[];
};

declare type ShyftWxContentProps = {
    index: Index;
    product: string;
    level: string;
    forecast: string;
    region: string;
    run: string;
    onProductSelect: (product: string) => void;
    onLevelSelect: (level: string) => void;
    onForecastSelect: (forecast: string) => void;
    onRegionSelect: (region: string) => void;
    onRunSelect: (run: string) => void;
    getLevels: (product: string) => string[];
};

declare type ShyftWxDynamicProps = {
    dynamicFeatures: DynamicFeature[];
} & ShyftWxContentProps;

declare type ShyftIndex = {
    version: string;
    datasets: ShyftDataset[];
};

declare type ShyftDataset = {
    name: string;
    region: ShyftRegion;
    run: string;
};

declare type ShyftRegion = {
    name: string;
    bbox: BoundingBox;
};

declare type BoundingBox = {
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
};

declare type ShyftProductData = {
    items: ShyftProduct[];
} & ShyftDataset;

declare type ShyftProduct = {
    product: string;
    level: string;
    forecast: string;
    url: string;
};

declare type ForecastHour = {
    image: string;
    hour: string;
};

declare type Product = {
    name: string;
    metadata: any;
    forecasts: ForecastHour[];
};

declare type Level = {
    name: string;
    products: Product[];
};

declare type Run = {
    name: string;
    levels: Level[];
};

declare type DatasetRegionRun = {
    region: ShyftRegion;
    dataset: string;
    run: Run;
};

declare type Index = {
    datasets: DatasetRegionRun[];
};

declare type LandingPageProps = {
    url: string;
    customerId?: string;
    datasetId?: string;
    appStatus?: import('../../services/app-service').AppStatus;
    onStatusChange?: (newStatus: import('../../services/app-service').AppStatus) => void;
};
