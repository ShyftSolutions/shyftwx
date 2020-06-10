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

export const ProductSelector = (Props: { options: Category[], action: Function , label: string}) => {
    const { options } = Props;
    const { action } = Props;
    const { label } = Props;

    return (
        <Grid container direction="column">
            <Grid item>
                <Typography variant="h6">{label}</Typography>
            </Grid>
            <Grid item>
                <ProductMenu options={options} action={action}/>
            </Grid>
        </Grid>
    );
};

export default ProductSelector;
