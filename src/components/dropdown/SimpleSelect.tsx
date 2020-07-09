import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

/**
 * SimpleSelect creates a vertical dropdown menu where the options on the menu
 * are defined in an array of strings called 'options'
 */

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
        boxShadow: theme.shadows[3],
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    label: {
        align: 'center',
    },
    dropdown: {
        background: theme.palette.primary.contrastText,
    },
    items: {
        background: theme.palette.primary.contrastText,
        '&:hover': {
            background: theme.palette.primary.main,
        },
    },
}));

/**
 * Uses Material UI to create a dropdown menu option with
 * the options of the String values in 'options'
 *
 * @param options string[]
 * @param action function to be executed to set the selected value
 */
export const SimpleSelect: React.FC<SimpleSelectProps> = ({ choices, action }) => {
    const classes = useStyles();

    const [selectedValue, setSelectedValue] = React.useState(choices[0]);

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name;

        if (name) {
            setSelectedValue(name);
            action(name);
        }
    };

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <Select
                    classes={{ select: classes.dropdown }}
                    id="simple-select"
                    value={selectedValue}
                    onChange={handleChange}
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
