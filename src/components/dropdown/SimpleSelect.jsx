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
    },
    customSelected: {
        background: "#329af0"
    }
}));

export default function SimpleSelect({ defaultSettings }) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        modelRun: {},
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
            <FormControl variant='outlined' className={classes.formControl}>
                <Select
                    id='simple-select'
                    defaultValue={defaultSettings[0].name}
                    onChange={handleChange}
                >
                    {defaultSettings.map(option => (
                        <MenuItem classes={{selected: classes.customSelected}} value={option.name}>{option.name}</MenuItem>
                    ))}

                </Select>
            </FormControl>
        </div>
    );
}