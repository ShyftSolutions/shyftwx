import { makeStyles, ButtonGroup, Button } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    defaultButton: {
        backgroundColor: '#cccccc',
        fontWeight: '300',
        '&:hover': {
            backgroundColor: '#dddddd'
        }
    },
    selectedButton: {
        backgroundColor: '#4287f5',
        color: '#f2f2f2',
        fontWeight: '600',
        '&:hover': {
            backgroundColor: '#72a5f7'
        }
    }

}));


export const BasicButtonGroup = ({ defaultOptions }) => {
    const classes = useStyles();

    const [selected, setSelected] = useState(0);

    const handleClick = (index) => {
        setSelected(index);
    }

    return (
        <ButtonGroup>
            {defaultOptions.map((option, index) => (
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
export default BasicButtonGroup;
