import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleSelect() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        modelRun: '',
        name: 'hai',
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
            <FormControl variant="outlined" className={classes.formControl}>

                <Select
                    id="demo-simple-select-outlined"
                    defaultValue={10}
                    onChange={handleChange}
                >

                    <MenuItem value={10}>2020-05-27T12:00:00Z</MenuItem>
                    <MenuItem value={20}>2020-05-27T06:00:00Z</MenuItem>
                    <MenuItem value={30}>2020-05-27T11:00:00Z</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}