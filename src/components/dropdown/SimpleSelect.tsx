import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

/**
 * SimpleSelect creates a vertical dropdown menu where the options on the menu
 * are defined in an array of strings called 'options'
 */
const useStyles = makeStyles((theme) => ({
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    label: {
        align: 'center'
    },
    dropdown: {
        backgroundColor: 'white',
        fontSize: '.8em',
        fontWeight: 500,
        [theme.breakpoints.down('sm')]: {
            fontSize: '.7em'
        },
        padding: '10px 0px 10px 10px',
        borderWidth: 2,
        borderRadius: 8,
        '&:focus': {
            background: 'white',
            borderColor: theme.palette.primary
        }
    },
    items: {
        background: 'white'
    },
    list: {
        paddingTop: 0,
        paddingBottom: 0,
        background: 'white',
        borderLeftWidth: '0px',
        '& li.Mui-selected': {
            fontWeight: 700
        }
    },
    disabled: {
        color: '#212529'
    }
}));

/**
 * Uses Material UI to create a dropdown menu option with
 * the options of the String values in 'options'
 *
 * @param options string[]
 * @param action function to be executed to set the selected value
 */
export const SimpleSelect: React.FC<SimpleSelectProps> = ({ choices, action, label }) => {
    const classes = useStyles();

    const [selectedValue, setSelectedValue] = React.useState(choices[0]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedValue(event.target.value as string);
        action(event.target.value as string);
    };

    let oneChoice: boolean = false;
    if (choices.length === 1) {
        oneChoice = true;
    }

    return (
        <div>
            <FormControl variant="outlined" style={{ margin: '5px auto' }}>
                <InputLabel id="select-input-label">{label}</InputLabel>
                <Select
                    classes={{ select: classes.dropdown, disabled: classes.disabled }}
                    id="simple-select"
                    value={selectedValue}
                    onChange={handleChange}
                    disabled={oneChoice}
                    label={label}
                    MenuProps={{
                        classes: {
                            list: classes.list
                        }
                    }}
                >
                    {choices.map((option: string) => (
                        <MenuItem color="primary" key={option} className={classes.items} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default SimpleSelect;
