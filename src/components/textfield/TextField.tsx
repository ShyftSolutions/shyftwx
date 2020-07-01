import React from 'react';
import { createStyles, makeStyles, TextField } from '@material-ui/core/';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '30ch'
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

export const BasicTextField: React.FC<TextFieldProps> = ({ action, label, state, helperText }) => {
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        action(event.target.value);
    };

    if (state === 'empty') {
        return (
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    error
                    id="outlined-error"
                    label={label}
                    variant="outlined"
                    onChange={handleChange}
                    helperText={helperText}
                />
            </form>
        );
    } else {
        return (
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label={label}
                    variant="outlined"
                    color="secondary"
                    onChange={handleChange}
                    helperText={helperText}
                />
            </form>
        );
    }
};

export default BasicTextField;
