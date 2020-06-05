import { makeStyles, MuiThemeProvider, Grid, Typography } from '@material-ui/core';
import { latLngBounds } from 'leaflet';
import React from 'react';
import { Map, TileLayer, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SimpleSelect from 'components/dropdown/SimpleSelect';
import Slider from 'components/time/Slider';
import TimeControl from 'components/time/TimeControl';
import ProductMenu from 'components/products/ProductMenu';
import ShyftModel from 'components/buttons/ShyftModel';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '70vh',
        width: '70vw',
    },
    paddingMiddle: {
        marginLeft: 15,
        marginBottom: 20,
        marginTop: 15,
    },
}));

export const BaseWxViewer = ({ defaultSettings, layers }) => {
    const classes = useStyles();

    const bounds = latLngBounds(defaultSettings.viewerKnobs.swBounds, defaultSettings.viewerKnobs.neBounds);
    console.log(defaultSettings.modelButtonKnobs);

    return (
        <>
            {/* Top Row Grid Container */}
            <Grid container direction="row" justify="flex-end" alignItems="flex-start" spacing={3}>
                <ShyftModel defaultSettings={defaultSettings.modelButtonKnobs}></ShyftModel>

                <ShyftModel defaultSettings={defaultSettings.regionButtonKnobs}></ShyftModel>

                <Grid item xs={3}>

                    {/* Model Run Container */}

                    <Grid container direction="column">
                        <Grid item>
                            <Typography variant="h6">Model Run</Typography>
                        </Grid>
                        <Grid item>
                            <SimpleSelect defaultSettings={defaultSettings.selectKnobs}></SimpleSelect>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* Middle Row Grid Container */}
            <Grid
                container
                className={classes.paddingMiddle}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="flex-start"
                spacing={3}
            >
                <Grid item xs={3}>
                    {/* Products Menu Container */}
                    <Grid container direction="column">
                        <Grid item>
                            <Typography variant="h6">Products</Typography>
                        </Grid>
                        <Grid item>
                            <ProductMenu defaultCategories={defaultSettings.productsKnobs}></ProductMenu>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={9}>
                    {/* Map Container */}
                    <Map
                        zoom={10}
                        bounds={bounds}
                        className={classes.root}
                        dragging={false}
                        zoomControl={false}
                        scrollWheelZoom={false}
                    >
                        <ImageOverlay
                            url={
                                'https://wxchange-images.s3.us-east-2.amazonaws.com/GFS_2020-05-27T06_Temperature_US_850hPa_01.png.PNG'
                            }
                            bounds={bounds}
                            opacity={0.5}
                        />
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </Map>
                </Grid>
            </Grid>

            {/* Bottom Row Grid Container */}
            <Grid container direction="row" justify="flex-end" alignItems="center" spacing={0}>
                <Grid item xs={2}>
                    <TimeControl></TimeControl>
                </Grid>
                <Grid item xs={6}>
                    <Slider defaultSettings={defaultSettings.sliderKnobs}></Slider>
                </Grid>
            </Grid>
        </>
    );
};

export default BaseWxViewer;
