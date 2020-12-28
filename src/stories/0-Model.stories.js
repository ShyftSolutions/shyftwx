import { MuiThemeProvider } from '@material-ui/core';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import _ModelSelector from 'components/models/ModelSelector.tsx';
import React from 'react';
import theme from './../theme';

export default {
    component: _ModelSelector,
    title: 'Model',
    decorators: [withKnobs]
};

const defaultOptions = ['TQI Model', 'GFS', 'HRRR'];
const label = 'Model';

export const ShyftModel = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_ModelSelector options={object('Settings', defaultOptions)} label={text('Label', label)} />
        </MuiThemeProvider>
    );
};
