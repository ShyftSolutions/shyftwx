// const THRESHOLDS = {
//     'Temperature': {
//         greaterThan: true,
//         threshold: [1122.5, 2113.5]
//     },
//     'WindSpeed': {
//         greaterThan: true,
//         threshold: [11.0, 11.36]
//     },
//     'TotalPrecipitationRate': {
//         greaterThan: true,
//         threshold: [1120, 6110]
//     }
// }

export function transformWeatherData(weatherResp): RouteLeg[] {
    const formattedData: RouteLeg[] = [];

    // transform
    weatherResp.features.forEach((feature) => {
        formattedData.push(convertLeg(feature));
    });

    return formattedData;
}

function convertLeg(rawLegData) {
    const featureValues = {};

    // adding something like { 'Temperature': { name: 'Temperature', value: 100.0 }... }
    rawLegData.properties.parameters.map((feature) => {
        featureValues[feature.name] = { name: feature.name, value: feature.value, unit: feature.unit };
    });

    const leg: RouteLeg = {
        coordinates: rawLegData.geometry.coordinates.map((pair) => pair.reverse()),
        featureValues: featureValues
    };

    return leg;
}
