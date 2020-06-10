import { Grid, Typography } from '@material-ui/core';
import GroupedButtons from '../buttons/GroupedButtons';
import React from 'react';

/**
 * Creates a Material UI Grid Item for a Model and its button group
 *
 * @param Props: {options: string[]}
 */
export const ShyftModel = ( Props: {options: string[]}) => {
    const { options } = Props;

    const handleClick = (index: string) => {
        console.log(`clicked ${index}`)
    }

    return (
        <Grid item xs={3}>
            {/* Region Grid Container */}
            <Grid container direction="column">
                <Grid item>
                    <Typography variant='h6'>Model</Typography>
                </Grid>
                <Grid item>
                    <GroupedButtons options={options} action={handleClick} />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ShyftModel;