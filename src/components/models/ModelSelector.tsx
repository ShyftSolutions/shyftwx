import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) =>
    createStyles({
        formControl: {
            'box-sizing': 'content-box',
            margin: '28px 14px 28px 14px',
            width: '90%'
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        },
        list: {
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #e9ecef',
            background: '#e9ecef',
            '& li.Mui-selected': {
                fontWeight: 700,
                borderRadius: '5px',
                borderLeftWidth: '0px'
            },
            '& li.Mui-selected:hover': {
                borderLeftWidth: '0px'
            }
        },
        paper: {
            left: '278px'
        },
        disabled: {
            color: '#212529'
        }
    })
);

export const ModelSelector: React.FC<ModelSelectorProps> = ({ options, label = 'Model', action }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(options[0]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValue(event.target.value as string);
        action(event.target.value as string);
    };

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="model-select-input-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={value}
                onChange={handleChange}
                disabled={options.length === 1}
                label={label}
                MenuProps={{
                    classes: {
                        paper: classes.paper,
                        list: classes.list
                    }
                }}
                classes={{ disabled: classes.disabled }}
            >
                {options.map((option: string) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default ModelSelector;
