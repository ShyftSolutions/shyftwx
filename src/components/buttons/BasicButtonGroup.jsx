import { makeStyles, ButtonGroup, Button } from '@material-ui/core';
import React, {useState} from 'react';

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
