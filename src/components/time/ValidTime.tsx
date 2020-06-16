import React from 'react';
import { Grid, Typography } from '@material-ui/core';

export const ValidTime: React.FC<ValidTimeProps> = ({ time }) => {
    const formattedDate = (date: Date) => {
        if (date.getUTCHours() === 0) {
            return `00:${date.getUTCMinutes()} ${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`;
        } else if (date.getUTCMinutes() === 0) {
            return `${date.getUTCHours()}:00 ${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`;
        } else {
            return `${date.getUTCHours()}:${date.getUTCMinutes()} ${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`;
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
