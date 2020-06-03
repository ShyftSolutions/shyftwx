import { makeStyles, ButtonGroup, Button } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    defaultButton: {
        backgroundColor: '#f8f9fa',
        '&:hover': {
            backgroundColor: '#e9ecef'
        }
    },
    selectedButton: {
        backgroundColor: '#329af0',
        color: '#f8f9fa',
        '&:hover': {
            backgroundColor: '#1c7cd6',
            color: '#f8f9fa',
        }
    }

}));


export const GroupedButtons = ({ defaultSettings }) => {
    const classes = useStyles();

    const [selected, setSelected] = useState(0);

    const handleClick = (index) => {
        setSelected(index);
    }

    return (
        <ButtonGroup>
            {defaultSettings.map((option, index) => (
                <Button
                    key={index}
                    name='group-button'
                    onClick={() => handleClick(index)}
                    className={selected === index ? classes.selectedButton : classes.defaultButton}
                >{option.name}</Button>
            ))}
        </ButtonGroup>
    );
};
export default GroupedButtons;
