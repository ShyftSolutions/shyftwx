import React from 'react';
import WelcomePage from './WelcomePage';
import RouteInput from './RouteInput';
import WeatherInput from './WeatherInput';
import 'leaflet/dist/leaflet.css';
import InputDrawer from './InputDrawer';
import { Feature } from 'geojson';

export const CarRouteServices = () => {
    const [state, setState] = React.useState('initial');
    const [startingPoint, setStartingPoint] = React.useState<Feature>();
    const [destination, setDestination] = React.useState<Feature>();
    const [time, setTime] = React.useState<Date | undefined>(new Date());
    const [windThresholds, setWindThresholds] = React.useState<number[]>([]);
    const [precipThresholds, setPrecipThresholds] = React.useState<number[]>([]);
    const [tempThresholds, setTempThresholds] = React.useState<number[]>([]);
    const [directions, setDirections] = React.useState();

    // Welcome Page Functions
    const onStartButton = () => {
        setState('route');
    };

    // Route Input Functions
    const onStartingPointChange = (input: Feature) => {
        setStartingPoint(input);
    };

    const onDestinationChange = (input: Feature) => {
        setDestination(input);
    };

    const onTimeChange = (time: Date) => {
        setTime(time);
    };

    const onNextButton = () => {
        if (startingPoint === undefined || destination === undefined) {
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

    const onStartButtonClick = () => {
        // set thresholds

        setState('map');

        // set loading

        // call weather services
        // transform data
        // pass down to map
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
                    />
                );
            case 'weather':
                return (
                    <WeatherInput
                        onClick={onBackButton}
                        onPrecipSliderChange={precipValuesChange}
                        onTempSliderChange={tempValuesChange}
                        onWindSliderChange={windValuesChange}
                        onStart={onStartButtonClick}
                    />
                );
            case 'map':
                return (
                    <InputDrawer
                        startingPoint={startingPoint}
                        destination={destination}
                        precipParam={precipThresholds}
                        tempParam={tempThresholds}
                        time={time}
                        windParam={windThresholds}
                    />
                );
            default:
                return <WelcomePage action={onStartButton} />;
        }
    };

    return generateContent();
};

export default CarRouteServices;
