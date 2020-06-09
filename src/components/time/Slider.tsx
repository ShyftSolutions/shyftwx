import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 600,
        color: theme.palette.primary.dark,
        height: 20,
        margin: 0,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: theme.palette.primary.contrastText,
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    rail: {
        height: 5,
        borderRadius: 4,
    },
    markLabelActive: {
        fontWeight: 700,
        padding: 12,
    },
    markLabel: {
        fontWeight: 500,
        padding: 12,
    },
    mark: {
        backgroundColor: theme.palette.primary.dark,
        height: 5,
    },
}));

function ValueLabelComponent(Props: { children: any; value: number; }) {
    const { children, value } = Props;

    const LightTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            boxShadow: theme.shadows[1],
            fontSize: 16,
        },
    }))(Tooltip);

    return (
        <span>
            <LightTooltip placement="top" title={value + ' + Model Run'}>
                {children}
            </LightTooltip>
        </span>
    );
}


export const DiscreteSlider = (Props: { options: any }) => {
    const{options} = Props;
    const classes = useStyles();
    const stepValue: number = options[1].value - options[0].value;
    const defaultValue: number = options[0].value;
    const maxValue: number = options[options.length - 1].value;

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
            />
        </div>
    );
};

export default DiscreteSlider;
