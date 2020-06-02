import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        padding: 40,
    },
    margin: {
        height: theme.spacing(3),
    },

}));

function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <span>
            <Tooltip open={open} enterTouchDelay={2} placement='top' title={value}>
                {children}
            </Tooltip>
        </span>
    );
}


const PrettoSlider = withStyles({
    root: {
        color: '#4287f5',
        height: 5,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
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
        padding: 12
    },
    mark: {
        backgroundColor: '#4287f5',
        height: 5
    }
})(Slider);

export const DiscreteSlider = ({ marks }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <PrettoSlider
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                track={false}
                marks={marks}
                defaultValue={marks[0]}
                max={12}
                ValueLabelComponent={ValueLabelComponent} />
        </div>
    );
}

export default DiscreteSlider;