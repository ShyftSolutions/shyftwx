import { Dispatch, SetStateAction } from 'react';
/**
 * Creates a timer hook with millisecond time intervals
 *
 * @param interval time (in milliseconds) between each tick
 */
export declare const useTimer: (interval: number) => [number, boolean, Dispatch<SetStateAction<boolean>>];
export default useTimer;
