import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, LayerGroup, Polyline } from 'react-leaflet';
import { Route } from './Route';
import React from 'react';
import { latLngBounds } from 'leaflet';
import { makeStyles } from '@material-ui/core';
import { transformWeatherData } from './../../utils/weatherDataFormatter';

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

export const MapBackground: React.FC<MapBackgroundProps> = ({ children }) => {
    const classes = useStyles();
    // sw, ne
    // const bounds = latLngBounds([23.81, -65.69], [49.38, -129.17]);
    const bounds = latLngBounds([26, -100], [45, -90]);

    //const dataToDraw: RouteLeg[] = transformWeatherData(route_with_weather_data)

    return (
        <Map
            center={[37.09, -95.71]}
            zoom={5}
            className={classes.root}
            dragging={true}
            zoomControl={true}
            scrollWheelZoom={true}
            doubleClickZoom={false}
            keyboard={false}
            touchZoom={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {children}
        </Map>
    );
};

export default MapBackground;
