import React from 'react';

/**
 * Creates a timer hook with millisecond time intervals
 *
 * @param interval time (in milliseconds) between each tick
 */
export const useTimer = (interval: number): [number, boolean, Function] => {
    const [ticks, setTicks] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false);

    React.useEffect(() => {
        if (isRunning) {
            const timerId = window.setTimeout(() => {
                setTicks(ticks + 1);
            }, interval);
            return (): void => window.clearTimeout(timerId);
        }
    }, [ticks, isRunning]);

    return [ticks, isRunning, setIsRunning];
};

export default useTimer;
