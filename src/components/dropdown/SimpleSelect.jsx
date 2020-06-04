import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

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
        background: theme.palette.secondary.contrastText,
    },
    items: {
        background: theme.palette.secondary.contrastText,
        '&:hover': {
            background: theme.palette.primary.main,
        }
    },
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
                    classes={{select: classes.dropdown}}
                    id='simple-select'
                    defaultValue={defaultSettings[0].name}
                    onChange={handleChange}
                >
                    {defaultSettings.map((option, index) => (
                        <MenuItem color="primary" key={index} className={classes.items} value={option.name}>{option.name}</MenuItem>
                    ))}

                </Select>
            </FormControl>
        </div>
    );
}