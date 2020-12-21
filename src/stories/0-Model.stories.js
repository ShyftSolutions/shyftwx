import _ModelSelector from 'components/models/ModelSelector.tsx';
import _ModelTabs from '../components/models/ModelTabs';
import React from 'react';
import { text, object, withKnobs } from '@storybook/addon-knobs';
import theme from './../theme';
import { MuiThemeProvider } from '@material-ui/core';

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

export const ModelTabs = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_ModelTabs  options={['option 1', 'option 2', 'option 3']}/>
        </MuiThemeProvider>
    );
};
