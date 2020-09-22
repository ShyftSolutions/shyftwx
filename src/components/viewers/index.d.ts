/**
 * Defines the types of the values used in the viewers file
 */

declare type ImageViewerProps = {
    image: string;
};

declare type WxViewerLayer = {
    type: 'image' | 'metar';
    coordinates: import('leaflet').LatLngExpression;
};

declare type MetarPayload = {
    altimeter: number;
    automation: string;
    ceiling: number;
    cloud_coverages: number[];
    cloud_layers: number[];
    dewpoint: number;
    elevation: number;
    present_wx: number;
    raw_ob: string;
    report_id: string;
    report_type: string;
    sky_cover: number;
    temperature: number;
    valid_time: Date;
    visibility: number;
    wind_direction: number;
    wind_gust: number;
    wind_speed: number;
};

declare type WxViewerLayerMetar = WxViewerLayer & { type: 'metar'; payload: MetarPayload };

declare type BaseWxViewerProps = {
    layers: WxViewerLayer[];
    neBounds: import('leaflet').LatLngExpression;
    swBounds: import('leaflet').LatLngExpression;
};
