import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import GroupedButtons from '../buttons/GroupedButtons.tsx';

/**
 * Creates a Material UI Grid Item for the Region button group
 * 
 * @param {Array[String]} options 
 */
export const RegionSelector = ({ options }) => {
    return (
        <Grid item xs={3}>
            {/* Region Grid Container */}
            <Grid container direction="column">
                <Grid item>
                    <Typography variant='h6'>Region</Typography>
                </Grid>
                <Grid item>
                    <GroupedButtons options={options}></GroupedButtons>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default RegionSelector;