import React from 'react';
import { makeStyles, createStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1)
            }
        }
    })
);

/**
 * Uses Material UI to create a button labeled with the string
 * value stored in the 'text' parameter
 *
 * @param text on button
 * @param action function that occurs when the button is clicked
 */
export const BasicButton: React.FC<BasicButtonProps> = ({ action, text = 'Next' }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button variant="contained" color="primary" size="large" onClick={action}>
                {text}
            </Button>
        </div>
    );
};

export default BasicButton;
