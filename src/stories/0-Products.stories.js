import _ProductsMenu from 'components/products/ProductMenu';
import { object, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

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

    return <_ProductsMenu defaultCategories={object('Product Categories', defaultCategories)}/>;
};


