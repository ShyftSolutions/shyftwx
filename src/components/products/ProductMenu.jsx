import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, List } from '@material-ui/core';
import ProductGroup from './ProductGroup';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginRight: theme.spacing(2)
    },
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
}));

export default function ProductMenu({ categories }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <List>
                    {categories.map(cat => (
                        <ProductGroup category={cat} />
                        ))}
                </List>
            </Paper>
        </div>
    );
}