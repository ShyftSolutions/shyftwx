import { Grid, Typography } from '@material-ui/core';

import GroupedButtons from '../buttons/GroupedButtons';
import React from 'react';

/**
 * Creates a Material UI Grid Item for the Region button group
 *
 *
 * @param Props: { options: string[]}
 */
export const RunsSelector: React.FC<RegionSelectorProps> = ({ options, label = 'Runs' }) => {
    const handleClick = (index: string) => {
        console.log(`clicked ${index}`);
    };

    return (
        /* Run Grid Container */
        <Grid container item justify="flex-end">
            <Grid item>
                <Typography variant="h6">{label}</Typography>
                <GroupedButtons options={options} action={handleClick} />
            </Grid>
        </Grid>
    );
};

export default RunsSelector;
