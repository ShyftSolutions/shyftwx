import React from 'react';
import WelcomePage from './WelcomePage';
import RouteInput from './RouteInput';
import WeatherInput from './WeatherInput';
import 'leaflet/dist/leaflet.css';

export const CarRouteServices = () => {
    const [state, setState] = React.useState('initial');
    const [startingPoint, setStartingPoint] = React.useState('');
    const [destination, setDestination] = React.useState('');
    const [time, setTime] = React.useState<Date | null>(new Date());
    const [windThresholds, setWindThresholds] = React.useState<number[]>([]);
    const [precipThresholds, setPrecipThresholds] = React.useState<number[]>([]);
    const [tempThresholds, setTempThresholds] = React.useState<number[]>([]);

    // Welcome Page Functions
    const onStartButton = () => {
        setState('route');
    };

    // Route Input Functions
    const onStartingPointChange = (input: string) => {
        setStartingPoint(input);
    };

    const onDestinationChange = (input: string) => {
        setDestination(input);
    };

    const onTimeChange = (time: Date) => {
        setTime(time);
    };

    const onNextButton = () => {
        if (startingPoint === '' || destination === '') {
            // TODO: add some error message
        } else {
            setState('weather');
        }
    };

    // Weather Input Functions
    const onBackButton = () => {
        setState('route');
    };

    const precipValuesChange = (input: number[]) => {
        setPrecipThresholds(input);
    };

    const tempValuesChange = (input: number[]) => {
        setTempThresholds(input);
    };

    const windValuesChange = (input: number[]) => {
        setWindThresholds(input);
    };

    const generateContent = () => {
        switch (state) {
            case 'route':
                return (
                    <RouteInput
                        onClick={onNextButton}
                        onDestinationChange={onDestinationChange}
                        onStartPointChange={onStartingPointChange}
                        onTimeChange={onTimeChange}
                        startPoint={startingPoint}
                        destination={destination}
                    />
                );
            case 'weather':
                return (
                    <WeatherInput
                        onClick={onBackButton}
                        onPrecipSliderChange={precipValuesChange}
                        onTempSliderChange={tempValuesChange}
                        onWindSliderChange={windValuesChange}
                    />
                );
            default:
                return <WelcomePage action={onStartButton} />;
        }
    };

    return generateContent();
};

export default CarRouteServices;
