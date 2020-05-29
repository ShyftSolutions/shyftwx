import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ProductGroup from './ProductGroup';
import List from '@material-ui/core/List';

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

export default function MenuListComposition({ categories }) {
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