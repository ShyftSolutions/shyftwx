import React, { useState } from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import useTimer from '../../hooks/useTimer';

const useStyles = makeStyles((theme) => ({
    play: {
        label: 'play',
        boxShadow: theme.shadows[3],
        background: theme.palette.secondary.dark,
        '&:hover': {
            background: theme.palette.secondary.dark,
        },
        resize: 'inherit',
        maxWidth: '45%',
        margin: 5
    },
    pause: {
        label: 'pause',
        boxShadow: theme.shadows[3],
        background: theme.palette.secondary.dark,
        '&:hover': {
            background: theme.palette.secondary.dark,
        },
        resize: 'inherit',
        maxWidth: '45%',
        margin: 5
    },
    icon: {
        color: theme.palette.primary.contrastText
    }
}));

export const StartStopButton: React.FC<TimeActivationButtonProps> = ({ onStart, onStop }) => {
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
        onStart(setIsRunning, isRunning);
    }, [tick])

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
