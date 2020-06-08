import { Grid, Typography } from '@material-ui/core';
import GroupedButtons from '../buttons/GroupedButtons';
import React from 'react';

/**
 * Creates a Material UI Grid Item for a Model and its button group
 * 
 * @param {Array[String]} options
 */
export const ShyftModel = ({ options }) => {
    console.log(options);
    return (
        <Grid item xs={3}>
            {/* Region Grid Container */}
            <Grid container direction="column">
                <Grid item>
                    <Typography variant='h6'>Model</Typography>
                </Grid>
                <Grid item>
                    <GroupedButtons options={options}></GroupedButtons>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ShyftModel;