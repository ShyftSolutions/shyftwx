import { MuiThemeProvider } from '@material-ui/core';
import theme from '../theme';
import _VerticalSlider from '../components/levels/VerticalSlider';
import { object, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

export default {
    title: 'Elevation',
    decoration: [withKnobs]
};

const defaultSettings = [
    {
        value: 0,
        label: 'Surface'
    },
    {
        value: 1,
        label: '100m 330 ft'
    },
    {
        value: 2,
        label: '400hPa'
    },
    {
        value: 3,
        label: '500hPa'
    },
    {
        value: 4,
        label: '600hPa'
    },
    {
        value: 5,
        label: '700hPa'
    },
    {
        value: 6,
        label: '800hPa'
    },
    {
        value: 7,
        label: '850hPa'
    },
    {
        value: 8,
        label: '900hPa'
    },
    {
        value: 9,
        label: '925hPa'
    },
    {
        value: 10,
        label: '950hPa'
    }
];

export const VerticalSlider = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_VerticalSlider options={object('Settings', defaultSettings)} orientation="vertical" />
        </MuiThemeProvider>
    );
};
