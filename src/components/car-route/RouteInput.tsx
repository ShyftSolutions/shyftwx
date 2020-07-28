import React from 'react';
import { Paper, Grid, Typography, makeStyles, IconButton } from '@material-ui/core';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import TimeSelector from '../time/TimeSelector';
import BasicButton from '../buttons/BasicButton';
import TextSearch from '../textfield/SearchField';

const useStyles = makeStyles((theme) => ({
    paper: {
        [theme.breakpoints.down('sm')]: {
            minHeight: '40vh',
            minWidth: '60vw'
        },
        [theme.breakpoints.up('md')]: {
            minHeight: '40vh',
            minWidth: '30vw'
        },
        padding: 10
    },
    grid: {
        minHeight: '60vh',
        minWidth: '30vw'
    },
    text: {
        fontWeight: 550,
        fontSize: '1.75em',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.5em'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.25em'
        }
    },
    icon: {
        fontSize: '2.5em',
        color: theme.palette.primary.main,
        paddingRight: 10,
        paddingLeft: 20
    }
}));

export const RouteInput: React.FC<RouteInputProps> = ({ onClick, onStartPointChange, onDestinationChange }) => {
    const classes = useStyles();

    const handleStartPointChange = (input: string) => {
        onStartPointChange(input);
    };

    const handleDestinationChange = (input: string) => {
        onDestinationChange(input);
    };

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
                            className={classes.grid}
                        >
                            <Grid container item justify="flex-start">
                                <FontAwesomeIcon icon={fas.faCar} className={classes.icon} />
                                <Typography className={classes.text} gutterBottom>
                                    Tell us about your route...
                                </Typography>
                            </Grid>

                            <Grid container item>
                                <Grid item xs={2} />
                                <Grid container item justify="flex-start" xs={9}>
                                    <Grid item xs={10}>
                                        <Typography color="secondary" variant="h5" gutterBottom>
                                            Where are you going?
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={2} />
                                    <Grid item xs={10}>
                                        <TextSearch label="Starting Point" handleChange={handleStartPointChange} />
                                    </Grid>

                                    <Grid item xs={2} />
                                    <Grid item xs={10}>
                                        <TextSearch label="Destination" handleChange={handleDestinationChange} />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container item justify="flex-start">
                                <Grid item xs={2} />
                                <Grid item xs={10}>
                                    <Typography color="secondary" variant="h5" gutterBottom>
                                        What time are you leaving?
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} />
                                <Grid item xs={8}>
                                    <TimeSelector />
                                </Grid>
                            </Grid>

                            <Grid container item justify="flex-end">
                                <BasicButton style="blue" action={onClick} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default RouteInput;
