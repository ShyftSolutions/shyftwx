import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import SkipNextIcon from '@material-ui/icons/SkipNext';
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
        ariaLabel: "forward",
    },
}))

export default function ForwardButton() {
    const classes = useStyles();

    return (
        <Button className={classes.root} >
            <SkipNextIcon />
        </Button>
    );
}