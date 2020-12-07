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
    icon: {
        fontSize: '1.5em',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1em'
        }
    },
    text: {
        fontWeight: 600,
        fontSize: '2.25rem',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.75em'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.25em'
        }
    },
    dot: {
        fontSize: '1em',
        color: '#329AF0',
        [theme.breakpoints.down('sm')]: {
            fontSize: '.75em'
        }
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
                                    className={classes.icon}
                                    icon={fas.faTemperatureHigh}
                                    style={{ color: '#F0329A' }}
                                />
                                <FontAwesomeIcon
                                    className={classes.icon}
                                    icon={fas.faCloudShowersHeavy}
                                    style={{ color: '#F76707' }}
                                />
                                <FontAwesomeIcon
                                    className={classes.icon}
                                    icon={fas.faMapMarkedAlt}
                                    style={{ color: '#FF922B' }}
                                />
                                <FontAwesomeIcon
                                    className={classes.icon}
                                    icon={fas.faWind}
                                    style={{ color: '#F7BE1E' }}
                                />
                                <FontAwesomeIcon
                                    className={classes.icon}
                                    icon={fas.faClock}
                                    style={{ color: '#51CF66' }}
                                />
                                <FontAwesomeIcon
                                    className={classes.icon}
                                    icon={fas.faTemperatureLow}
                                    style={{ color: '#329AF0' }}
                                />
                                <FontAwesomeIcon
                                    className={classes.icon}
                                    icon={fas.faCar}
                                    style={{ fontSize: '1.5em', color: '#A551CF' }}
                                />
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
