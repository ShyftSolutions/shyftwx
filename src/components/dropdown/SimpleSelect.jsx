import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    label: {
        align: 'center'
    }
}));

export default function SimpleSelect({label, selectOptions}) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        modelRun: {label},
        name: 'Selector',
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    

    return (
        <div>
            <Typography variant='subtitle1' className={classes.label}>{label}</Typography>
            <FormControl variant='outlined' className={classes.formControl}>

                <Select
                    id='demo-simple-select-outlined'
                    defaultValue={selectOptions[0]}
                    onChange={handleChange}
                >
                    {selectOptions.map(option => (
                        <MenuItem value={option}>{option}</MenuItem>
                    ))}

                </Select>
            </FormControl>
        </div>
    );
}