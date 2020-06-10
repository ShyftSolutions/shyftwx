import _RunDropdown from '../components/runs/RunDropdown';
import { object, withKnobs } from '@storybook/addon-knobs/react';
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import theme from 'theme.js';

export default {
    component: _RunDropdown,
    title: 'Dropdowns',
    decorators: [withKnobs]
};

const defaultOptions = ["2020-05-27T 02:00:00Z", "2020-05-27T 06:00:00Z", "2020-05-27T 11:00:00Z", "2020-05-27T 12:00:00Z"];

export const RunDropdown = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_RunDropdown options={object('Select Options', defaultOptions)} label={'Model Run'} />
        </MuiThemeProvider>
    );
};

