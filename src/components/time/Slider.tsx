import React from 'react';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 600,
        color: theme.palette.primary.dark,
        height: 20,
        margin: 0
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

export const DiscreteSlider = (Props: { options: any }) => {
    const { options } = Props;
    const classes = useStyles();
    const stepValue: number = Number(options[1].value) - Number(options[0].value);
    const defaultValue: number = Number(options[0].value);
    const maxValue: number = Number(options[options.length - 1].value);

    const onChange = () => {};

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
