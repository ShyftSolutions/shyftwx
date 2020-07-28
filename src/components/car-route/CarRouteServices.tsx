import React from 'react';
import WelcomePage from './WelcomePage';
import RouteInput from './RouteInput';
import WeatherInput from './WeatherInput';

export const CarRouteServices = () => {
    const [state, setState] = React.useState('initial');
    const [startingPoint, setStartingPoint] = React.useState('');
    const [destination, setDestination] = React.useState('');
    const [time, setTime] = React.useState();

    const onStartButton = () => {
        setState('route');
    };

    const onStartingPointChange = (input: string) => {
        setStartingPoint(input);
    };

    const onDestinationChange = (input: string) => {
        setDestination(input);
    };

    const onNextButton = () => {
        if (startingPoint === '' || destination === '') {
            // add some error message
        } else {
            setState('weather');
        }
    };

    const onBackButton = () => {
        setState('route');
    };

    const generateContent = () => {
        switch (state) {
            case 'route':
                return (
                    <RouteInput
                        onClick={onNextButton}
                        onDestinationChange={onDestinationChange}
                        onStartPointChange={onStartingPointChange}
                    />
                );
            case 'weather':
                return <WeatherInput onClick={onBackButton}/>;
            default:
                return <WelcomePage action={onStartButton} />;
        }
    };

    return generateContent();
};

export default CarRouteServices;
