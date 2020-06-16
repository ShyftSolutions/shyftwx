import { Grid, Typography } from '@material-ui/core';

import React from 'react';

export const ValidTime: React.FC<ValidTimeProps> = ({ time }) => {

    return (
        <Grid container item justify="flex-end" alignItems="flex-end">
            <Grid item>
                <Typography variant="h6">Valid Time</Typography>
                <Typography variant="body1">{time}</Typography>
            </Grid>
        </Grid>
    );
};

export default ValidTime;
