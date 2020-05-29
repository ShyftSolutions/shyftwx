import React from 'react';
import { makeStyles, Fab } from '@material-ui/core';
import PauseIcon from '@material-ui/icons/Pause';
import red from '@material-ui/core/colors/red';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.common.white,
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[600],
        },
        ariaLabel:"pause",
    },
}));

export const PauseButton = () => {
    const classes = useStyles();

    return (
        <Fab className={classes.root}>
            <PauseIcon />
        </Fab>
    );
};

export default PauseButton;
