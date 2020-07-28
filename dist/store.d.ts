declare const store: import("redux").Store<import("redux").CombinedState<{
    contextPopup: import("./reducers/context-popup/context-popup-reducer").ContextPopupState;
    mapReducer: import("./reducers/map/map-reducer").MapState;
    thresholdsReducer: import("./reducers/thresholds/thresholds-reducer").ThresholdsState;
}>, any> & {
    dispatch: unknown;
};
export default store;
