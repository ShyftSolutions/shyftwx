import { Button, ButtonGroup, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';

/**
 * GroupedButtons creates a horizontal group of buttons using the Material UI component library.
 */

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        boxShadow: theme.shadows[3]
    },
    defaultButton: {
        backgroundColor: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light
        }
    },
    selectedButton: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        fontWeight: 800,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText
        }
    }
}));

/**
 * Uses Material UI to create a group of buttons labeled with the string
 * values stored in the 'options' parameter
 *
 * @param options string[]
 * @param action function that takes in an 'option' to set as the selected button for the group
 */
export const GroupedButtons: React.FC<GroupedButtonsProps> = ({ options = ['1', '2', '3'], action }) => {
    const classes = useStyles();

    const [selected, setSelected] = useState(options[0]);

    const handleClick = (option: string) => {
        setSelected(option);
        action(option);
    };
    return (
        <ButtonGroup className={classes.root}>
            {options.map((option: string) => (
                <Button
                    key={option}
                    name="group-button"
                    onClick={() => handleClick(option)}
                    className={selected === option ? classes.selectedButton : classes.defaultButton}
                >
                    {option}
                </Button>
            ))}
        </ButtonGroup>
    );
};
export default GroupedButtons;
