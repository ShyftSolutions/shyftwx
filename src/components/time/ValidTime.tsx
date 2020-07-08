import { Grid, makeStyles, Typography, Paper, CssBaseline, Hidden } from '@material-ui/core';

import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '100%',
        paddingTop: 5,
        paddingBottom: 5
    },
    paper: {
        backgroundColor: theme.palette.secondary.main,
        padding: 5
    },
    mobilePaper: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        border: '1px solid currentColor',
        padding: 5
    },
    text: {
        color: theme.palette.secondary.main
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
            <CssBaseline />
            <Hidden xsDown>
                <Grid container direction="row" justify="flex-end" alignItems="center">
                    <Grid item>
                        <Typography variant="h6">Valid Time</Typography>
                        <Paper className={classes.paper}>
                            <Typography variant="button">{time}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Hidden>
            <Hidden smUp>
                <Paper className={classes.mobilePaper}>
                    <Grid container item xs={12} justify="center">
                        <Typography className={classes.text} variant="h6">
                            {time}
                        </Typography>
                    </Grid>
                </Paper>
            </Hidden>
        </div>
    );
};

export default ValidTime;
