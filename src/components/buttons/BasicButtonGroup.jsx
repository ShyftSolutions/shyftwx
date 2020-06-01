import { makeStyles, ButtonGroup, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { SET_OPTIONS } from '@storybook/addon-knobs';

const useStyles = makeStyles((theme) => ({
    default: {
        backgroundColor: '#cccccc',
    },
    selected: {
        backgroundColor: '#4287f5',
    }
}));


export const BasicButtonGroup = ({ defaultOptions, onOptionClick }) => {
    const classes = useStyles();

    const [options, setOptions] = useState(defaultOptions || []);

    const handleClick = (option) => {
        if (onOptionClick) {
            onOptionClick(option);
        }

        const newOptions = options.map((item, index) => {
            if (item !== option) {
                return item;
            }

            //This is the one we want - return an updated value
            return {
                ...item,
                selected: !option.selected,
            };
        });
        setOptions(newOptions);
    }
    return (
        <ButtonGroup>
            {options.map(option => (
                <Button className={option.selected ? classes.selected : classes.default} onClick={() => handleClick(option)}
                >{option.name}</Button>
            ))}
        </ButtonGroup>
    );
};
export default BasicButtonGroup;
