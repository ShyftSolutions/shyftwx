export declare const SET_THRESHOLD = "setThreshold";
declare type SetThresholdAction = {
    type: typeof SET_THRESHOLD;
    payload: {
        name: string;
        threshold: any;
    };
};
export declare type ThresholdActions = SetThresholdAction;
export declare const setThreshold: (name: string, threshold: any) => SetThresholdAction;
export {};
