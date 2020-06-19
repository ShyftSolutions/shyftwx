import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

/**
 * Uses Material UI to create a next button
 */

const useStyles = makeStyles((theme) => ({
    root: {
        flexShrink: 3
    },
    button: {
        variant: 'contained',
        size: 'small',
        backgroundColor: theme.palette.primary.dark,
        boxShadow: theme.shadows[3],
        '&:hover': {
            backgroundColor: theme.palette.primary.dark
        },
        ariaLabel: 'forward',
        maxWidth: 50,
        minWidth: 15

    },
    icon: {
        color: theme.palette.primary.contrastText
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
        <Button onClick={action} className={classes.button}>
            <NavigateNextIcon className={classes.icon} />
        </Button>
    );
};

export default ForwardButton;
