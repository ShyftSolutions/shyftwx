import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import SimpleSelect from 'components/dropdown/SimpleSelect';

export const RunDropdown = ({ options }) => {
    return (
        <Grid item xs={3}>
            <Grid container direction="column">
                <Grid item>
                    <Typography variant="h6">Model Run</Typography>
                </Grid>
                <Grid item>
                    <SimpleSelect options={options}></SimpleSelect>
                </Grid>
            </Grid>
        </Grid>
    );
};
