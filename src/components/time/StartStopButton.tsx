import React, { useState } from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import useTimer from '../../hooks/useTimer';

/**
 * Uses Material UI FAB and icon to create a toggle-able play/pause button
 * with a timer hook to give the button functionality
 */

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    play: {
        ariaLabel: 'play',
        boxShadow: theme.shadows[3],
        background: theme.palette.primary.dark,
        '&:hover': {
            background: theme.palette.primary.dark
        },
        resize: 'inherit'
    },
    pause: {
        ariaLabel: 'pause',
        boxShadow: theme.shadows[3],
        background: theme.palette.primary.dark,
        '&:hover': {
            background: theme.palette.primary.dark
        },
        resize: 'inherit'
    },
    icon: {
        color: theme.palette.primary.contrastText
    }
}));

/**
 * Creates two buttons (play and pause) using material ui. When the button is clicked,
 * the button switches to the other button. 'useTimer' hook creates a timer to keep track of
 * whether or not the button is playing/paused, and a useEffect calls onToggle for every new tick
 *
 * @param onToggle function to be called when tick changes values
 */
export const StartStopButton: React.FC<TimeActivationButtonProps> = ({ onToggle }) => {
    const classes = useStyles();
    const [tick, isRunning, setIsRunning] = useTimer(600);

    const handleClick = () => {
        if (isRunning) {
            setIsRunning(false);
        } else {
            setIsRunning(true);
        }
    };

    React.useEffect(() => {
        onToggle(isRunning);
    }, [tick]);

    return isRunning ? (
        <Fab onClick={handleClick} className={classes.pause}>
            <PauseIcon className={classes.icon} />
        </Fab>
    ) : (
        <Fab onClick={handleClick} className={classes.play}>
            <PlayArrowIcon className={classes.icon} />
        </Fab>
    );
};

export default StartStopButton;
