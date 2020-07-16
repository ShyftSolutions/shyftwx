import { MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import _TimeSelector from '../components/time/TimeSelector';
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
