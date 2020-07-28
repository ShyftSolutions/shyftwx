import { RouteImpactDataSegment, SimpleShyftRoute } from './index';
import ShyftRoute from '../../components/car-route/models/ShyftRoute';
import { LineInfoType } from './map-reducer';
export declare const ADD_MARKER = "addMarker";
export declare const ADD_ROUTE = "addRoute";
export declare const REMOVE_MARKER = "removeMarker";
export declare const CLEAR_ROUTES = "clearRoutes";
export declare const IMPACT_ROUTE = "applyImpactsToRoute";
export declare const SET_LINE_INFO = "setLineInfo";
export declare const IMPACT_TABLE_DRAG = "impactTableDrag";
export declare const ADD_POPUP = "addPopup";
export declare const REMOVE_POPUP = "removePopup";
export declare const HIDE_POPUP = "hidePopup";
export declare const SHOW_POPUP = "showPopup";
export declare const SET_LOADING = "setLoading";
export declare const SET_CURRENT_LAYER = "setCurrentLayer";
export declare const REMOVE_LAYER = "RemoveLayer";
export declare const SET_SELECTED_ROUTE_TIME = "setSelectedRouteTime";
export declare const ADD_DATA_POINT = "addDataPoint";
export declare const REMOVE_DATA_POINT = "removeDataPoint";
export declare enum LineStatus {
    Good = 1,
    Okay = 2,
    Bad = 3,
    Default = 0
}
export declare type ShyftLinePoint = {
    coordinate: [number, number];
    status: LineStatus;
};
export declare type ShyftLine = {
    points: ShyftLinePoint[];
};
declare type AddMarkerAction = {
    type: typeof ADD_MARKER;
    payload: number[];
};
declare type AddRouteAction = {
    type: typeof ADD_ROUTE;
    payload: SimpleShyftRoute;
};
declare type RemoveMarkerAction = {
    type: typeof REMOVE_MARKER;
    payload: number[];
};
declare type ClearRoutesAction = {
    type: typeof CLEAR_ROUTES;
};
declare type ImpactRouteAction = {
    type: typeof IMPACT_ROUTE;
    payload: SimpleShyftRoute;
};
declare type SetLineInfoAction = {
    type: typeof SET_LINE_INFO;
    payload: LineInfoType;
};
declare type AddPopupAction = {
    type: typeof ADD_POPUP;
    payload: {
        coords: [number, number];
        id: string;
        url: string;
        type: string;
    };
};
declare type RemovePopupAction = {
    type: typeof REMOVE_POPUP;
    payload: string;
};
declare type HidePopupAction = {
    type: typeof HIDE_POPUP;
    payload: string;
};
declare type ShowPopupAction = {
    type: typeof SHOW_POPUP;
    payload: {
        lat: number;
        lon: number;
    };
};
declare type SetLoadingAction = {
    type: typeof SET_LOADING;
    payload: boolean;
};
declare type SetCurrentLayerAction = {
    type: typeof SET_CURRENT_LAYER;
    payload: string;
};
declare type RemoveLayerAction = {
    type: typeof REMOVE_LAYER;
    payload: string;
};
declare type SetSelectedRouteTimeAction = {
    type: typeof SET_SELECTED_ROUTE_TIME;
    payload: Date;
};
declare type AddDataPointAction = {
    type: typeof ADD_DATA_POINT;
    payload: {
        coords: [number, number];
        id: string;
        data: any;
    };
};
declare type RemoveDataPointAction = {
    type: typeof REMOVE_DATA_POINT;
    payload: string;
};
export declare type MapAction = AddMarkerAction | AddRouteAction | RemoveMarkerAction | ClearRoutesAction | ImpactRouteAction | SetLineInfoAction | AddPopupAction | RemovePopupAction | HidePopupAction | ShowPopupAction | SetLoadingAction | SetCurrentLayerAction | RemoveLayerAction | SetSelectedRouteTimeAction | AddDataPointAction | RemoveDataPointAction;
export declare function setLoading(loading: boolean): SetLoadingAction;
export declare function addMarker(coords: number[]): AddMarkerAction;
export declare function addRoute(route: ShyftRoute): AddRouteAction;
export declare function setActiveRoute(routeTime: string): {
    type?: undefined;
    payload?: undefined;
} | {
    type: string;
    payload: import("../../components/car-route/models").SimpleShyftRoute;
};
export declare function loadRouteImpacts(impactTime: Date): (dispatch: Function) => void;
export declare function applyImpactsToRoute(startTime: Date, impactData?: RouteImpactDataSegment[], setActive?: boolean): (dispatch: Function, getState: Function) => void;
export declare function removeMarker(coords: number[]): RemoveMarkerAction;
export declare function clearRoutes(): ClearRoutesAction;
export declare function setLineInfo(lineInfo: LineInfoType): SetLineInfoAction;
export declare function addPopup(coords: [number, number], id: string, url: string, type: string): AddPopupAction;
export declare function addDataPoint(coords: [number, number], id: string, data: any): AddDataPointAction;
export declare function removeDataPoint(id: string): RemoveDataPointAction;
export declare function removePopup(id: string): RemovePopupAction;
export declare function hidePopup(id: string): HidePopupAction;
export declare function showPopup(lat: number, lon: number): ShowPopupAction;
export declare function setCurrentLayer(layer: string): SetCurrentLayerAction;
export declare function removeLayer(layer: string): RemoveLayerAction;
export declare function setSelectedRouteTime(date: Date): SetSelectedRouteTimeAction;
export {};
