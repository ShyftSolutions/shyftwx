import { MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import _TimeSelector from '../components/time/TimeSelector';
import _BasicButton from '../components/buttons/BasicButton';
import _BasicSwitch from '../components/switch/BasicSwitch';
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
