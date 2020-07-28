import { MapAction, ShyftLine } from './map-actions';
import { SimpleShyftRoute } from './index';
export declare type LineInfoType = {
    lat: number;
    lon: number;
    isHidden: boolean;
    wind: number;
    temp: number;
    precip: number;
    time: Date;
};
export declare type MapState = {
    loading: boolean;
    points: {
        coords: [number, number];
        type: string;
        data?: any;
    }[];
    lines: ShyftLine[];
    selectedRoute: SimpleShyftRoute | undefined;
    selectedRouteTime: Date;
    lineInfo: LineInfoType;
    currentLayer: string;
    layerToRemove: string;
};
export declare function reducer(state: MapState | undefined, action: MapAction): MapState;
export default reducer;
