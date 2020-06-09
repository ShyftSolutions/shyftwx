import _ProductSelector from '../components/products/ProductSelector';
import { object, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import theme from 'theme.js';
import { faPercent, faTint, faWind, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';

export default {
    component: _ProductSelector,
    title: 'Products',
    decoration: [withKnobs]
};

const options = [
    {
        name: 'Surface',
        open: true,
        products: [{
            name: 'Wind and Temperature',
            icon: faWind,
        }, {
            name: 'Relative Humidity',
            icon: faPercent,
        }]
    },
    {
        name: '850MB',
        open: false,
        products: [{
            name: 'Relative Humidity',
            icon: faTint,
        },
            {
                name: 'Precipitation Type',
                icon: faCloudShowersHeavy,
            }]
    },
    {
        name: '700MB',
        open: false,
        products: [{
            name: 'Wind and Temperature',
            icon: faWind,
        },]
    }
];

export const ProductSelector = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_ProductSelector options={object('Product Categories', options)}  />
        </MuiThemeProvider>
    );
};


