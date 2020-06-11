import { Grid, Typography } from '@material-ui/core';

import GroupedButtons from '../buttons/GroupedButtons';
import React from 'react';

/**
 * Creates a Material UI Grid Item for a Model and its button group
 *
 * @param Props: {options: string[]}
 */
export const ModelSelector: React.FC<ModelSelectorProps> = ({ options, label = 'Model', action }) => {
    const handleClick = (index: string) => {
        console.log(`clicked ${index}`);
    };

    return (
        /* Region Grid Container */
        <Grid container direction="column">
            <Grid item>
                <Typography variant="h6">{label}</Typography>
            </Grid>
            <Grid item>
                <GroupedButtons options={options} action={handleClick} />
            </Grid>
        </Grid>
    );
};

export default ModelSelector;
