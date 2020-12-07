import React from 'react';
import Switch from '@material-ui/core/Switch';

export const BasicSwitch = () => {
    const [checked, setChecked] = React.useState(false);

    const toggleChecked = () => {
        setChecked((prev) => !prev);
    };

    return <Switch color="primary" checked={checked} onChange={toggleChecked} />;
};

export default BasicSwitch;
