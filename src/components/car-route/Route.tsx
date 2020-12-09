import React from 'react';
import { LayerGroup, Polyline } from 'react-leaflet';
import { convertUnits } from '../../utils/unitConverter';
import { transformUnit } from '../../utils/Units';

const green = '#51CF66';
const yellow = '#FF922B';
const red = '#FF0000';

export const Route: React.FC<RouteProps> = ({ legs, thresholds }) => {
    const getColor = (leg: RouteLeg) => {
        // default
        let overallColor = green;

        Object.keys(leg.featureValues).forEach((featureValueKey) => {
            const featureValue = leg.featureValues[featureValueKey];
            // i.e. 32.0 for "Temperature"

            const legFeatureUnit = transformUnit(featureValue.unit);
            let legFeatureValue = featureValue.value;

            // if legFeatureValue is not the same unit as our threshold - convert it
            const thresholdUnit = thresholds[featureValue.name].unit;

            // if the service unit and what the ui recorded arent the same,
            // convert the value from the service to what the ui has stored
            if (thresholdUnit !== legFeatureUnit) {
                legFeatureValue = convertUnits(legFeatureUnit, thresholdUnit, [legFeatureValue])[0];
            }

            const isGreaterThan = thresholds[featureValue.name].greaterThan;
            const firstThreshold = thresholds[featureValue.name].threshold[0];
            const secondThreshold = thresholds[featureValue.name].threshold[1];

            if (isGreaterThan) {
                if (legFeatureValue > secondThreshold) {
                    overallColor = red;
                } else if (legFeatureValue > firstThreshold && overallColor !== red) {
                    overallColor = yellow;
                }
            } else {
                if (legFeatureValue < firstThreshold) {
                    overallColor = red;
                } else if (legFeatureValue < secondThreshold && overallColor !== red) {
                    overallColor = yellow;
                }
            }
        });

        return overallColor;
    };

    return (
        <LayerGroup>
            {legs.map((leg, idx) => (
                <Polyline key={idx} positions={leg.coordinates} color={!thresholds ? 'gray' : getColor(leg)} />
            ))}
        </LayerGroup>
    );
};

export default Route;
