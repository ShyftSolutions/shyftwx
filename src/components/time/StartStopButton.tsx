import React, { useState } from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const useStyles = makeStyles((theme) => ({
    play: {
        label: 'play',
        boxShadow: theme.shadows[3],
        background: theme.palette.secondary.dark,
        '&:hover': {
            background: theme.palette.secondary.dark,
        },
    },
    pause: {
        label: 'pause',
        boxShadow: theme.shadows[3],
        background: theme.palette.secondary.dark,
        '&:hover': {
            background: theme.palette.secondary.dark,
        },
    },
    icon: {
        color: theme.palette.primary.contrastText
    }
}));

export const StartStopButton: React.FC<TimeActivationButtonProps> = ({onStart, onStop}) => {
    const classes = useStyles();
    const [playing, setPlaying] = useState(false);

    const handleClick = () => {
        if (playing) {
            setPlaying(false);
            onStart();
        } else {
            setPlaying(true);
            onStop();
        }
    };

    return (
        playing ?
            <Fab onClick={ handleClick } className={classes.pause} >
                <PauseIcon className={classes.icon}/>
            </Fab> :
            <Fab onClick={ handleClick } className={classes.play} >
                <PlayArrowIcon className={classes.icon}/>
            </Fab>
    );
};

export default StartStopButton;
