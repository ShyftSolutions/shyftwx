import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '35px',
        maxHeight: '30px',
        minWidth: '35px',
        minHeight: '30px',
        variant: 'contained',
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.primary.dark,
        boxShadow: theme.shadows[3],
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
        ariaLabel: "forward",

    },
    icon: {
        color: theme.palette.secondary.contrastText,
    }
}))

export default function ForwardButton() {
    const classes = useStyles();

    return (
        <Button className={classes.root} >
            <NavigateNextIcon className={classes.icon}/>
        </Button>
    );
}