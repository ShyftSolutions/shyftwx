import { Grid, makeStyles } from '@material-ui/core';
import { latLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { ImageOverlay, Map, TileLayer } from 'react-leaflet';

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

export const BaseWxViewer = ({ index, layers, neBounds, swBounds }) => {
    
    const classes = useStyles();

    const bounds = latLngBounds(swBounds, neBounds);

    return (
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
    );
};

export default BaseWxViewer;