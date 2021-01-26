import { Button, createStyles, makeStyles } from '@material-ui/core';
import React from 'react';

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
export const BasicButton: React.FC<BasicButtonProps> = ({ onClick: action, text = 'Next', type = 'blue' }) => {
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

    return <div className={classes.root}>{buttonStyles[type]}</div>;
};

export default BasicButton;
