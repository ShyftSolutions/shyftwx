import React from 'react';
import { Paper, Grid, Typography, makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import TimeSelector from '../time/TimeSelector';
import BasicButton from '../buttons/BasicButton';
import TextSearch from '../textfield/SearchField';
import { directionsAsync } from '../../apis';

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

export const RouteInput: React.FC<RouteInputProps> = ({
    onClick,
    onStartPointChange,
    onDestinationChange,
    onTimeChange,
    startPoint,
    destination
}) => {
    const classes = useStyles();
    const [startCoords, setStartCoords] = React.useState<number[]>([]);
    const [endCoords, setEndCoords] = React.useState<number[]>([]);

    const handleStartPointChange = (value: { name: string; coords: number[] }) => {
        // onStartPointChange(input);
        setStartCoords(value.coords);
    };

    const handleDestinationChange = (value: { name: string; coords: number[] }) => {
        // onDestinationChange(input);
        setEndCoords(value.coords);
    };

    const handleTimeChange = (time: Date) => {
        onTimeChange(time);
    };

    const handleButtonClick = () => {
        directionsAsync([startCoords, endCoords]).then((data) => console.log(data));
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
                                        <TextSearch
                                            label="Starting Point"
                                            handleChange={handleStartPointChange}
                                            value={startPoint}
                                        />
                                    </Grid>

                                    <Grid item xs={2} />
                                    <Grid item xs={10}>
                                        <TextSearch
                                            label="Destination"
                                            handleChange={handleDestinationChange}
                                            value={destination}
                                        />
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
                                    <TimeSelector action={handleTimeChange} />
                                </Grid>
                            </Grid>

                            <Grid container item justify="flex-end">
                                <BasicButton style="blue" action={handleButtonClick} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default RouteInput;