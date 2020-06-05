import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import GroupedButtons from '../buttons/GroupedButtons';


export const RegionSelector = ({defaultSettings}) => {

    return (
        <Grid item xs={3}>
            {/* Region Grid Container */}
            <Grid container direction="column">
                <Grid item>
                    <Typography variant='h6'> Region</Typography>
                </Grid>
                <Grid item>
                    <GroupedButtons defaultSettings={defaultSettings.regionButtonKnobs}></GroupedButtons>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default RegionSelector;