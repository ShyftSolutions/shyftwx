import { ThresholdActions } from './thresholds-actions';
export declare type ThresholdsState = {
    thresholds: Record<string, {
        greaterThan: boolean;
        values: [number, number];
    }>;
};
export declare const ThresholdsReducer: (state: ThresholdsState | undefined, action: ThresholdActions) => ThresholdsState;
export default ThresholdsReducer;
