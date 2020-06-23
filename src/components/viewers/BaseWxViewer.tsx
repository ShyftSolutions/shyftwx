import 'leaflet/dist/leaflet.css';
import { ImageOverlay, Map, TileLayer } from 'react-leaflet';
import React from 'react';
import { latLngBounds } from 'leaflet';
import { makeStyles } from '@material-ui/core';

/**
 * Uses Leaflet and Material UI styling to create a map with prop overlays and bounds
 */
const useStyles = makeStyles((theme) => ({
    root: {
        height: '40vw',
        width: '100%'
    },
    paddingMiddle: {
        marginLeft: 15,
        marginBottom: 20,
        marginTop: 15
    }
}));

export const BaseWxViewer = ({ layers, neBounds, swBounds }) => {
    const classes = useStyles();

    const bounds = latLngBounds(swBounds, neBounds);

    return (
        <Map
            bounds={bounds}
            className={classes.root}
            dragging={false}
            zoomControl={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            keyboard={false}
            touchZoom={false}
        >
            <ImageOverlay url={layers} bounds={bounds} opacity={0.5} />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </Map>
    );
};

export default BaseWxViewer;
