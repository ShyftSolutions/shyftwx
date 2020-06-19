import { Grid, Typography } from '@material-ui/core';
import ProductMenu from './ProductMenu';
import React from 'react';

/**
 * Creates a product menu component with a label and a collapsable menu (ProductMenu)
 *
 * @param categories an object containing the names of the categories, their open state, and their products
 * @param label the label for this component
 * @param action to be completed upon a product being selected
 */
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
