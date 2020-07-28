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
            minWidth: '50vw'
        },
        paddingTop: 20,
        paddingBottom: 20
    },
    text: {
        fontWeight: 500,
        fontSize: '2rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.75em'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.25em'
        }
    },
    dot: {
        fontSize: '.75em',
        color: '#329AF0'
    }
}));

export const WelcomePage: React.FC<WelcomePageProps> = ({ action }) => {
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
                            justify="space-around"
                            alignItems="center"
                            spacing={2}
                            style={{ minHeight: '60vh', minWidth: '50vw' }}
                        >
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

                            <Typography align="center" className={classes.text}>
                                View the weather along your <br /> car route
                            </Typography>

                            <Grid container item justify="space-evenly" xs={3}>
                                <FontAwesomeIcon icon={fas.faCircle} className={classes.dot} />
                                <FontAwesomeIcon icon={fas.faCircle} className={classes.dot} />
                                <FontAwesomeIcon icon={fas.faCircle} className={classes.dot} />
                            </Grid>

                            <BasicButton style="gradient" text="start" action={action} />
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default WelcomePage;
