import { makeStyles, ButtonGroup, Button } from '@material-ui/core';
<<<<<<< HEAD
import React, {useState} from 'react';
=======
import React from 'react';
>>>>>>> e13606ffe43ad64215ee8a180e302f3e09227ba4

const useStyles = makeStyles((theme) => ({
    default: {
        backgroundColor: '#cccccc',
    },
    selected: {
        backgroundColor: '#4287f5',
    }
}));


export const BasicButtonGroup = ({ buttonOptions, onOptionClick }) => {
    const classes = useStyles();

    const handleClick = (option) => {
        if(onOptionClick) {
            onOptionClick(option);
        }
        
    }

    return (
        <ButtonGroup>
            {buttonOptions.map(option => (
                <Button className={option.selected ? classes.selected : classes.default} onClick={() => handleClick(option)}>{option.name}</Button>
            ))}
        </ButtonGroup>
    );
};

export default BasicButtonGroup;
