import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';

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
        backgroundColor: theme.palette.primary.dark,
        height: 5
    }

}));

function ValueLabelComponent(props) {
    const { children, value } = props;

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
            <LightTooltip placement='top' title={value + " + Model Run"} >
                {children}
            </LightTooltip>
        </span>
    );
}





export const DiscreteSlider = ({ defaultSettings }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Slider
                classes={{
                    root: classes.root,
                    thumb: classes.thumb,
                    active: classes.active,
                    valueLabel: classes.valueLabel,
                    rail: classes.rail,
                    markLabelActive: classes.markLabelActive,
                    markLabel: classes.markLabel,
                    mark: classes.mark
                }}
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                track={false}
                step={defaultSettings.stepValue}
                marks={defaultSettings.marks}
                defaultValue={defaultSettings.marks[0].value}
                max={defaultSettings.maxValue}
                ValueLabelComponent={ValueLabelComponent} />
        </div>
    );
}

export default DiscreteSlider;