import _GroupedButtons from 'components/buttons/GroupedButtons';
import React from 'react';
import { object, withKnobs } from '@storybook/addon-knobs';

export default {
    component: _GroupedButtons,
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

export const GroupedButtons = () => {
    return <_GroupedButtons defaultSettings={object('Button Labels', defaultOptions)} />;
};
