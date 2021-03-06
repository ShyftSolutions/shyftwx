import { object, withKnobs } from '@storybook/addon-knobs';
import _BaseWxViewer from 'components/viewers/BaseWxViewer';
import _DynamicWxViewer from 'components/viewers/DynamicWxViewer';
import _StaticWxViewer from 'components/viewers/StaticWxViewer';
import _WxViewer from '../components/viewers/WxViewer';
import _ImageViewer from '../components/viewers/ImageViewer';
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './../theme';
import { faPercent, faTint, faWind } from '@fortawesome/free-solid-svg-icons';

export default {
    title: 'Viewer',
    decorators: [withKnobs]
};

const defaultViewerKnobs = {
    viewerKnobs: {
        swBounds: [23.81, -65.69],
        neBounds: [49.38, -129.17]
    },

    modelButtonKnobs: {
        label: 'Model',
        buttonLabels: [
            {
                name: 'TQI Model'
            },
            {
                name: 'GFS'
            },
            {
                name: 'HRRR'
            }
        ]
    },

    sliderKnobs: {
        maxValue: 12,
        stepValue: 1,
        marks: [
            {
                value: 0,
                label: '0H'
            },
            {
                value: 1,
                label: '1H'
            },
            {
                value: 2,
                label: '2H'
            },
            {
                value: 3,
                label: '3H'
            },
            {
                value: 4,
                label: '4H'
            },
            {
                value: 5,
                label: '5H'
            },
            {
                value: 6,
                label: '6H'
            },
            {
                value: 7,
                label: '7H'
            },
            {
                value: 8,
                label: '8H'
            },
            {
                value: 9,
                label: '9H'
            },
            {
                value: 10,
                label: '10H'
            },
            {
                value: 11,
                label: '11H'
            },
            {
                value: 12,
                label: '12H'
            }
        ]
    },

    regionButtonKnobs: {
        label: 'Region',
        buttonLabels: [
            {
                name: 'TQI Model'
            },
            {
                name: 'CONUS'
            },
            {
                name: 'Southeast'
            }
        ]
    },

    selectKnobs: [
        {
            name: '2020-05-27T 12:00:00Z'
        },
        {
            name: '2020-05-27T 06:00:00Z'
        },
        {
            name: '2020-05-27T 11:00:00Z'
        },
        {
            name: '2020-05-27T 02:00:00Z'
        }
    ],

    productsKnobs: [
        {
            name: 'Surface',
            open: true,
            products: [
                {
                    name: 'Wind and Temperature',
                    icon: faWind
                },
                {
                    name: 'Relative Humidity',
                    icon: faPercent
                }
            ]
        },
        {
            name: '850MB',
            open: false,
            products: [
                {
                    name: 'Relative Humidity',
                    icon: faTint
                }
            ]
        },
        {
            name: '700MB',
            open: false,
            products: [
                {
                    name: 'Wind and Temperature',
                    icon: faWind
                }
            ]
        }
    ]
};

export const BaseWxViewer = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_BaseWxViewer
                neBounds={object('neBounds', [49.38, -129.17])}
                swBounds={object('swBounds', [23.81, -65.69])}
                layers={[
                    {
                        type: 'metar',
                        coordinates: [41.12, -95.92],
                        payload: {
                            altimeter: 102300.0,
                            automation: 'AO2A',
                            ceiling: null,
                            cloud_coverages: [],
                            cloud_layers: [],
                            dewpoint: 286.45,
                            elevation: 319,
                            present_wx: null,
                            raw_ob: 'KOFF 211456Z AUTO 19008KT 10SM CLR 18/13 A3021 RMK AO2 SLP232 T01780133 50004 $',
                            report_id: 'KOFF',
                            report_type: 'METAR',
                            sky_cover: 0,
                            temperature: 290.95,
                            valid_time: '2020-09-21T14:56:00Z',
                            visibility: 16090,
                            wind_direction: 190,
                            wind_gust: null,
                            wind_speed: 4.1
                        }
                    }
                ]}
            />
        </MuiThemeProvider>
    );
};

export const ImageViewer = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <_ImageViewer image="https://s3-us-east-2.amazonaws.com/wxchange-images/5b4daa25-3d9f-4f83-ade4-ee6976b259e1/TQIConus/images/AAAD00_1591524000_TQI_Temperature_2m_900.PNG" />
        </MuiThemeProvider>
    );
};
export const WxViewer = () => <_WxViewer />;

export const StaticWxViewer = () => <_StaticWxViewer />;

export const DynamicWxViewer = () => <_DynamicWxViewer />;
