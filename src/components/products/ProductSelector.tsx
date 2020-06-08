import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import ProductMenu from './ProductMenu';

export const ProductSelector = ({ options }) => {
    return (
        <Grid item xs={3}>
            <Grid container direction="column">
                <Grid item>
                    <Typography variant="h6">Products</Typography>
                </Grid>
                <Grid item>
                    <ProductMenu defaultCategories={options} onCategoryClick={() => {}}></ProductMenu>
                </Grid>
            </Grid>
        </Grid>
    );
};
