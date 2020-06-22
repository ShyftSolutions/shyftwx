import { Grid, makeStyles, Typography, Paper } from '@material-ui/core';

import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '100%',
        paddingTop: 5,
        paddingBottom: 5
    },
    style: {
        fontWeight: 800,
        fontSize: 16,
        letterSpacing: 1,
        paddingLeft: 5,
        color: theme.palette.primary.contrastText
    },
    paper: {
        backgroundColor: theme.palette.secondary.main,
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
            <Grid container direction="row" justify="flex-end" alignItems="center">
                <Grid item>
                    <Typography variant="h6">Valid Time</Typography>
                    <Paper className={classes.paper}>
                        <Typography variant="button">{time}</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default ValidTime;
