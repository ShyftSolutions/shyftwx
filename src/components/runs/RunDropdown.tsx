import { Grid, Typography } from '@material-ui/core';

import React from 'react';
import SimpleSelect from '../run/RunsSelector';

export const RunDropdown: React.FC<RunDropdownProps> = ({ options, label = 'Model Run' }) => {
    const handleClick = (index: string) => {
        console.log(`clicked ${index}`);
    };

    return (
        <Grid container direction="column">
            <Grid item>
                <Typography variant="h6">{label}</Typography>
            </Grid>
            <Grid item>
                <SimpleSelect options={options.map((option) => Number(option))} action={handleClick} />
            </Grid>
        </Grid>
    );
};

export default RunDropdown;
