import { makeStyles } from '@material-ui/core';
import { latLngBounds } from 'leaflet';
import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100vw',
    },
}));

export const BaseWxViewer = ({ swBounds, neBounds }) => {
    const classes = useStyles();

    const bounds = latLngBounds(swBounds, neBounds);

    return (
        <Map bounds={bounds} className={classes.root} dragging={false} zoomControl={false} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </Map>
    );
};

export default BaseWxViewer;
