import { Grid, Typography, makeStyles } from '@material-ui/core';
import GroupedButtons from '../buttons/GroupedButtons';
import SimpleSelect from '../dropdown/SimpleSelect';
import React from 'react';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '100%'
    }
}));

/**
 * Creates a Material UI Grid Item for the Region button group
 *
 * @param options string[] of options for the button group
 * @param label text displayed over the button group
 */
export const RunsSelector: React.FC<RunsSelectorProps> = ({ options, label = 'Runs', action }) => {
    const classes = useStyles();


    const newOptions = options.map((option) => moment.unix(option).utc().format('YYYY-MM-DD[T] hh:mm[Z]'));

    return (
        /* Run Grid Container */
        <Grid container item justify="flex-end" className={classes.root}>
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
