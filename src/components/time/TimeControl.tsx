import React from 'react';
import { Grid } from '@material-ui/core';
import BackButton from './BackButton';
import ForwardButton from './ForwardButton';
import StartStopButton from './StartStopButton';


export const TimeControl: React.FC<TimeControlProps> = ({onBack, onNext, onPlay, onPause}) => {

    return (
        <Grid
              container
              direction="row"
              alignItems="center"
              spacing={1} >
            <Grid item>
                <BackButton action={onBack}/>
            </Grid>
            <Grid item>
                <StartStopButton onStart={onPlay} onStop={onPause}/>
            </Grid>
            <Grid item>
                <ForwardButton action={onNext}/>
            </Grid>
        </Grid>
    );
}

export default TimeControl;
