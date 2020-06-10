import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import GroupedButtons from '../buttons/GroupedButtons';

/**
 * Creates a Material UI Grid Item for the Region button group
 *
 * @param Props: { options: string[]}
 */
export const RegionSelector = ( Props: { options: string[]}) => {
    const { options } = Props;

    const handleClick = (index: string) => {
        console.log(`clicked ${index}`)
    }

    return (
        <Grid item xs={3}>
            {/* Region Grid Container */}
            <Grid container direction="column">
                <Grid item>
                    <Typography variant='h6'>Region</Typography>
                </Grid>
                <Grid item>
                    <GroupedButtons options={options} action={handleClick} />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default RegionSelector;