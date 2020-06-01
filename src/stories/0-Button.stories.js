import _BasicButtonGroup from 'components/buttons/BasicButtonGroup';
import React from 'react';
import { array, withKnobs } from '@storybook/addon-knobs';

export default {
    title: 'Buttons',
    decorators: [withKnobs]
};

export const BasicButtonGroup = () => {

    const tqi = {
        name: "TQI Model",
        selected: true
    };

    const gfs = {
        name: "GFS",
        selected: false
    };

    const hrrr = {
        name: "HRRR",
        selected: false
    };

    //const optionObjs = [tqi, gfs, hrrr];
    const optionObjs = ["TQI", "GFS", "HRRR"]
    
    const options = array('Button Options', optionObjs);

    return <_BasicButtonGroup defaultOptions={options} />

};