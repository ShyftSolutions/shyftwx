import React from 'react';
import GroupedButtons from '../buttons/GroupedButtons';
import SimpleSelect from '../dropdown/SimpleSelect';

const alertClick = ({ buttonName }) => {
    alert("You clicked on the button that says " + buttonName);
}

const defaults = ["TQI", "GFS", "HRRR"];

export const WxViewer = () => {
    return (<>
    <GroupedButtons options={defaults} action={alertClick} />
    <SimpleSelect options={defaults} action={alertClick}/>
    </>
    );
};

export default WxViewer;
