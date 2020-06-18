import React from 'react';
import { Grid } from '@material-ui/core';
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
export const TimeControl: React.FC<TimeControlProps> = ({ onBack, onNext, onToggle}) => {
    return (
        <Grid container item>
            <Grid item alignItems="center">
                <BackButton action={onBack} />
                <StartStopButton onToggle={onToggle}/>
                <ForwardButton action={onNext} />
            </Grid>
        </Grid>
    );
};

export default TimeControl;
