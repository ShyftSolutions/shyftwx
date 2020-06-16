import { Grid, Typography } from '@material-ui/core';

import React from 'react';

export const ValidTime: React.FC<ValidTimeProps> = ({ time }) => {
    const formattedDate = (date: Date) => {
        if (date.getUTCHours() === 0) {
            return `${date.getUTCMonth() + 1}/${date.getUTCDate()} 00:${date.getUTCMinutes()}Z`;
        } else if (date.getUTCMinutes() === 0) {
            return `${date.getUTCMonth() + 1}/${date.getUTCDate()} ${date.getUTCHours()}:00Z`;
        } else {
            return `${date.getUTCMonth() + 1}/${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}Z`;
        }
    };

    return (
        <Grid container item justify="flex-end" alignItems="flex-end">
            <Grid item>
                <Typography variant="h6">Valid Time</Typography>
                <Typography variant="body1">{formattedDate(time)}</Typography>
            </Grid>
        </Grid>
    );
};

export default ValidTime;
