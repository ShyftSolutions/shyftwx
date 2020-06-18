import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

/**
 * Uses Material UI to create a next button
 */

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '25%',
        maxHeight: '50%',
        minWidth: '25%',
        minHeight: '50%',
        variant: 'contained',
        backgroundColor: theme.palette.primary.dark,
        boxShadow: theme.shadows[3],
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
        ariaLabel: 'forward'
    },
    icon: {
        color: theme.palette.primary.contrastText,
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
        <Button onClick={action} className={classes.root}>
            <NavigateNextIcon className={classes.icon} />
        </Button>
    );
};

export default ForwardButton;
