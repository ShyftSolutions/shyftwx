import { Grid, Typography } from '@material-ui/core';

import React from 'react';
import SimpleSelect from '../run/RunsSelector.tsx';

export const RunDropdown: React.FC<RunDropdownProps> = ({ options, label }) => {
    const handleClick = (index: string) => {
        console.log(`clicked ${index}`);
    };

    return (
        <Grid container direction="column">
            <Grid item>
                <Typography variant="h6">{label}</Typography>
            </Grid>
            <Grid item>
                <SimpleSelect options={options} action={handleClick} />
            </Grid>
        </Grid>
    );
};

export default RunDropdown;
