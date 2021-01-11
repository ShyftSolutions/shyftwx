import { Grid, makeStyles, Typography, Paper, CssBaseline, Hidden } from '@material-ui/core';

import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'right',
        flexGrow: 1,
        maxWidth: '100%',
        paddingTop: 5
    },
    mobilePaper: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        border: '1px solid currentColor',
        padding: 5
    },
    timeLabel: {
        color: '#F76707',
        display: 'inline',
        fontWeight: 800,
        fontSize: '16px',
        letterSpacing: '1px',
        marginBottom: '0px'
    },
    time: {
        display: 'inline',
        fontWeight: 400
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
                <h3 className={classes.timeLabel}>Valid Time: </h3>
                <h4 className={classes.time}>{time}</h4>
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
