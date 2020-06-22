import { Grid, makeStyles, Typography, Paper } from '@material-ui/core';

import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '100%'
    },
    paper: {
        padding: 5
    }
}));

/**
 * Displays text showing the valid time
 *
 * @param time the valid time to be displayed
 */
export const ValidTime: React.FC<ValidTimeProps> = ({ time }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
                <Grid item>
                    <Paper className={classes.paper}>
                        <Typography variant="body1">Valid Time: {time}</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default ValidTime;
