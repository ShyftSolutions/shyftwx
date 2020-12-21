import React from 'react';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

/**
 * Uses Material UI slider to create a responsive time for forecast hours and
 * valid times
 */
const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.primary.main,
        height: 300
    },
    thumb: {
        height: 18,
        width: 18,
        backgroundColor: theme.palette.secondary.light,
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit'
        }
    },
    rail: {
        height: 5,
        borderRadius: 4
    },
    markLabelActive: {
        fontWeight: 700,
        padding: 10
    },
    markLabel: {
        fontWeight: 500,
        padding: 10
    },
    mark: {
        backgroundColor: theme.palette.primary.dark,
        height: 5
    },
    vertical: {
        '& $rail': {
            width: 5
        },
        '& $track': {
            width: 5
        },
        '& $mark': {
            width: 5,
            height: 1
        },
        '& $thumb': {
            marginLeft: -6,
            marginBottom: -8
        }
    }
}));

/**
 * Creates a material UI slider with marks and props based on the values
 * passed in through the options prop
 *
 * @param options array of objects consisting of a value and a label property
 * @param action function to be executed when a change occurs on the slider
 * @param selected the current selected value on the slider based on parent component
 */
export const DiscreteSlider: React.FC<SliderProps> = ({ options, action, selected }) => {
    const classes = useStyles();

    // define the props for the slider based on the options prop
    const stepValue: number = options[1].value - options[0].value;
    const maxValue: number = options[options.length - 1].value;
    const minValue: number = options[0].value;

    const handleChangeCommitted = (e: React.ChangeEvent<{}>, value: number | number[]) => {
        action(value as number);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Slider
                classes={classes}
                aria-label="pretty slider"
                track={false}
                step={stepValue}
                marks={options}
                max={maxValue}
                onChange={handleChangeCommitted}
                value={selected}
                min={minValue}
                orientation="vertical"
            />
        </div>
    );
};

export default DiscreteSlider;
