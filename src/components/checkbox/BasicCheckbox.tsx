import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Checkbox } from '@material-ui/core';

export const BasicCheckbox: React.FC<BasicCheckboxProps> = ({ text, action }) => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked(!checked);
        action(!checked);
    };

    return (
        <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} color="primary" />}
            label={text}
        />
    );
};

export default BasicCheckbox;
