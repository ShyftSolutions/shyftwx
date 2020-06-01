import _TimeControl from 'components/time/TimeControl.jsx';
import _Slider from 'components/time/Slider.jsx'
import React from 'react';

export default {
    title: 'Time',
};

export const TimeControl = () => <_TimeControl />;

export const Slider = () => {
    const marks = [
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
    ];
    return <_Slider marks={marks}/>;
}
