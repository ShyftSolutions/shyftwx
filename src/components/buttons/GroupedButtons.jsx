import { makeStyles, ButtonGroup, Button } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        boxShadow: theme.shadows[3]
    },
    defaultButton: {
        backgroundColor: '#f8f9fa',
        '&:hover': {
            backgroundColor: '#e9ecef'
        }
    },
    selectedButton: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
        }
    }

}));

/**
 * Uses Material UI to create a group of buttons labeled with the string
 * values stored in the 'options' parameter
 * 
 * @param {Array[String]} options 
 */
export const GroupedButtons = ({ options }) => {
    const classes = useStyles();

    const [selected, setSelected] = useState(0);

    const handleClick = (index) => {
        setSelected(index);
    }

    return (
        <ButtonGroup className={classes.root}>
            {options.map((option, index) => (
                <Button
                    key={option}
                    name='group-button'
                    onClick={() => handleClick(index)}
                    className={selected === index ? classes.selectedButton : classes.defaultButton}
                >{option}</Button>
            ))}
        </ButtonGroup>
    );
};

export default GroupedButtons;
