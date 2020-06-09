import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import ProductMenu from './ProductMenu';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Category {
    name: string,
    open: boolean,
    products: Product[]
}

interface Product {
    name: string,
    icon: IconProp,
}

export const ProductSelector = (Props: {options: Category[] } ) => {
    const { options } = Props;

    return (
        <Grid item xs={3}>
            <Grid container direction="column">
                <Grid item>
                    <Typography variant="h6">Products</Typography>
                </Grid>
                <Grid item>
                    <ProductMenu options={options} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductSelector;
