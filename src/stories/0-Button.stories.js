import _BasicButtonGroup from 'components/buttons/BasicButtonGroup';
import React from 'react';
import { object, withKnobs } from '@storybook/addon-knobs';

export default {
    component: _BasicButtonGroup,
    title: 'Buttons',
    decorators: [withKnobs]
};


const defaultOptions = [
    {
        name: "TQI Model"
    },
    {
        name: "GFS"
    },
    {
        name: "HRRR"
    }
];

export const BasicButtonGroup = () => {
    return <_BasicButtonGroup defaultOptions={object('Button Labels', defaultOptions)} />;
};
