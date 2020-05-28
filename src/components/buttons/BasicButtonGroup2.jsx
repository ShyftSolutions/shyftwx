import { makeStyles, ButtonGroup, Button } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        fillColor: '#4287f5',
        ariaLabel: "outlined primary button group"
    },
}));

export const BasicButtonGroup2 = () => {
    const classes = useStyles();

    return (
        <ButtonGroup className={classes.root} >
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
        </ButtonGroup>
    );
};

export default BasicButtonGroup2;
