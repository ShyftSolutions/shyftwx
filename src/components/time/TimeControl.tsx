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
    },
    offset: {
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    }
}));

export const TimeControl: React.FC<TimeControlProps> = ({ onBack, onNext, onToggle }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container item direction="row" alignItems="center" justify="center" wrap="nowrap">
                {/* add space to center time control when screen is small */}
                <Grid item xs className={classes.offset} />

                <Grid item xs={3}>
                    <BackButton action={onBack} />
                </Grid>
                <Grid item container xs justify="center">
                    <StartStopButton onToggle={onToggle} />
                </Grid>
                <Grid item xs={3}>
                    <ForwardButton action={onNext} />
                </Grid>

                {/* add space to the right of the component */}
                <Grid item xs />
            </Grid>
        </div>
    );
};

export default TimeControl;
