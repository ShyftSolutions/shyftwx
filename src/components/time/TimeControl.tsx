import React from 'react';
import { Grid } from '@material-ui/core';
import BackButton from './BackButton';
import ForwardButton from './ForwardButton';
import StartStopButton from './StartStopButton';

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
