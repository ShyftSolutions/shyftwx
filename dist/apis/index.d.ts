export declare const MAPBOX_API_URL: string;
export declare const MAPBOX_DIRECTIONS_API_URL: string;
export declare const SHYFT_CAR_ROUTE_API_URL = "https://api.shyftwx.com/product/car_route";
export declare const SHYFT_CAPS_URL = "https://ogc.shyftwx.com/ogcRestful/layers";
export declare const SHYFT_WCS_ROUTE = "https://api.shyftwx.com/getwxdata/point";
declare interface SearchData {
    type: string;
    features: import('geojson').Feature[];
}
export declare const getIndexAsync: (url: any) => Promise<any>;
export declare const getProductDataAsync: (url: any, region: any, run: any) => Promise<any>;
export declare const searchAsync: (input: string) => Promise<SearchData>;
export {};
