import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import GroupedButtons from '../buttons/GroupedButtons';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        maxWidth: '100%'
    }
}));

/**
 * Creates a Material UI Grid Item for a Model button group selector and its label
 *
 * @param options string[]
 * @param label string
 */
export const ModelSelector: React.FC<ModelSelectorProps> = ({ options, label = 'Model' }) => {
    const classes = useStyles();

    const handleClick = (index: string) => {
        console.log(index);
    };

    return (
        /* Region Grid Container */
        <Grid container data-cy="model-selector" direction="column" className={classes.root}>
            <Grid item>
                <Typography variant="h6">{label}</Typography>
                <GroupedButtons data-cy="model-selector-buttons" options={options} action={handleClick} />
            </Grid>
        </Grid>
    );
};

export default ModelSelector;
