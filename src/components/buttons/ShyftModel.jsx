import { Grid, Typography } from '@material-ui/core';
import GroupedButtons from './GroupedButtons';
import React from 'react';

export const ShyftModel = ({ defaultSettings }) => {
    return (
        <Grid item xs={3}>
            {/* Region Grid Container */}
            <Grid container direction="column">
                <Grid item>
                    <Typography variant='h6'>Model</Typography>
                </Grid>
                <Grid item>
                    <GroupedButtons defaultSettings={defaultSettings.modelButtonKnobs}></GroupedButtons>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ShyftModel;