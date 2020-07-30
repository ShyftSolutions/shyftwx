import axios from 'axios';
import { MAPBOX_KEY } from '../app-constants';

export const MAPBOX_API_URL =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/{SEARCH_TEXT}.json?country=US&access_token=' + MAPBOX_KEY;
export const MAPBOX_DIRECTIONS_API_URL =
    'https://api.mapbox.com/directions/v5/mapbox/driving-traffic/{COORDS}?geometries=geojson&overview=full&annotations=duration,congestion,speed&access_token=' +
    MAPBOX_KEY;
export const SHYFT_CAR_ROUTE_API_URL = 'https://api.shyftwx.com/product/car_route';
export const SHYFT_CAPS_URL = 'https://ogc.shyftwx.com/ogcRestful/layers';
export const SHYFT_WCS_ROUTE = 'https://api.shyftwx.com/getwxdata/point';

declare interface SearchData {
    type: string;
    features: import('geojson').Feature[];
}

export const getIndexAsync = (url) => {
    return fetch(url).then((response) => response.json());
};

export const getProductDataAsync = (url, region, run) => {
    url = `${url}/${run}-${region}`;

    return fetch(url).then((response) => response.json());
};

export const searchAsync = (input: string): Promise<SearchData> => {
    const url = MAPBOX_API_URL.replace('{SEARCH_TEXT}', encodeURIComponent(input));

    return axios.get<SearchData>(url).then((response) => response.data);
};
