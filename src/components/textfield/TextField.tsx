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
                color: theme.palette.primary.main,
                fontWeight: 700
            }
        }
    })
);

export const BasicTextField: React.FC<TextFieldProps> = ({ action, label, state, value }) => {
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        action(event.target.value);
    };

    const textFieldStates = {
        initial: (
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label={label}
                    variant="outlined"
                    color="primary"
                    onChange={handleChange}
                    helperText={' '}
                />
            </form>
        ),
        empty: (
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    error
                    id="outlined-error"
                    label={label}
                    variant="outlined"
                    onChange={handleChange}
                    helperText={`Enter a ${label}`}
                />
            </form>
        ),
        edit: (
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label={label}
                    defaultValue={value}
                    variant="outlined"
                    color="primary"
                    onChange={handleChange}
                    helperText={' '}
                />
            </form>
        ),
        invalid: (
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    error
                    id="outlined-error"
                    label={label}
                    defaultValue={value}
                    variant="outlined"
                    onChange={handleChange}
                    helperText="Invalid customer or dataset ID entered"
                />
            </form>
        )
    };

    return textFieldStates[state];
};

export default BasicTextField;
