import React from 'react';
import { createStyles, makeStyles, TextField } from '@material-ui/core/';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '35ch'
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

/**
 *
 * Uses Material UI to create a textfield labeled with the string
 * value stored in the 'label' parameter
 *
 * @param action
 * @param label
 * @param state
 * @param value
 */
export const BasicTextField: React.FC<TextFieldProps> = ({ action, label, state, helperText }) => {
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
                    helperText={helperText}
                />
            </form>
        ),
        error: (
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
        )
    };

    return textFieldStates[state];
};

export default BasicTextField;
