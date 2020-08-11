import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Drawer, Typography, Divider, Grid, List, ListItem } from '@material-ui/core';
import SearchField from '../textfield/SearchField';
import TimeSelector from '../time/TimeSelector';
import BasicButton from '../buttons/BasicButton';
import { ThresholdExpansionPanel } from './ThresholdExpansionPanel';
import { LayerGroup } from 'react-leaflet';
import { Route } from './Route';
import MapBackground from './MapBackground';
import TimeChart from './TimeChart';

const drawerWidth = 300;

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex'
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
        content: {
            flexGrow: 1,
            marginLeft: 13
        },
        header: {
            fontSize: 18,
            fontWeight: 600,
            color: theme.palette.secondary.main
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
    possibleTrips
}) => {
    const classes = useStyles();
    // const [tableShow, setTableShow] = React.useState(false);
    // temporarily just set to true since when false the map disappears with the table???
    const tableShow = true;

    const thresholds = {
        Temperature: {
            greaterThan: tempParam ? tempParam.greaterThan : false,
            threshold: tempParam ? tempParam.threshold : null
        },
        WindSpeed: {
            greaterThan: windParam ? windParam.greaterThan : false,
            threshold: windParam ? windParam.threshold : null
        },
        TotalPrecipitationRate: {
            greaterThan: precipParam ? precipParam.greaterThan : false,
            threshold: precipParam ? precipParam.threshold : null
        }
    };

    const onClick = () => {
        // setTableShow(true);
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
                <SearchField label="Starting Point" defaultValue={startingPoint} />
                <SearchField label="Destination" defaultValue={destination} />

                <Divider />
                <Typography className={classes.header} gutterBottom>
                    Time
                </Typography>
                <Grid container direction="column" justify="space-between" alignItems="center">
                    <Grid item>
                        <TimeSelector value={time} />
                    </Grid>
                    <Grid item>
                        {!tableShow ? (
                            <BasicButton text="Explore Times" action={onClick} />
                        ) : (
                            <BasicButton text="Explore Times" style="disabled" />
                        )}
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
                        />
                    </ListItem>
                    <ListItem>
                        <ThresholdExpansionPanel
                            summary="Precipitation"
                            weatherImpact="precip"
                            sliderValues={precipParam}
                            onSliderValueChange={onPrecipSliderChange}
                        />
                    </ListItem>
                    <ListItem>
                        <ThresholdExpansionPanel
                            summary="Temperature"
                            weatherImpact="temp"
                            sliderValues={tempParam}
                            onSliderValueChange={onTempSliderChange}
                        />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                {tableShow ? <TimeChart data={possibleTrips} thresholds={thresholds} /> : ' '}
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
