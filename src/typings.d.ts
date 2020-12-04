/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}

interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
    const svgUrl: string;
    const svgComponent: SvgrComponent;
    export default svgUrl;
    export { svgComponent as ReactComponent };
}

declare type RouteImpactDataSegment = {
    lineString: import('geojson').LineString;
    temp: number;
    wind: number;
    precip: number;
    startTime: Date;
    endTime?: Date;
    index?: number;
};

declare type SearchData = {
    type: string;
    features: import('geojson').Feature[];
};

declare type FeatureParameters = {
    name: string;
    unit: string;
    value: number;
};

declare type PointRequestResult = {
    type: string;
    features: import('geojson').Feature[];
};

declare type FeatureProperties = {
    times: Date[];
    parameters: FeatureParameters[];
};

declare type ResponseFeature = {
    geometry: import('geojson').LineString;
    properties: FeatureProperties;
    type: string;
};

declare type ShyftCarRouteResponse = {
    features: ResponseFeature[];
    type: string;
};

declare type ShyftOGCRestfulLayerResponse = {
    defaultForecast: string;
    defaultRun?: string;
    defaultStyle: string;
    forecasts: string[];
    name: string;
    runs?: string[];
    styles: string[];
    title: string;
};

declare type ShyftOGCLayerTreeLeafNode = {
    title: string;
    name: string;
};

declare type ShyftOGCLayerTreeNode = { [key: string]: ShyftOGCLayerTree };

declare type ShyftOGCLayerTree = ShyftOGCLayerTreeNode | ShyftOGCLayerTreeLeafNode;
