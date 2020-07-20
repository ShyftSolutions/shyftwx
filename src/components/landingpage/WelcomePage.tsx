import React from 'react';
import { Paper, Grid, Typography, makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import BasicButton from '../buttons/BasicButton';

const useStyles = makeStyles((theme) => ({
    paper: {
        [theme.breakpoints.down('sm')]: {
            minHeight: '40vh',
            minWidth: '60vw'
        },
        [theme.breakpoints.up('md')]: {
            minHeight: '40vh',
            minWidth: '40vw'
        }
    },
    textPaper: {
        paddingTop: 20
    },
    text: {
        color: theme.palette.secondary.contrastText
    },
    subtitle: {
        color: theme.palette.secondary.dark
    }
}));

export const WelcomePage = () => {
    const classes = useStyles();

    return (
        <div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid container item direction="column" alignItems="center" justify="center">
                    <Paper className={classes.paper}>
                        <Grid
                            container
                            item
                            direction="column"
                            justify="center"
                            alignItems="center"
                            spacing={2}
                            style={{ minHeight: '40vh', minWidth: '40vw' }}
                        >
                            <Grid item xs={12} />

                            <Grid container item justify="space-around">
                                <FontAwesomeIcon
                                    icon={fas.faTemperatureHigh}
                                    style={{ fontSize: '1.5em', color: '#F0329A' }}
                                />
                                <FontAwesomeIcon
                                    icon={fas.faCloudShowersHeavy}
                                    style={{ fontSize: '1.5em', color: '#F76707' }}
                                />
                                <FontAwesomeIcon
                                    icon={fas.faMapMarkedAlt}
                                    style={{ fontSize: '1.5em', color: '#FF922B' }}
                                />
                                <FontAwesomeIcon icon={fas.faWind} style={{ fontSize: '1.5em', color: '#F7BE1E' }} />
                                <FontAwesomeIcon icon={fas.faClock} style={{ fontSize: '1.5em', color: '#51CF66' }} />
                                <FontAwesomeIcon
                                    icon={fas.faTemperatureLow}
                                    style={{ fontSize: '1.5em', color: '#329AF0' }}
                                />
                                <FontAwesomeIcon icon={fas.faCar} style={{ fontSize: '1.5em', color: '#A551CF' }} />
                            </Grid>

                            <Grid item xs={12} />

                            <Typography align="center" variant="h5" gutterBottom>
                                View the weather along your car route
                            </Typography>

                            <Grid item xs={12} />

                            <Grid container item justify="space-evenly" xs={3}>
                                <FontAwesomeIcon icon={fas.faCircle} style={{ fontSize: '.75em', color: '#329AF0' }} />
                                <FontAwesomeIcon icon={fas.faCircle} style={{ fontSize: '.75em', color: '#329AF0' }} />
                                <FontAwesomeIcon icon={fas.faCircle} style={{ fontSize: '.75em', color: '#329AF0' }} />
                            </Grid>

                            <Grid item xs={12} />

                            <BasicButton style="gradient" text="start" />

                            <Grid item xs={12} />
                            <Grid item xs={12} />
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default WelcomePage;
