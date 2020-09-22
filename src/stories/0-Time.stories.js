import _TimeControl from 'components/time/TimeControl.tsx';
import _Slider from 'components/time/Slider.tsx';
import { object, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './../theme';

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

const defaultSettings = [
    {
        value: 0,
        label: '0H'
    },
    {
        value: 1,
        label: '1H'
    },
    {
        value: 2,
        label: '2H'
    },
    {
        value: 3,
        label: '3H'
    },
    {
        value: 4,
        label: '4H'
    },
    {
        value: 5,
        label: '5H'
    },
    {
        value: 6,
        label: '6H'
    },
    {
        value: 7,
        label: '7H'
    },
    {
        value: 8,
        label: '8H'
    },
    {
        value: 9,
        label: '9H'
    },
    {
        value: 10,
        label: '10H'
    },
    {
        value: 11,
        label: '11H'
    },
    {
        value: 12,
        label: '12H'
    },
    {
        value: 13,
        label: '13H'
    },
    {
        value: 14,
        label: '14H'
    },
    {
        value: 15,
        label: '15H'
    },
    {
        value: 16,
        label: '16H'
    },
    {
        value: 17,
        label: '17H'
    },
    {
        value: 18,
        label: '18H'
    },
    {
        value: 19,
        label: '19H'
    },
    {
        value: 20,
        label: '20H'
    },
    {
        value: 21,
        label: '21H'
    },
    {
        value: 22,
        label: '22H'
    },
    {
        value: 23,
        label: '23H'
    },
    {
        value: 24,
        label: '24H'
    }
];

export const Slider = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_Slider options={object('Settings', defaultSettings)} />
        </MuiThemeProvider>
    );
};
