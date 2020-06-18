import { Grid, Typography } from '@material-ui/core';
import GroupedButtons from '../buttons/GroupedButtons';
import React from 'react';

/**
 * Creates a Material UI Grid Item for the Region button group and a label
 *
 * @param options string[] containing the list of options in the buttons
 * @param label text displayed above the product
 */
export const RegionSelector: React.FC<RegionSelectorProps> = ({ options, label = 'Region' }) => {
    const handleClick = (index: string) => {
        console.log(`clicked ${index}`);
    };

    return (
        /* Region Grid Container */
        <Grid container item justify="center">
            <Grid item>
                <Typography variant="h6">{label}</Typography>
                <GroupedButtons options={options} action={handleClick} />
            </Grid>
        </Grid>
    );
};

export default RegionSelector;
