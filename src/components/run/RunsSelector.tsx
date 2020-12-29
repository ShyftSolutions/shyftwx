import { Grid, makeStyles, Typography } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import GroupedButtons from '../buttons/GroupedButtons';
import SimpleSelect from '../dropdown/SimpleSelect';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        maxWidth: '100%'
    }
}));

/**
 * Creates a Material UI Grid Item for the Region button group or dropdown menu
 *
 * @param options string[] of options for the button group
 * @param label text displayed over the button group
 * @param action
 */
export const RunsSelector: React.FC<RunsSelectorProps> = ({ options, label = 'Runs', action }) => {
    const classes = useStyles();

    const newOptions = options.map((option) => moment.unix(option).utc().format('YYYY-MM-DD[T] hh:mm[Z]'));

    return (
        /* Run Grid Container */
        <Grid container item className={classes.root}>
            <Grid item>
                <Typography variant="h6">{label}</Typography>
                {newOptions.length === 1 ? (
                    <GroupedButtons options={newOptions} action={action} />
                ) : (
                    <SimpleSelect choices={newOptions} action={action} />
                )}
            </Grid>
        </Grid>
    );
};

export default RunsSelector;
