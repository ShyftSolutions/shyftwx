import _ProductMenu from 'components/products/ProductMenu';
import { object, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import theme from 'theme.js';
import { faPercent, faTint, faWind, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';

export default {
    component: _ProductMenu,
    title: 'Products',
    decoration: [withKnobs]
};

const defaultCategories = [
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

export const ProductMenu = () => {

    return (
        <MuiThemeProvider theme={theme}>
            <_ProductMenu defaultCategories={object('Product Categories', defaultCategories)} />
        </MuiThemeProvider>
    );
};


