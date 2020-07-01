import React from 'react';
import { createStyles, makeStyles, TextField } from '@material-ui/core/';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch'
            }
        },
        textField: {
            '& label.Mui-focused': {
                color: theme.palette.secondary.main,
                fontWeight: 700
            }
        }
    })
);

export const BasicTextField: React.FC<TextFieldProps> = ({ action, label }) => {
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        action(event.target.value);
    };

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                className={classes.textField}
                id="outlined-basic"
                label={label}
                variant="outlined"
                color="secondary"
                onChange={handleChange}
            />
        </form>
    );
};

export default BasicTextField;
