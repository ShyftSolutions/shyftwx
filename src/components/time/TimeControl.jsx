import React from 'react';
import { Grid } from '@material-ui/core';
import BackButton from './BackButton';
import ForwardButton from './ForwardButton';
import StartStopButton from './StartStopButton';

export default function TimeControl() {
    return (
        <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={1}>
            <Grid item>
                <BackButton/>
            </Grid>
            <Grid item>
                <StartStopButton/>
            </Grid>
            <Grid item>
                <ForwardButton/>
            </Grid>
        </Grid>
    );
}