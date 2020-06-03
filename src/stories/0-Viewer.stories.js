import { object, withKnobs } from '@storybook/addon-knobs';
import _BaseWxViewer from 'components/viewers/BaseWxViewer';
import _DynamicWxViewer from 'components/viewers/DynamicWxViewer';
import _StaticWxViewer from 'components/viewers/StaticWxViewer';
import _WxViewer from 'components/viewers/WxViewer';
import React from 'react';

export default {
    title: 'Viewer',
    decorators: [withKnobs],
};


const defaultViewerKnobs = {

    viewerKnobs: {
        swBounds: [23.81, -65.69],
        neBounds: [49.38, -129.17]
    },

    buttonKnobs: [
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
    ]

};

export const BaseWxViewer = () => {
    return <_BaseWxViewer defaultSettings={object('Settings', defaultViewerKnobs)} />
}

export const WxViewer = () => <_WxViewer />;

export const StaticWxViewer = () => <_StaticWxViewer />;

export const DynamicWxViewer = () => <_DynamicWxViewer />;