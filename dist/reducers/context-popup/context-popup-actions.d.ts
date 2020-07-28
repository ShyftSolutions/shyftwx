export declare const SET_CONTEXT_POPUP = "setContextPopup";
export declare const SET_CONTEXT_COORDS = "setContextCoords";
export declare const SET_CONTEXT_TIME = "setContextSelectedTime";
export declare type SetContextPopupAction = {
    type: typeof SET_CONTEXT_POPUP;
    payload: boolean;
};
export declare type SetContextCoordsAction = {
    type: typeof SET_CONTEXT_COORDS;
    payload: {
        coords: number[];
        mouseCoords: number[];
    };
};
export declare type SetContextSelectedTimeAction = {
    type: typeof SET_CONTEXT_TIME;
    payload: Date;
};
export declare type ContextPopupAction = SetContextCoordsAction | SetContextPopupAction | SetContextSelectedTimeAction;
export declare function setContextPopupOpen(isOpen: boolean): SetContextPopupAction;
export declare function setContextCoords(coords: number[], mouseCoords: number[]): SetContextCoordsAction;
export declare function setContextSelectedTime(time: Date): SetContextSelectedTimeAction;
