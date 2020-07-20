import { MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import _TimeSelector from '../components/time/TimeSelector';
import _BasicButton from '../components/buttons/BasicButton';
import _BasicSwitch from '../components/switch/BasicSwitch';
import _BasicCheckbox from '../components/checkbox/BasicCheckbox';
import _WelcomePage from '../components/landingpage/WelcomePage';
// import _ThresholdSlider from '../components/slider/ThresholdSlider';
import theme from './../theme';
import { withKnobs } from '@storybook/addon-knobs';

export default {
    title: 'CarImpact',
    decoration: [withKnobs]
};

export const TimeSelector = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_TimeSelector />
        </MuiThemeProvider>
    );
};

export const BasicButton = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_BasicButton style="gradient" text="start" />
            <_BasicButton style="blue" text="start" />
            <_BasicButton style="disabled" text="start" />
            <_BasicButton style="disabledGradient" text="start" />
        </MuiThemeProvider>
    );
};

export const BasicSwitch = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_BasicSwitch />
        </MuiThemeProvider>
    );
};

export const BasicCheckbox = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_BasicCheckbox />
        </MuiThemeProvider>
    );
};

/*
export const ThresholdSlider = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_ThresholdSlider
                key="wind"
                min={0}
                max={40}
                values={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40]}
                units="kt"
            />
        </MuiThemeProvider>
    );
};
*/

export const WelcomePage = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_WelcomePage />
        </MuiThemeProvider>
    );
};
