import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import BackButton from './BackButton';
import ForwardButton from './ForwardButton';
import StartStopButton from './StartStopButton';

/**
 * Creates a horizontal grid laying out a back button, play/pause button, and a next button
 *
 * @param onBack function to be called when the back button is clicked
 * @param onNext function to be called when the next button is clicked
 * @param onToggle function to be called when the play/pause button is toggled
 */
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }
}));

export const TimeControl: React.FC<TimeControlProps> = ({ onBack, onNext, onToggle }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container direction="row" alignItems="center" justify="center" xs={12}>
                <Grid item xs>
                    <BackButton action={onBack} />
                </Grid>
                <Grid item xs>
                    <StartStopButton onToggle={onToggle} />
                </Grid>
                <Grid item xs>
                    <ForwardButton action={onNext} />
                </Grid>
            </Grid>
        </div>
    );
};

export default TimeControl;
