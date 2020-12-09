export declare const MAPBOX_API_URL: string;
export declare const MAPBOX_DIRECTIONS_API_URL: string;
export declare const SHYFT_CAR_ROUTE_API_URL = "https://api.shyftwx.com/v1/product/car_route";
export declare const SHYFT_CAPS_URL = "https://ogc.shyftwx.com/ogcRestful/layers";
export declare const SHYFT_WCS_ROUTE = "https://api.shyftwx.com/getwxdata/point";
export declare const getProductUrl: (baseUrl: string, customerId: string, datasetId: string, region?: string | undefined, run?: string | undefined) => string;
export declare const getOutputUrl: (baseUrl: string, customerId: string, datasetId: string, run?: string | undefined) => string;
export declare const getIndexAsync: (baseUrl: string, customerId: string, datasetId: string) => Promise<ShyftIndex>;
export declare const getProductDataAsync: (baseUrl: string, customerId: string, datasetId: string, region: string, run: string) => Promise<any>;
export declare const getOutputStatusAsync: (baseUrl: string, customerId: string, datasetId: string) => Promise<{
    runs: string[];
}>;
export declare const getOutputRunStatusAsync: (baseUrl: string, customerId: string, datasetId: string, run: string) => Promise<{
    total_available: number;
}>;
export declare function directionsAsync(coords: number[][]): Promise<any>;
export declare const carRouteAsync: (currentRoute: any, startTime: Date | undefined) => Promise<RouteImpactDataSegment[]>;
