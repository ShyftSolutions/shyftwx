import React from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

/**
 * Uses Material UI to create a back button
 */

const useStyles = makeStyles((theme) => ({
    root: {
        variant: 'contained',
        backgroundColor: theme.palette.primary.dark,
        boxShadow: theme.shadows[3],
        '&:hover': {
            backgroundColor: theme.palette.primary.dark
        },
        ariaLabel: 'back',
        maxWidth: '100%',
        minWidth: '100%',
        maxHeight: 30,
        minHeight: 15
    },
    icon: {
        color: theme.palette.primary.contrastText,
    }
}));

/**
 * Creates a Material UI button with a backwards-facing button
 *
 * @param action to be executed upon clicking the BackButton
 */
export const BackButton: React.FC<TimeNavigationButtonProps> = ({ action }) => {
    const classes = useStyles();

    return (
        <Button onClick={action} className={classes.root}>
            <NavigateBeforeIcon className={classes.icon} />
        </Button>
    );
};

export default BackButton;
