import React from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '200%',
        maxHeight: '100%',
        minWidth: '100%',
        minHeight: '100%',
        variant: 'contained',
        backgroundColor: theme.palette.primary.dark,
        boxShadow: theme.shadows[3],
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
        ariaLabel: "back",
    },
    icon: {
        color: theme.palette.primary.contrastText
    }
}))

export const BackButton: React.FC<TimeNavigationButtonProps> = ({action}) => {
    const classes = useStyles();

    return (
        <Button onClick={action} className={classes.root} >
            <NavigateBeforeIcon className={classes.icon}/>
        </Button>
    );
}

export default BackButton
