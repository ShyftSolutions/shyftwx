import { makeStyles, ButtonGroup, Button } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        color:'#000000',
     ariaLabel: "outlined primary button group"
    },
}));

export const BasicButtonGroup = () => {
    const classes = useStyles();

    return (
        <ButtonGroup className={classes.root} >
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
        </ButtonGroup>
    );
};

export default BasicButtonGroup;
