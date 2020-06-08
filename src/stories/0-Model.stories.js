import _ShyftModel from 'components/models/ShyftModel';
import React from 'react';
import { object, withKnobs } from '@storybook/addon-knobs';
import theme from 'theme.js';
import { MuiThemeProvider } from '@material-ui/core';

export default {
    component: _ShyftModel,
    title: 'Model',
    decorators: [withKnobs]
};

const defaultOptions = ["TQI Model", "GFS", "HRRR"]

export const ShyftModel = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_ShyftModel options={object('Settings', defaultOptions)} />
        </MuiThemeProvider>
    );
};