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
