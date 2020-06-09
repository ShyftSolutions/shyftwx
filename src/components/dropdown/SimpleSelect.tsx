import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
        boxShadow: theme.shadows[3]
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    label: {
        align: 'center'
    },
    dropdown: {
        background: theme.palette.primary.contrastText,
    },
    items: {
        background: theme.palette.primary.contrastText,
        '&:hover': {
            background: theme.palette.primary.main,
        }
    },
}));

/**
 * Uses Material UI to create a dropdown menu option with
 * the options of the String values in 'options'
 *
 * @param Props: {options: string[]}
 */
export default function SimpleSelect(Props: {options: string[], action: Function}) {
    const classes = useStyles();
    const { options } = Props;
    const { action } = Props;

    const [state, setState] = React.useState({
        modelRun: {},
        name: 'Selector',
    });

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof state;
        setState({
            ...state,
            [name]: event.target.value,
        });
        action(event.target.value);
    };


    return (
        <div>
            <FormControl variant='outlined' className={classes.formControl}>
                <Select
                    classes={{select: classes.dropdown}}
                    id='simple-select'
                    defaultValue={options[0]}
                    onChange={handleChange}
                >
                    {options.map((option: string) => (
                        <MenuItem color="primary" key={option} className={classes.items} value={option}>{option}</MenuItem>
                    ))}

                </Select>
            </FormControl>
        </div>
    );
}