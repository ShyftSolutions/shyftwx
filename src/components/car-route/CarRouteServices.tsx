import React from 'react';
import WelcomePage from './WelcomePage';
import RouteInput from './RouteInput';
import WeatherInput from './WeatherInput';
import 'leaflet/dist/leaflet.css';
import InputDrawer from './InputDrawer';
import { Feature } from 'geojson';
import { carRouteAsync, directionsAsync } from '../../apis';
import { transformWeatherData } from '../../utils/weatherDataFormatter';

export const CarRouteServices = () => {
    const [state, setState] = React.useState('initial');
    const [startingPoint, setStartingPoint] = React.useState<Feature>();
    const [destination, setDestination] = React.useState<Feature>();
    const [time, setTime] = React.useState<Date | undefined>(new Date());
    const [windThresholds, setWindThresholds] = React.useState<Threshold>({greaterThan: true, threshold: [5, 10]});
    const [precipThresholds, setPrecipThresholds] = React.useState<Threshold>({greaterThan: true, threshold: [1, 2]});
    const [tempThresholds, setTempThresholds] = React.useState<Threshold>({greaterThan: true, threshold: [32, 70]});
    const [directions, setDirections] = React.useState<any>();
    const [weatherData, setWeatherData] = React.useState<any>();

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

    const onStartButtonClick = () => {
        // set thresholds
      const thresholds = {
        'Temperature': {
          greaterThan: tempThresholds.greaterThan,
          threshold: tempThresholds.threshold
        },
        'WindSpeed': {
          greaterThan: windThresholds.greaterThan,
          threshold: windThresholds.threshold
        },
        'TotalPrecipitationRate': {
          greaterThan: precipThresholds.greaterThan,
          threshold: precipThresholds.threshold
        }
      }

        // set loading

        // call weather services
        carRouteAsync(directions, time).then((data) => { 
            console.log(data);
            setWeatherData(transformWeatherData(data, thresholds)); 

            // pass down to map
            setState('map');
        });

    };

    const generateContent = () => {
        switch (state) {
            case 'route':
                return (
                    <RouteInput
                        destination={destination}
                        onClick={onNextButton}
                        onDestinationChange={onDestinationChange}
                        onStartPointChange={onStartingPointChange}
                        onTimeChange={onTimeChange}
                        startPoint={startingPoint}
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
                        carRouteData={weatherData}
                    />
                );
            default:
                return <WelcomePage action={onStartButton} />;
        }
    };

    return generateContent();
};

export default CarRouteServices;


// implement isGreaterThan = false
// loading indicator
// random warnings in the console (ex. key prop in slider)
// updating thresholds after loading the first bit (may require some data input changes to the Route component and to the formatter util)
// need to load multiple leaving times???