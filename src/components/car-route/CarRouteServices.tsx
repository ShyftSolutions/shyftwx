import React from 'react';
import WelcomePage from './WelcomePage';
import RouteInput from './RouteInput';
import WeatherInput from './WeatherInput';
import 'leaflet/dist/leaflet.css';
import InputDrawer from './InputDrawer';
import { Feature } from 'geojson';
import { carRouteAsync } from '../../apis';
import { transformWeatherData } from '../../utils/weatherDataFormatter';
import { CircularProgress, Grid } from '@material-ui/core';
import { Units } from './../../utils/Units';

export const CarRouteServices = () => {
    const [state, setState] = React.useState('initial');
    const [startingPoint, setStartingPoint] = React.useState<Feature>();
    const [destination, setDestination] = React.useState<Feature>();
    const [time, setTime] = React.useState<Date>(new Date());
    const [windThresholds, setWindThresholds] = React.useState<Threshold>({ greaterThan: true, threshold: [], unit: Units.MPH });
    const [precipThresholds, setPrecipThresholds] = React.useState<Threshold>({ greaterThan: true, threshold: [], unit: Units.IN_HR });
    const [tempThresholds, setTempThresholds] = React.useState<Threshold>({ greaterThan: true, threshold: [], unit: Units.F });
    const [directions, setDirections] = React.useState<any>();
    const [possibleTrips, setPossibleTrips] = React.useState<any>();
    const [loading, setLoading] = React.useState(false);

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

    const onNextButton = (data: any) => {
        setDirections(data);
        setState('weather');
    };

    // Weather Input Functions
    const onBackButton = () => {
        setState('route');
    };

    const precipValuesChange = (input: Threshold) => {
        setPrecipThresholds(input);
    };

    const tempValuesChange = (input: Threshold) => {
        setTempThresholds(input);
    };

    const windValuesChange = (input: Threshold) => {
        setWindThresholds(input);
    };

    const onStartButtonClick = async () => {
        // set loading
        setLoading(true);

        const possibleTrips: any = [];

        const promises: any = [];

        const NUM_OF_FORECASTS = 5;

        for (let i = 0; i < NUM_OF_FORECASTS; i++) {
            const tempStartTime = new Date(time.getTime() + i * 60 * 60000);

            promises.push(
                carRouteAsync(directions, tempStartTime).then((data) => {
                    const transformedData = transformWeatherData(data);

                    possibleTrips.push({ startTime: tempStartTime.toISOString(), tripData: transformedData });
                })
            );
        }

        await Promise.all(promises);

        // sort the routes based on start time
        possibleTrips.sort((x, y) => new Date(x.startTime).getTime() - new Date(y.startTime).getTime());

        setPossibleTrips(possibleTrips);
        setLoading(false);
        setState('map');
    };

    const generateContent = () => {
        if (loading) {
            return (
                <Grid container justify="center">
                    <CircularProgress />
                </Grid>
            );
        }

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
                        onPrecipSliderChange={precipValuesChange}
                        onTempSliderChange={tempValuesChange}
                        onWindSliderChange={windValuesChange}
                        possibleTrips={possibleTrips}
                    />
                );
            default:
                return <WelcomePage action={onStartButton} />;
        }
    };

    return generateContent();
};

export default CarRouteServices;

// implement isGreaterThan = false -MAYBE DONE
// loading indicator -DONE
// random warnings in the console (ex. key prop in slider) -FIXED SOME??
// updating thresholds after loading the first bit (may require some data input changes to the Route component and to the formatter util)
// need to load multiple leaving times???
