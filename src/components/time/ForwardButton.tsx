import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

/**
 * Uses Material UI to create a next button
 */

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.primary.dark,
        boxShadow: theme.shadows[3],
        ariaLabel: 'back',
        maxWidth: '100%',
        minWidth: '100%',
        maxHeight: 30,
        minHeight: 15
    }
}));

/**
 * Creates a Material UI button with a next button
 *
 * @param action to be executed upon clicking the NextButton
 */
export const ForwardButton: React.FC<TimeNavigationButtonProps> = ({ action }) => {
    const classes = useStyles();

    return (
        <Button onClick={action} className={classes.root} variant="outlined" color="primary">
            <NavigateNextIcon />
        </Button>
    );
};

export default ForwardButton;
