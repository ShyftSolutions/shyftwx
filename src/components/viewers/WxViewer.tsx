import { faPercent, faWind } from '@fortawesome/free-solid-svg-icons';
import GroupedButtons from '../buttons/GroupedButtons';
import ProductMenu from '../products/ProductMenu';
import React from 'react';
import SimpleSelect from './../dropdown/SimpleSelect';

const alertClick = (buttonName: string) => {
    alert('You clicked on the button that says ' + buttonName);
};

const defaults = ['TQI', 'GFS', 'HRRR'];

const selectDefaults = ["2020-05-27T 12:00:00Z", "2020-05-27T 06:00:00Z", "2020-05-27T 11:00:00Z", "2020-05-27T 02:00:00Z"];

const products = [
    {
        name: 'Surface',
        open: true,
        products: [{
            name: 'Wind and Temperature',
            icon: faWind
        }, {
            name: 'Relative Humidity',
        }]
    }
];

export const WxViewer = () => {
    return (<>
            <GroupedButtons options={defaults} action={alertClick}/>
            <SimpleSelect options={selectDefaults} action={alertClick}/>
            <ProductMenu options={products} action={alertClick}/>
        </>
    );
};


export default WxViewer;
