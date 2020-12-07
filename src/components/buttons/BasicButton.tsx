import React from 'react';
import { makeStyles, createStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1)
            }
        },
        gradient: {
            background: 'linear-gradient(-139deg, #F0329A 0%, #FF922B 100%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 60,
            padding: '0 30px',
            boxShadow: theme.shadows[3],
            fontWeight: 800,
            fontSize: '1.25em'
        },
        disabled: {
            borderRadius: 3,
            height: 60,
            padding: '0 30px',
            fontWeight: 800,
            fontSize: '1.25em'
        }
    })
);

/**
 * Uses Material UI to create a button labeled with the string
 * value stored in the 'text' parameter
 *
 * @param text on button
 * @param action function that occurs when the button is clicked
 * @param style
 */
export const BasicButton: React.FC<BasicButtonProps> = ({ action, text = 'Next', style = 'blue' }) => {
    const classes = useStyles();

    const buttonStyles = {
        blue: (
            <Button variant="contained" color="primary" size="large" onClick={action}>
                {text}
            </Button>
        ),
        disabled: (
            <Button variant="contained" color="primary" size="large" disabled>
                {text}
            </Button>
        ),
        gradient: (
            <Button className={classes.gradient} size="large" onClick={action}>
                {text}
            </Button>
        ),
        disabledGradient: (
            <Button className={classes.disabled} variant="contained" size="large" disabled>
                {text}
            </Button>
        )
    };

    return <div className={classes.root}>{buttonStyles[style]}</div>;
};

export default BasicButton;
