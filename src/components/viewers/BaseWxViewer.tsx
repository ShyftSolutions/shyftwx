import 'leaflet/dist/leaflet.css';
import { ImageOverlay, Map, Marker, Popup, TileLayer } from 'react-leaflet';
import React from 'react';
import { Icon, latLngBounds } from 'leaflet';
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

export const BaseWxViewer: React.FC<BaseWxViewerProps> = ({ layers, neBounds, swBounds }) => {
    const classes = useStyles();

    const bounds = latLngBounds(swBounds, neBounds);

    const generateLayers = (): React.ReactNode => {
        const results: React.ReactNode[] = [];

        layers &&
            layers.forEach((layer) => {
                if (layer.type === 'metar') {
                    const metar = layer as WxViewerLayerMetar;

                    results.push(
                        <Marker
                            position={metar.coordinates}
                            icon={new Icon({ iconUrl: 'logo192.png', iconSize: [20, 20] })}
                        >
                            <Popup>{JSON.stringify(metar)}</Popup>
                        </Marker>
                    );
                }
            });

        return results;
    };

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
            {generateLayers()}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </Map>
    );
};

export default BaseWxViewer;
