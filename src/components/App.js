import React from 'react';
import ShyftWx from './root/ShyftWx';
import BaseWxViewer from './viewers/BaseWxViewer';
import { faPercent, faTint, faWind } from '@fortawesome/free-solid-svg-icons';

const defaultViewerKnobs = {

    viewerKnobs: {
        swBounds: [23.81, -65.69],
        neBounds: [49.38, -129.17]
    },

    modelButtonKnobs: [
        {
            name: "TQI Model"
        },
        {
            name: "GFS"
        },
        {
            name: "HRRR"
        }
    ],

    sliderKnobs: {
        maxValue: 12,
        stepValue: 1,
        marks: [
            {
                value: 0,
                label: '0H',
            },
            {
                value: 1,
                label: '1H',
            },
            {
                value: 2,
                label: '2H',
            },
            {
                value: 3,
                label: '3H',
            },
            {
                value: 4,
                label: '4H',
            },
            {
                value: 5,
                label: '5H',
            },
            {
                value: 6,
                label: '6H',
            },
            {
                value: 7,
                label: '7H',
            },
            {
                value: 8,
                label: '8H',
            },
            {
                value: 9,
                label: '9H',
            },
            {
                value: 10,
                label: '10H',
            },
            {
                value: 11,
                label: '11H',
            },
            {
                value: 12,
                label: '12H',
            }
        ],

    },

    regionButtonKnobs: [
        {
            name: "TQI Model"
        },
        {
            name: "CONUS"
        },
        {
            name: "Southeast"
        }
    ],

    selectKnobs: [
        {
            name: "2020-05-27T 12:00:00Z"
        },
        {
            name: "2020-05-27T 06:00:00Z"
        },
        {
            name: "2020-05-27T 11:00:00Z"
        },
        {
            name: "2020-05-27T 02:00:00Z"
        }
    ],

    productsKnobs: [
        {
            name: 'Surface',
            open: true,
            products: [{
                name: 'Wind and Temperature',
                icon: faWind,
            }, {
                name: 'Relative Humidity',
                icon: faPercent,
            }]
        },
        {
            name: '850MB',
            open: false,
            products: [{
                name: 'Relative Humidity',
                icon: faTint,
            },]
        },
        {
            name: '700MB',
            open: false,
            products: [{
                name: 'Wind and Temperature',
                icon: faWind,
            },]
        }
    ]

};

export const App = () => {
    return (
        <ShyftWx indexUrl="https://wxchange-images.s3.us-east-2.amazonaws.com/index.json">
            <BaseWxViewer defaultSettings={defaultViewerKnobs} />
        </ShyftWx>
    );
};

export default App;
