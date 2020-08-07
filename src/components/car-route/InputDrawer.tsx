import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Drawer, Typography, Divider, Grid, List, ListItem } from '@material-ui/core';
import SearchField from '../textfield/SearchField';
import TimeSelector from '../time/TimeSelector';
import BasicButton from '../buttons/BasicButton';
import { ThresholdExpansionPanel } from './ThresholdExpansionPanel';
import MapBackground from './MapBackground';

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
    tempParam
}) => {
    const classes = useStyles();

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
                        <BasicButton text="Explore Times" />
                    </Grid>
                </Grid>

                <Divider />
                <Typography className={classes.header} gutterBottom>
                    Weather Parameters
                </Typography>
                <List>
                    <ListItem>
                        <ThresholdExpansionPanel summary="Wind" weatherImpact="wind" sliderValues={windParam} />
                    </ListItem>
                    <ListItem>
                        <ThresholdExpansionPanel
                            summary="Precipitation"
                            weatherImpact="precip"
                            sliderValues={precipParam}
                        />
                    </ListItem>
                    <ListItem>
                        <ThresholdExpansionPanel summary="Temperature" weatherImpact="temp" sliderValues={tempParam} />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <MapBackground />
            </main>
        </div>
    );
};

export default InputDrawer;
