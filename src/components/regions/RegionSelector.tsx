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
 * Creates a Material UI Grid Item for the Region button group and a label
 *
 * @param options string[] containing the list of options in the buttons
 * @param label text displayed above the product
 */
export const RegionSelector: React.FC<RegionSelectorProps> = ({ options, label = 'Region' }) => {
    const classes = useStyles();

    const handleClick = (index: string) => {
        console.log(index);
    };

    return (
        /* Region Grid Container */
        <Grid container item className={classes.root}>
            <Grid item>
                <Typography variant="h6">{label}</Typography>
                <GroupedButtons options={options} action={handleClick} />
            </Grid>
        </Grid>
    );
};

export default RegionSelector;
