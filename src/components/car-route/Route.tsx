import React from 'react';
import { LayerGroup, Polyline } from 'react-leaflet';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({}));

export const Route: React.FC<RouteProps> = ({ legs }) => {
    const classes = useStyles();

    const getColor = (leg) => {

        // default
        let overallColor = 'green'
        const thresholds = leg.threshold;

        Object.keys(leg.featureValues).forEach(featureValueKey => {
            const featureValue = leg.featureValues[featureValueKey]
            // i.e. 32.0 for "Temperature"
            const legFeatureValue = featureValue.value

            const isGreaterThan = thresholds[featureValue.name].greaterThan;
            const firstThreshold = thresholds[featureValue.name].threshold[0];
            const secondThreshold = thresholds[featureValue.name].threshold[1];

            // TODO !isGreaterThan
            if (isGreaterThan) {
                if (legFeatureValue > secondThreshold) {
                    overallColor = 'red';
                } else if (legFeatureValue > firstThreshold && overallColor != 'red') {
                    overallColor = 'yellow'
                }
            } else {

            }
        });

        return overallColor;





        // // the standards to compare against
        // const isGreaterThan = leg.threshold.greaterThan;
        // const firstThreshold = leg.threshold.threshold[0];
        // const secondThreshold = leg.threshold.threshold[1];

        // // the value to compare
        // const value = leg.featureValues.temp.value;
        // const name = leg.featureValues.temp.name;

        // if (isGreaterThan) {
        //     if (value > secondThreshold) {
        //         return 'red';
        //     } else if (value > firstThreshold) {
        //         return 'yellow';
        //     } else {
        //         return 'green';
        //     }
        // } else {
        //     if (value < secondThreshold) {
        //         return 'red';
        //     } else if (value < firstThreshold) {
        //         return 'yellow';
        //     } else {
        //         return 'green';
        //     }
        // }
    };

    return (
        <LayerGroup>
            {legs.map((leg) => (
                <Polyline positions={leg.coordinates} color={getColor(leg)} />
            ))}
        </LayerGroup>
    );
};

export default Route;
