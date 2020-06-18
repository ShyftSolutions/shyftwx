import { Grid, Typography } from '@material-ui/core';
import GroupedButtons from '../buttons/GroupedButtons';
import React from 'react';
import moment from 'moment';

/**
 * Creates a Material UI Grid Item for the Region button group
 *
 * @param options string[] of options for the button group
 * @param label text displayed over the button group
 */
export const RunsSelector: React.FC<RunsSelectorProps> = ({ options, label = 'Runs' }) => {
    const handleClick = (index: string) => {
        console.log(`clicked ${index}`);
    };

    const newOptions = options.map((option) => moment.unix(option).utc().format('YYYY-MM-DD[T] hh:mm[Z]'));

    return (
        <Grid container item justify="flex-end">
            <Grid item>
                <Typography variant="h6">{label}</Typography>
                <GroupedButtons options={newOptions} action={handleClick} />
            </Grid>
        </Grid>
    );
};

export default RunsSelector;
