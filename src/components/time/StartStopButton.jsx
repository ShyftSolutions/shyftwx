import React, { useState } from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const useStyles = makeStyles((theme) => ({
    play: {
        label: 'play',
        background: theme.palette.primary.lightText,
        '&:hover': {
            background: theme.palette.primary.lightText,
        }
    },
    pause: {
        label: 'pause',
        background: theme.palette.primary.lightText,
        '&:hover': {
            background: theme.palette.primary.contrastText,
        }
    },
    icon: {
        color: theme.palette.secondary.contrastText
    }
}));

export const StartStopButton = () => {
    const classes = useStyles();
    const [playing, setPlaying] = useState(false);

    const handleClick = () => {
        if (playing) {
            setPlaying(false);
        } else {
            setPlaying(true);
        }
    };

    return (
        playing ?
            <Fab onClick={ handleClick } className={classes.pause}>
                <PauseIcon className={classes.icon}/>
            </Fab> :
            <Fab onClick={ handleClick } className={classes.play}>
                <PlayArrowIcon className={classes.icon}/>
            </Fab>
    );
};

export default StartStopButton;
