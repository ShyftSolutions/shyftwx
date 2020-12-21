import _SideMenu from '../components/products/SideMenu';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './../theme';
import { faPercent, faTint, faWind, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';

export default {
    component: _SideMenu,
    title: 'Products',
    decoration: [withKnobs]
};

const label = 'Products';
const options = [
    {
        name: 'Surface',
        open: true,
        products: [
            {
                name: 'Wind and Temperature',
                icon: faWind
            },
            {
                name: 'Relative Humidity',
                icon: faPercent
            }
        ]
    },
    {
        name: '850MB',
        open: false,
        products: [
            {
                name: 'Relative Humidity',
                icon: faTint
            },
            {
                name: 'Precipitation Type',
                icon: faCloudShowersHeavy
            }
        ]
    },
    {
        name: '700MB',
        open: false,
        products: [
            {
                name: 'Wind and Temperature',
                icon: faWind
            }
        ]
    }
];

const models = ['GFS', 'HRRR', 'ECMWF'];

export const SideMenu = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_SideMenu categories={object('Product Categories', options)} options={models} />
        </MuiThemeProvider>
    );
};
