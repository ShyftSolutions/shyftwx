declare type ShyftWxProps = {
    dataset: string;
    customer: string;
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
    selected: boolean;
};

declare type BoundingBox = {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
};

declare type ShyftProductData = {
    items: ShyftProduct[];
} & ShyftDataset;

declare type ShyftProduct = {
    product: string;
    level: string;
    forecast: string;
    filename: string;
    selected: boolean;
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
    region: string;
    dataset: string;
    run: Run;
};

declare type Index = {
    datasets: DatasetRegionRun[];
};
