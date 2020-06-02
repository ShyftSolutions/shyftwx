import _ProductsMenu from 'components/products/ProductMenu';
import { array, object, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

export default {
    component: _ProductsMenu,
    title: 'Products',
    decoration: [withKnobs]
};

const defaultCategories = [
    {
        name: 'Surface',
        open: false
    },
    {
        name: '850MB',
        open: false
    },
    {
        name: '700MB',
        open: false
    }
];

export const ProductsMenu = () => {
    return <_ProductsMenu defaultCategories={object('Product Categories', defaultCategories)}/>;
};


