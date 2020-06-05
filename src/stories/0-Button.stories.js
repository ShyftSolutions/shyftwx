import _ShyftModel from 'components/models/ShyftModel';
import React from 'react';
import { object, withKnobs } from '@storybook/addon-knobs';
import theme from 'theme.js';
import { MuiThemeProvider } from '@material-ui/core';

export default {
    component: _ShyftModel,
    title: 'Buttons',
    decorators: [withKnobs]
};

const modelButtonKnobs ={
    label: "Model",
    buttonLabels: [
    {
        name: "TQI Model"
    },
    {
        name: "GFS"
    },
    {
        name: "HRRR"
    }
]};

export const ShyftModel = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_ShyftModel defaultSettings={object('Settings', modelButtonKnobs)} />
        </MuiThemeProvider>
    );
};