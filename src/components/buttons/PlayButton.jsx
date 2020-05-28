import React from 'react';
import { makeStyles, Fab } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.common.white,
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[600],
        },
        ariaLabel:"play",
    },
}));

export const PlayButton = () => {
    const classes = useStyles();

    return (
        <Fab className={classes.root}>
            <PlayArrowIcon />
        </Fab>
    );
};

export default PlayButton;
