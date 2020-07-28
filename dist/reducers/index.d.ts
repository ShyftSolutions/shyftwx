declare const reducers: import("redux").Reducer<import("redux").CombinedState<{
    contextPopup: import("./context-popup/context-popup-reducer").ContextPopupState;
    mapReducer: import("./map/map-reducer").MapState;
    thresholdsReducer: import("./thresholds/thresholds-reducer").ThresholdsState;
}>, any>;
export declare type AppState = ReturnType<typeof reducers>;
export default reducers;
