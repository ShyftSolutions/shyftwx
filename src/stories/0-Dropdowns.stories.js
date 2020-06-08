import _SimpleSelect from 'components/dropdown/SimpleSelect';
import { object, withKnobs } from '@storybook/addon-knobs/react';
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import theme from 'theme.js';

export default {
    component: _SimpleSelect,
    title: 'Dropdowns',
    decorators: [withKnobs]
};

const defaultOptions = ["2020-05-27T 02:00:00Z", "2020-05-27T 06:00:00Z", "2020-05-27T 11:00:00Z", "2020-05-27T 12:00:00Z"];

export const SimpleSelect = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_SimpleSelect options={object('Select Options', defaultOptions)} />
        </MuiThemeProvider>
    );
};

