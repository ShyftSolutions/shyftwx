import { Grid, Typography } from '@material-ui/core';

import GroupedButtons from '../buttons/GroupedButtons';
import React from 'react';
import moment from 'moment';

/**
 * Creates a Material UI Grid Item for the Region button group
 *
 *
 * @param Props: { options: string[]}
 */
export const RunsSelector: React.FC<RunsSelectorProps> = ({ options, label = 'Runs' }) => {
    const handleClick = (index: string) => {
        console.log(`clicked ${index}`);
    };

    const newOptions = options.map((option) => moment.unix(option).utc().format('YYYY-MM-DD[T] hh:mm[Z]'));

    return (
        /* Run Grid Container */
        <Grid container item justify="flex-end">
            <Grid item>
                <Typography variant="h6">{label}</Typography>
                <GroupedButtons options={newOptions} action={handleClick} />
            </Grid>
        </Grid>
    );
};

export default RunsSelector;
