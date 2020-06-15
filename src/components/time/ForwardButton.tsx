import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '100%',
      maxHeight: '100%',
      minWidth: '100%',
      minHeight: '100%',
        variant: 'contained',
        backgroundColor: theme.palette.primary.dark,
        boxShadow: theme.shadows[3],
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
        ariaLabel: "forward",

    },
    icon: {
        color: theme.palette.primary.contrastText,
    }
}))

export const ForwardButton: React.FC<TimeNavigationButtonProps> = ({action}) => {
    const classes = useStyles();

    return (
        <Button onClick={action} className={classes.root} >
            <NavigateNextIcon className={classes.icon}/>
        </Button>
    );
}

export default ForwardButton;
