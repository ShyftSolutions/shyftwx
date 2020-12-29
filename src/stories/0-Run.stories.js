import { MuiThemeProvider } from '@material-ui/core';
import { object, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import _RunSelector from '../components/run/RunsSelector';
import theme from '../theme';

export default {
    component: _RunSelector,
    title: 'Run',
    decorators: [withKnobs]
};
const defaultOptions = [1594307790, 1594307710, 1594306640, 15943012234];

const onRunSelect = (buttonText) => {
    console.log(buttonText);
};

export const RunDropdown = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_RunSelector options={object('Select Options', defaultOptions)} action={onRunSelect} />
        </MuiThemeProvider>
    );
};

export const RunButtonGroup = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_RunSelector options={[1594307790]} action={onRunSelect} />
        </MuiThemeProvider>
    );
};
