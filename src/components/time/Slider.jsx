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
        backgroundColor: theme.palette.secondary.contrastText,
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

function ValueLabelComponent(props) {
    const { children, value } = props;

    const LightTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: theme.palette.primary.darkText,
            color: theme.palette.secondary.contrastText,
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

export const DiscreteSlider = ({ settings }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Slider
                classes={classes}
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                track={false}
                step={settings.stepValue}
                marks={settings.marks}
                defaultValue={settings.marks[0].value}
                max={settings.maxValue}
                ValueLabelComponent={ValueLabelComponent}
            />
        </div>
    );
};

export default DiscreteSlider;
