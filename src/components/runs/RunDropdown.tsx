import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import SimpleSelect from '../dropdown/SimpleSelect';

interface Props {
    options: string[],
    label?: string
}

export const RunDropdown = (props: Props) => {
    const { options, label } = props;

    const handleClick = (index: string) => {
        console.log(`clicked ${index}`);
    };

    return (
        <Grid container direction="column">
            <Grid item>
                <Typography variant="h6">{label}</Typography>
            </Grid>
            <Grid item>
                <SimpleSelect options={options} action={handleClick}/>
            </Grid>
        </Grid>
    );
};

export default RunDropdown;
