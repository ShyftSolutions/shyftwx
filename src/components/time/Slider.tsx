import React from 'react';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigationAction } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.primary.dark,
        height: 20,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: theme.palette.primary.contrastText,
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit'
        }
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)'
    },
    rail: {
        height: 5,
        borderRadius: 4
    },
    markLabelActive: {
        fontWeight: 700,
        padding: 12
    },
    markLabel: {
        fontWeight: 500,
        padding: 12
    },
    mark: {
        backgroundColor: theme.palette.primary.dark,
        height: 5
    }
}));

interface Props {
    children: React.ReactElement;
    open: boolean;
    value: number;
}

function ValueLabelComponent(props: Props) {
    const { children, open, value } = props;

    return (
        <span>
            <Tooltip open={open} enterTouchDelay={0} placement="top" title={value + ' + Model Run'}>
                {children}
            </Tooltip>
        </span>
    );
}

/**
 * Sorts the objects by their values
 * 
 * @param a first comparator
 * @param b second comparator
 */
const compare = (a, b) => {

    const valA = Number(a.value);
    const valB = Number(b.value);

    let comparison = 0;
    if (valA > valB) {
        comparison = 1;
    } else if (valA < valB) {
        comparison = -1;
    }
    return comparison;
}

const toHour = (options) => {
    options.map((option) => {
        option.label = option.value/3600 + "H";
        option.value = option.value;
    })
}


export const DiscreteSlider: React.FC<SliderProps> = ({ options, action, selected, modelTime }) => {
    const classes = useStyles();

    //sort the array of objects by the value property
    options.sort(compare);
    toHour(options);

    const stepValue: number = Number(options[1].value) - Number(options[0].value);
    const defaultValue: number = Number(options[0].value);
    const maxValue: number = Number(options[options.length - 1].value);

    const handleChangeCommitted = (e: React.ChangeEvent<{}>, value: number | number[]) => {
        action(value as number);
    };

    return (
        <div className={classes.root}>
            <Slider
                classes={classes}
                valueLabelDisplay="auto"
                aria-label="pretty slider"
                track={false}
                step={stepValue}
                marks={options}
                defaultValue={defaultValue}
                max={maxValue}
                ValueLabelComponent={ValueLabelComponent}
                onChange={handleChangeCommitted}
                value={selected}
            />
        </div>
    );
};

export default DiscreteSlider;
