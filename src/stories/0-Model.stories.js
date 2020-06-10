import _ShyftModel from 'components/models/ShyftModel.tsx';
import React from 'react';
import { text, object, withKnobs } from '@storybook/addon-knobs';
import theme from 'theme.js';
import { MuiThemeProvider } from '@material-ui/core';

export default {
    component: _ShyftModel,
    title: 'Model',
    decorators: [withKnobs]
};

const defaultOptions = ["TQI Model", "GFS", "HRRR"];
const label = 'Model';

export const ShyftModel = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_ShyftModel options={object('Settings', defaultOptions)} label={text('Label', label)}/>
        </MuiThemeProvider>
    );
};