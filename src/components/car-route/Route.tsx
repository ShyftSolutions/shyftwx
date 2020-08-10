import React from 'react';
import { LayerGroup, Polyline } from 'react-leaflet';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({}));

export const Route: React.FC<RouteProps> = ({ legs }) => {
    const classes = useStyles();

    const getColor = (leg) => {
        // default
        let overallColor = 'green';
        const thresholds = leg.threshold;

        Object.keys(leg.featureValues).forEach((featureValueKey) => {
            const featureValue = leg.featureValues[featureValueKey];
            // i.e. 32.0 for "Temperature"
            const legFeatureValue = featureValue.value;

            const isGreaterThan = thresholds[featureValue.name].greaterThan;
            const firstThreshold = thresholds[featureValue.name].threshold[0];
            const secondThreshold = thresholds[featureValue.name].threshold[1];

            if (isGreaterThan) {
                if (legFeatureValue > secondThreshold) {
                    overallColor = 'red';
                } else if (legFeatureValue > firstThreshold && overallColor != 'red') {
                    overallColor = 'yellow';
                }
            } else {
                if (legFeatureValue < firstThreshold) {
                    overallColor = 'red';
                } else if (legFeatureValue < secondThreshold && overallColor != 'red') {
                    overallColor = 'yellow';
                }
            }
        });

        return overallColor;
    };

    return (
        <LayerGroup>
            {legs.map((leg, idx) => (
                <Polyline key={idx} positions={leg.coordinates} color={getColor(leg)} />
            ))}
        </LayerGroup>
    );
};

export default Route;
