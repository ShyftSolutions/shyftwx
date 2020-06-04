import React from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

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
        ariaLabel: "back",
    },
    icon: {
        color: theme.palette.primary.contrastText
    }
}))

export default function BackButton() {
    const classes = useStyles();

    return (
        <Button className={classes.root}>
            <NavigateBeforeIcon className={classes.icon}/>
        </Button>
    );
}