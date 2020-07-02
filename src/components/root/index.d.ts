/**
 * Defines the types of the values used in the root file
 */

declare type ShyftWxProps = {
    dataset?: string;
    customer?: string;
    url: string;
    themeOverride?: Theme;
};

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
    filename: string;
};

declare type ForecastHour = {
    image: string;
    hour: string;
};

declare type Product = {
    name: string;
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
    themeOverride?: Theme;
};
