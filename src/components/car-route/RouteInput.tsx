import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { directionsAsync } from '../../apis';
import BasicButton from '../buttons/BasicButton';
import SearchField from '../textfield/SearchField';
import TimeSelector from '../time/TimeSelector';

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
    onTimeChange
}) => {
    const classes = useStyles();
    const [startCoords, setStartCoords] = React.useState<number[]>([]);
    const [endCoords, setEndCoords] = React.useState<number[]>([]);

    const handleStartPointChange = (value: { name: string; coords: number[] }) => {
        const point = { name: value.name, coordinates: value.coords };
        onStartPointChange(point);
        setStartCoords(value.coords);
    };

    const handleDestinationChange = (value: { name: string; coords: number[] }) => {
        const point = { name: value.name, coordinates: value.coords };
        onDestinationChange(point);
        setEndCoords(value.coords);
    };

    const handleTimeChange = (time: Date) => {
        onTimeChange(time);
    };

    const handleButtonClick = () => {
        // update to return data of route to parent
        directionsAsync([startCoords, endCoords]).then((data) => onClick(data));
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
                                        <SearchField label="Starting Point" handleChange={handleStartPointChange} />
                                    </Grid>

                                    <Grid item xs={2} />
                                    <Grid item xs={10}>
                                        <SearchField label="Destination" handleChange={handleDestinationChange} />
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
                                {startCoords.length === 0 || endCoords.length === 0 ? (
                                    <BasicButton style="disabled" />
                                ) : (
                                    <BasicButton style="blue" action={handleButtonClick} />
                                )}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default RouteInput;
