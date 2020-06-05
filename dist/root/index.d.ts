declare type ShyftIndex = {
    version: string;
    sources: ShyftSource[];
};

declare type ShyftSource = {
    source: string;
    type: string;
    regions: ShyftRegion[];
};

declare type ShyftRegion = {
    region: string;
    area: ShyftArea;
    runs: ShyftRun[];
};

declare type ShyftArea = {
    bbox: [number, number, number, number];
};

declare type ShyftRun = {
    run: string;
    products: ShyftProduct[];
};

declare type ShyftProduct = {
    product: string;
    elevation: string;
    parmater: string;
    legend: ShyftLegend;
    frames: ShyftFrame[];
};

declare type ShyftFrame = {
    uri: string;
    forecast: string;
};

declare type ShyftLegend = {
    uri: string;
};
