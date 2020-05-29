import { makeStyles, ButtonGroup, Button } from '@material-ui/core';
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
        color:'#4287f5',
     ariaLabel: "outlined primary button group",
    },
}));

export const BasicButtonGroup = ({buttonOptions}) => {
    const classes = useStyles();

    return (
        <ButtonGroup className={classes.root} >
            {buttonOptions.map(option => (
                <Button>{option}</Button>
            ))}
        </ButtonGroup>
    );
};

export default BasicButtonGroup;
