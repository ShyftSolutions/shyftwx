import _BasicButtonGroup from 'components/buttons/BasicButtonGroup';
import React from 'react';
import { array, withKnobs } from '@storybook/addon-knobs';

export default {
    title: 'Buttons',
    decorators: [withKnobs]
};

export const BasicButtonGroup = () => {

    const options = array('Button Options', ["One",
        "Two",
        "Three",
    ]);

    return <_BasicButtonGroup buttonOptions={options} />

};