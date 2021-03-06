import { Divider, Drawer, Grid, List, ListItem, Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { LayerGroup } from 'react-leaflet';
import SearchField from '../textfield/SearchField';
import TimeSelector from '../time/TimeSelector';
import MapBackground from './MapBackground';
import { Route } from './Route';
import { ThresholdExpansionPanel } from './ThresholdExpansionPanel';
import TimeChart from './TimeChart';

const drawerWidth = 300;

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        content: {
            flexGrow: 1,
            marginLeft: 13
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0
        },
        drawerPaper: {
            width: drawerWidth,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: theme.palette.primary.contrastText
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end'
        },
        header: {
            fontSize: 18,
            fontWeight: 600,
            color: theme.palette.secondary.main
        },
        buttonPaper: {
            padding: 15,
            backgroundColor: theme.palette.primary.contrastText
        },
        weatherList: {
            fontSize: 16,
            fontWeight: 400
        }
    })
);

export const InputDrawer: React.FC<InputDrawerProps> = ({
    startingPoint,
    destination,
    time,
    windParam,
    precipParam,
    tempParam,
    onPrecipSliderChange,
    onTempSliderChange,
    onWindSliderChange,
    onTempUnitChange,
    onPrecipUnitChange,
    onWindUnitChange,
    possibleTrips
}) => {
    const classes = useStyles();

    const thresholds = {
        Temperature: {
            ...tempParam
        },
        WindSpeed: {
            ...windParam
        },
        TotalPrecipitationRate: {
            ...precipParam
        }
    };

    const getActiveTrip = () => {
        // TODO may need to make this more dynamic later if we want to update the map w/ a selected time.
        // didnt do this yet bc startTime is on the hour, but the user chosen time is to the minute
        // const activeTrip = possibleTrips.filter(trip => trip.startTime === time)[0];

        return possibleTrips[0];
    };

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.drawerHeader} />

                <Divider />
                <Typography className={classes.header} gutterBottom>
                    Route
                </Typography>
                <SearchField label="Starting Point" handleChange={(value) => console.log(value)} />
                <SearchField label="Destination" handleChange={(value) => console.log(value)} />

                <Divider />
                <Typography className={classes.header} gutterBottom>
                    Time
                </Typography>
                <Grid container direction="column" justify="space-between" alignItems="center">
                    <Grid item>
                        <TimeSelector value={time} action={(newDate) => console.log(newDate)} />
                    </Grid>
                    <Grid item>
                        <Paper elevation={0} className={classes.buttonPaper}>
                            <TimeChart data={possibleTrips} thresholds={thresholds} />
                        </Paper>
                    </Grid>
                </Grid>

                <Divider />
                <Typography className={classes.header} gutterBottom>
                    Weather Parameters
                </Typography>
                <List>
                    <ListItem>
                        <ThresholdExpansionPanel
                            summary="Wind"
                            weatherImpact="wind"
                            sliderValues={windParam}
                            onSliderValueChange={onWindSliderChange}
                            onUnitChange={onWindUnitChange}
                        />
                    </ListItem>
                    <ListItem>
                        <ThresholdExpansionPanel
                            summary="Precipitation"
                            weatherImpact="precip"
                            sliderValues={precipParam}
                            onSliderValueChange={onPrecipSliderChange}
                            onUnitChange={onPrecipUnitChange}
                        />
                    </ListItem>
                    <ListItem>
                        <ThresholdExpansionPanel
                            summary="Temperature"
                            weatherImpact="temp"
                            sliderValues={tempParam}
                            onSliderValueChange={onTempSliderChange}
                            onUnitChange={onTempUnitChange}
                        />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <MapBackground>
                    <LayerGroup>
                        <Route legs={getActiveTrip().tripData} thresholds={thresholds} />
                    </LayerGroup>
                </MapBackground>
            </main>
        </div>
    );
};

export default InputDrawer;
