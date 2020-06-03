import _TimeControl from 'components/time/TimeControl.jsx';
import _Slider from 'components/time/Slider.jsx'
import { object, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import theme from 'theme.js';

export default {
    title: 'Time',
    decoration: [withKnobs]
};

export const TimeControl = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_TimeControl />
        </MuiThemeProvider>
    );
};

const defaultSliderKnobs = {
    maxValue: 12,
    stepValue: 1,
    marks: [
        {
            value: 0,
            label: '0H',
        },
        {
            value: 1,
            label: '1H',
        },
        {
            value: 2,
            label: '2H',
        },
        {
            value: 3,
            label: '3H',
        },
        {
            value: 4,
            label: '4H',
        },
        {
            value: 5,
            label: '5H',
        },
        {
            value: 6,
            label: '6H',
        },
        {
            value: 7,
            label: '7H',
        },
        {
            value: 8,
            label: '8H',
        },
        {
            value: 9,
            label: '9H',
        },
        {
            value: 10,
            label: '10H',
        },
        {
            value: 11,
            label: '11H',
        },
        {
            value: 12,
            label: '12H',
        }
    ]

};

export const Slider = () => {

    return (
        <MuiThemeProvider theme={theme}>
            <_Slider defaultSettings={object('Settings', defaultSliderKnobs)} />
        </MuiThemeProvider>
    );;
};