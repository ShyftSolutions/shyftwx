declare type ShyftWxProps = {
    indexData?: ShyftIndex;
    indexUrl?: string;
    themeOverride?: Theme;
};

declare type ShyftIndex = {
    version: string;
    datasets: ShyftDataset[];
};

declare type ShyftDataset = {
    name: string;
    region: string;
    run: string;
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
