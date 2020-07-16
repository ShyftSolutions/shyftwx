import _RegionSelector from 'components/regions/RegionSelector.tsx';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './../theme';

export default {
    component: _RegionSelector,
    title: 'Regions',
    decoration: [withKnobs]
};

const defaultOptions = ["TQI Model", "CONUS", "Southeast"]
const label = 'Region';

export const RegionSelector = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_RegionSelector options={object('Button Labels', defaultOptions)} label={text('Label', label)}/>
        </MuiThemeProvider>
    );
};
