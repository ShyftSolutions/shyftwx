import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import SimpleSelect from '../dropdown/SimpleSelect';

export const RunDropdown = ( Props: {options : string[]}) => {
    const { options } = Props;

    return (
        <Grid item xs={3}>
            <Grid container direction="column">
                <Grid item>
                    <Typography variant="h6">Model Run</Typography>
                </Grid>
                <Grid item>
                    <SimpleSelect options={options}/>
                </Grid>
            </Grid>
        </Grid>
    );
};
