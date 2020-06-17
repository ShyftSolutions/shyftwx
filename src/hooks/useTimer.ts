import React from 'react';

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
        return;
    }, [ticks, isRunning]);
    return [ticks, isRunning, setIsRunning];
};
export default useTimer;