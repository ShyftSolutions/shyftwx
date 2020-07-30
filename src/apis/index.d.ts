declare type SearchData = {
    type: string;
    features: import('geojson').Feature[];
};

declare interface FeatureParameters {
    name: string;
    unit: string;
    value: number;
}

declare interface PointRequestResult {
    type: string;
    features: import('geojson').Feature[];
}

declare interface FeatureProperties {
    times: Date[];
    parameters: FeatureParameters[];
}

declare interface ResponseFeature {
    geometry: import('geojson').LineString;
    properties: FeatureProperties;
    type: string;
}

declare interface ShyftCarRouteResponse {
    features: ResponseFeature[];
    type: string;
}

declare interface ShyftOGCRestfulLayerResponse {
    defaultForecast: string;
    defaultRun?: string;
    defaultStyle: string;
    forecasts: string[];
    name: string;
    runs?: string[];
    styles: string[];
    title: string;
}

declare interface ShyftOGCLayerTreeLeafNode {
    title: string;
    name: string;
}

declare type ShyftOGCLayerTreeNode = { [key: string]: ShyftOGCLayerTree };

declare type ShyftOGCLayerTree = ShyftOGCLayerTreeNode | ShyftOGCLayerTreeLeafNode;
