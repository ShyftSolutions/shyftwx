import _ProductsMenu from 'components/products/ProductMenu';
import _ProductGroup from 'components/products/ProductGroup';
import { array, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

export default {
    title: 'Products',
    decoration: [withKnobs]
};

export const ProductMenu = () => {

    const cats = array('Categories', ["Surface",
        "850MB",
        "700MB",
    ]);

    return <_ProductsMenu categories={cats} />

};
