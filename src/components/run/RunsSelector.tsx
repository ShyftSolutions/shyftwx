import { Grid, Typography } from '@material-ui/core';

import GroupedButtons from '../buttons/GroupedButtons';
import React from 'react';

const toDates = (options: any) => {
    const dates: string[] = [];

    options.map((option) => {
        dates.push(toDate(option));
    });

    return dates;
};

const toDate = (ticks: number): string => {
    const epoch: number = ticks * 1000;
    const date: Date = new Date(epoch);
    const time: string = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()}T ${date.getUTCHours()}:${date.getUTCMinutes()}Z`;

    return time;
};

/**
 * Creates a Material UI Grid Item for the Region button group
 *
 * @param Props: { options: string[]}
 */
export const RunsSelector: React.FC<RunsSelectorProps> = ({ options, label = 'Runs', setRuns }) => {
    const handleClick = (item: GroupedButtonItem) => {
        console.log('Clicked:', item);

        const newOptions: DataRun[] = options.map((option) => {
            return { ...option, selected: toDate(option.run) === item.value };
        });

        setRuns(newOptions);
    };

    const dateItems = options.map((option) => ({ value: toDate(option.run), selected: option.selected }));

    return (
        /* Run Grid Container */
        <Grid container direction="column">
            <Grid item>
                <Typography variant="h6">{label}</Typography>
            </Grid>
            <Grid item>
                <GroupedButtons items={dateItems} action={handleClick} />
            </Grid>
        </Grid>
    );
};

export default RunsSelector;
