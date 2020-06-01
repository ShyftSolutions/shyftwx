import React, { useState } from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const useStyles = makeStyles((theme) => ({
    play: {
        label: 'play',
    },
    pause: {
        label: 'pause'
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
                <PauseIcon/>
            </Fab> :
            <Fab onClick={ handleClick } className={classes.play}>
                <PlayArrowIcon />
            </Fab>
    );
};

export default StartStopButton;
