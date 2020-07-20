import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export const BasicCheckbox = () => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} color="primary" />}
            label="Primary"
        />
    );
};

export default Checkbox;
