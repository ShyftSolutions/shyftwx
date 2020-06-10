import { Grid, Typography } from '@material-ui/core';

import ProductMenu from './ProductMenu';
import React from 'react';

export const ProductSelector: React.FC<ProductSelectorProps> = ({ categories, label = 'Products', action }) => {
    return (
        <Grid container direction="column">
            <Grid item>
                <Typography variant="h6">{label}</Typography>
            </Grid>
            <Grid item>
                <ProductMenu options={categories} action={action} />
            </Grid>
        </Grid>
    );
};

export default ProductSelector;
