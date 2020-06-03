import { makeStyles } from '@material-ui/core';
import { latLngBounds } from 'leaflet';
import React from 'react';
import { Map, TileLayer, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SimpleSelect from 'components/dropdown/SimpleSelect';
import Slider from 'components/time/Slider';
import GroupedButtons from 'components/buttons/GroupedButtons'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '50vh',
        width: '50vw',
    },
}));

export const BaseWxViewer = ({ defaultSettings, layers }) => {
    const classes = useStyles();

    console.log(defaultSettings);
    const bounds = latLngBounds(defaultSettings.viewerKnobs.swBounds, defaultSettings.viewerKnobs.neBounds);

    return (
        <div>
        <Map bounds={bounds} className={classes.root} dragging={false} zoomControl={false} scrollWheelZoom={false}>
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
        <GroupedButtons defaultSettings={defaultSettings.buttonKnobs}></GroupedButtons>
        <SimpleSelect defaultSettings={defaultSettings.selectKnobs}></SimpleSelect>
        <Slider defaultSettings={defaultSettings.sliderKnobs}></Slider>
        </div>
    );
};

export default BaseWxViewer;
