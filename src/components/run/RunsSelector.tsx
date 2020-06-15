import { Grid, Typography } from '@material-ui/core';

import GroupedButtons from '../buttons/GroupedButtons';
import React from 'react';


const toDates = (options: any) => {
    const dates: string[] = [];

    options.map(option => {
        const epoch: number = option * 1000;
        const date: Date = new Date(epoch);
        let time: string;
        if(date.getUTCHours() === 0) {
            time = (`${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()}T 00:${date.getUTCMinutes()}Z`);
        } else if(date.getUTCMinutes() === 0) {
            time = (`${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()}T ${date.getUTCHours()}:00Z`);
        } else {
            time = (`${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()}T ${date.getUTCHours()}:${date.getUTCMinutes()}Z`);
        } 
        dates.push(time);

    });

    return dates;
}
/**
 * Creates a Material UI Grid Item for the Region button group
 *
 * @param Props: { options: string[]}
 */
export const RunsSelector: React.FC<RegionSelectorProps> = ({ options, label = 'Runs' }) => {
    const handleClick = (index: string) => {
        console.log(`clicked ${index}`);
    };

   const dates = toDates(options);

    return (
        /* Run Grid Container */
        <Grid container direction="column">
            <Grid item>
                <Typography variant="h6">{label}</Typography>
            </Grid>
            <Grid item>
                <GroupedButtons options={dates} action={handleClick} />
            </Grid>
        </Grid>
    );
};

export default RunsSelector;
