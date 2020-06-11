import { makeStyles, ButtonGroup, Button } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        boxShadow: theme.shadows[3]
    },
    defaultButton: {
        backgroundColor: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        }
    },
    selectedButton: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        fontWeight: 800,
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
 * @param Props: { options: string[]}
 */
export const GroupedButtons = (Props: { options: string[], action: any}) => {
    const classes = useStyles();
    const { options, action } = Props;
    const [selected, setSelected] = useState(options[0]);
    
    const handleClick = (index: string) => {
        setSelected(index);
        action(index);
    }
    return (
        <ButtonGroup className={classes.root}>
            {options.map((option: string) => (
                <Button
                    key={option}
                    name='group-button'
                    onClick={() => handleClick(option)}
                    className={selected === option ? classes.selectedButton : classes.defaultButton}
                >{option}</Button>
            ))}
        </ButtonGroup>
    );
};
export default GroupedButtons;