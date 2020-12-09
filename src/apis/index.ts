import axios from 'axios';
import { MAPBOX_KEY } from '../app-constants';

export const MAPBOX_API_URL =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/{SEARCH_TEXT}.json?country=US&access_token=' + MAPBOX_KEY;
export const MAPBOX_DIRECTIONS_API_URL =
    'https://api.mapbox.com/directions/v5/mapbox/driving-traffic/{COORDS}?geometries=geojson&overview=full&annotations=duration,congestion,speed&access_token=' +
    MAPBOX_KEY;
export const SHYFT_CAR_ROUTE_API_URL = 'https://api.shyftwx.com/v1/product/car_route';
export const SHYFT_CAPS_URL = 'https://ogc.shyftwx.com/ogcRestful/layers';
export const SHYFT_WCS_ROUTE = 'https://api.shyftwx.com/getwxdata/point';

export const getProductUrl = (
    baseUrl: string,
    customerId: string,
    datasetId: string,
    region?: string,
    run?: string
): string => {
    return `${baseUrl}/${customerId}/${datasetId}/products${region && run ? `/${run}-${region}` : ''}`;
};

export const getOutputUrl = (baseUrl: string, customerId: string, datasetId: string, run?: string): string => {
    return `${baseUrl}/${customerId}/${datasetId}/outputs${run ? `/${run}` : ''}`;
};

export const getIndexAsync = (baseUrl: string, customerId: string, datasetId: string): Promise<ShyftIndex> => {
    const url = getProductUrl(baseUrl, customerId, datasetId);

    return fetch(url).then((response) => response.json());
};

export const getProductDataAsync = (
    baseUrl: string,
    customerId: string,
    datasetId: string,
    region: string,
    run: string
) => {
    const url = getProductUrl(baseUrl, customerId, datasetId, region, run);

    return fetch(url).then((response) => response.json());
};

export const getOutputStatusAsync = (
    baseUrl: string,
    customerId: string,
    datasetId: string
): Promise<{ runs: string[] }> => {
    const url = getOutputUrl(baseUrl, customerId, datasetId);

    return fetch(url).then((response) => (response.status !== 200 ? Promise.reject(response) : response.json()));
};

export const getOutputRunStatusAsync = (
    baseUrl: string,
    customerId: string,
    datasetId: string,
    run: string
): Promise<{
    total_available: number;
}> => {
    const url = getOutputUrl(baseUrl, customerId, datasetId, run);

    return fetch(url).then((response) => response.json());
};

export function directionsAsync(coords: number[][]) {
    let stringCoords = '';

    coords.forEach((c) => {
        stringCoords += `${c[0]},${c[1]};`;
    });

    stringCoords = stringCoords.slice(0, stringCoords.length - 1);

    const url = MAPBOX_DIRECTIONS_API_URL.replace('{COORDS}', stringCoords);

    return axios.get(url).then((response) => response.data);
}

export const carRouteAsync = (currentRoute: any, startTime: Date | undefined): Promise<RouteImpactDataSegment[]> => {
    (startTime as Date).setMilliseconds(0);
    (startTime as Date).setSeconds(0);
    (startTime as Date).setMinutes(0);

    const route = currentRoute.routes[0];

    return axios
        .post(
            SHYFT_CAR_ROUTE_API_URL,
            {
                start_time: (startTime as Date).toISOString().slice(0, -1),
                routes: {
                    geometry: route.geometry,
                    legs: [
                        {
                            annotation: {
                                duration: route.legs[0].annotation.duration,
                                distance: [route.legs[0].distance]
                            }
                        }
                    ]
                }
            },
            {
                withCredentials: true
            }
        )
        .then((response) => response.data)
        .then((data) => {
            return data;

            // const results: RouteImpactDataSegment[] = [];

            // for (let i = 0; i < data.features.length - 1; i++) {
            //     const feature = data.features[i];

            //     const tempAvailable = feature.properties.parameters.find(
            //         (parameter) => parameter.name === 'Temperature'
            //     ) as FeatureParameters;
            //     const windAvailable = feature.properties.parameters.find(
            //         (parameter) => parameter.name === 'WindSpeed'
            //     ) as FeatureParameters;
            //     const precipAvailable = feature.properties.parameters.find(
            //         (parameter) => parameter.name === 'TotalPrecipitationRate'
            //     ) as FeatureParameters;
            //     const startTimeAvailable = feature.properties.times[i];

            //     results.push({
            //         lineString: feature.geometry,
            //         temp: tempAvailable.value,
            //         precip: precipAvailable.value,
            //         wind: windAvailable.value,
            //         startTime: startTimeAvailable
            //     });
            // }

            // console.log(results);

            // return results;
        });
};
