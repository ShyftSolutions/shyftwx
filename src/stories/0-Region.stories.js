import _RegionSelector from 'components/regions/RegionSelector';
import { object, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import theme from 'theme.js';

export default {
    component: _RegionSelector,
    title: 'Regions',
    decoration: [withKnobs]
};

const defaultOptions = {
    regionButtonKnobs: [
        {
            name: "TQI Model"
        },
        {
            name: "CONUS"
        },
        {
            name: "Southeast"
        }
    ],
}

export const RegionSelector = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_RegionSelector defaultSettings={object('Button Labels', defaultOptions)} />
        </MuiThemeProvider>
    )
};