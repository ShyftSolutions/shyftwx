import { Grid, Typography } from '@material-ui/core';

import React from 'react';
import moment from 'moment';

export const ValidTime: React.FC<ValidTimeProps> = ({ unixSeconds }) => {
    const formattedDate = moment.unix(unixSeconds).utc().format('MM[/]DD hh:ss[Z]');

    return (
        <Grid container item justify="flex-end" alignItems="flex-end">
            <Grid item>
                <Typography variant="h6">Valid Time</Typography>
                <Typography variant="body1">{formattedDate}</Typography>
            </Grid>
        </Grid>
    );
};

export default ValidTime;
