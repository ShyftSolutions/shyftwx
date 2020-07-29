import { MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import _WelcomePage from '../components/car-route/WelcomePage';
import _RouteInput from '../components/car-route/RouteInput';
import _WeatherInput from '../components/car-route/WeatherInput';
import _SearchField from '../components/textfield/SearchField';
import _ThresholdInput from '../components/car-route/ThresholdInput';
import _CarRouteServices from '../components/car-route/CarRouteServices';
import _MapBackground from '../components/car-route/MapBackground';
import theme from './../theme';
import { withKnobs } from '@storybook/addon-knobs';

export default {
    title: 'CarImpact',
    decoration: [withKnobs]
};

export const WelcomePage = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_WelcomePage />
        </MuiThemeProvider>
    );
};

export const RouteInput = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_RouteInput />
        </MuiThemeProvider>
    );
};

export const WeatherInput = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_WeatherInput />
        </MuiThemeProvider>
    );
};

export const SearchField = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_SearchField />
        </MuiThemeProvider>
    );
};

export const ThresholdInput = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_ThresholdInput impact="wind" />
        </MuiThemeProvider>
    );
};

export const CarRouteServices = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_CarRouteServices />
        </MuiThemeProvider>
    );
};

export const MapBackground = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_MapBackground />
        </MuiThemeProvider>
    );
};
