import { Button, ButtonGroup, makeStyles } from '@material-ui/core';

import React from 'react';

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
 * @param Props: { options: string[]}
 */
export const GroupedButtons: React.FC<GroupedButtonsProps> = ({ items, action }) => {
    const classes = useStyles();

    const handleClick = (item: GroupedButtonItem) => {
        action(item);
    };

    return (
        <ButtonGroup className={classes.root}>
            {items.map((item, index) => (
                <Button
                    key={`${item.value}${index}`}
                    name="group-button"
                    onClick={() => handleClick(item)}
                    className={item.selected ? classes.selectedButton : classes.defaultButton}
                >
                    {item.value}
                </Button>
            ))}
        </ButtonGroup>
    );
};

export default GroupedButtons;
