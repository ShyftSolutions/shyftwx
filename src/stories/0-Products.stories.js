import _ProductsMenu from 'components/products/ProductMenu';
import { object, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import theme from 'theme.js';

export default {
    component: _ProductsMenu,
    title: 'Products',
    decoration: [withKnobs]
};

const defaultCategories = [
    {
        name: 'Surface',
        open: true,
        products: ['Wind and Temperature', 'Relative Humidity'],
    },
    {
        name: '850MB',
        open: false,
        products: ['Relative Humidity'],
    },
    {
        name: '700MB',
        open: false,
        products: ['Wind and Temperature'],
    }
];

export const ProductsMenu = () => {

    return (
        <MuiThemeProvider theme={theme}>
            <_ProductsMenu defaultCategories={object('Product Categories', defaultCategories)} />
        </MuiThemeProvider>
    );
};


