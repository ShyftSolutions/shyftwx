import 'leaflet/dist/leaflet.css';
import { Map, TileLayer } from 'react-leaflet';
import React from 'react';
import { latLngBounds } from 'leaflet';
import { makeStyles } from '@material-ui/core';

/**
 * Uses Leaflet and Material UI styling to create a map with prop overlays and bounds
 */
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    paddingMiddle: {
        marginLeft: 15,
        marginBottom: 20,
        marginTop: 15
    }
}));

export const MapBackground = () => {
    const classes = useStyles();
    // sw, ne
    // const bounds = latLngBounds([23.81, -65.69], [49.38, -129.17]);
    const bounds = latLngBounds([26, -100], [45, -90]);

    return (
        <Map
            center={[37.09, -95.71]}
            zoom={5}
            className={classes.root}
            dragging={false}
            zoomControl={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            keyboard={false}
            touchZoom={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </Map>
    );
};

export default MapBackground;
