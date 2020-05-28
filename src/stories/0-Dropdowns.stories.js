import _SimpleSelect from 'components/dropdown/SimpleSelect';
import { array, text, withKnobs } from '@storybook/addon-knobs/react';
import React from 'react';

export default {
    title: 'Dropdowns',
    decorators: [withKnobs]
};

export const SimpleSelect = () => {

    const label = text("Label", "Model Run");

    const options = array('Select Options', ["2020-05-27T12:00:00Z",
    "2020-05-27T06:00:00Z",
    "2020-05-27T11:00:00Z",
    "2020-05-27T02:00:00Z"]);

    return <_SimpleSelect label ={label} selectOptions={options} />

};

