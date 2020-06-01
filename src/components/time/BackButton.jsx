import React from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '35px',
        maxHeight: '30px',
        minWidth: '35px',
        minHeight: '30px',
        variant: 'contained',
        color: theme.palette.common.white,
        backgroundColor: grey[800],
        '&:hover': {
            backgroundColor: grey[900],
        },
        ariaLabel: "back",
    },
}))

export default function BackButton() {
    const classes = useStyles();

    return (
        <Button className={classes.root}>
            <NavigateBeforeIcon />
        </Button>
    );
}