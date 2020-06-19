/**
 * Creates a timer hook with millisecond time intervals
 *
 * @param interval time (in milliseconds) between each tick
 */
export declare const useTimer: (interval: number) => [number, boolean, Function];
export default useTimer;
