import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        padding: 10,
    },
    margin: {
        height: theme.spacing(3),
    },
    customMarkLabel: {
        backgroundColor: '#cccccc',
        fontWeight: 500,
        padding: 12

    },
    customMarkLabelActive: {
        backgroundColor: '#aaaaaa',
        fontWeight: 600,
        padding: 12,
    }

}));

export const DiscreteSlider = ({ marks }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Slider
                classes={{ markLabel: classes.customMarkLabel,
                markLabelActive: classes.customMarkLabelActive }}
                defaultValue={20}
                aria-labelledby="discrete-slider-custom"
                step={1}
                valueLabelDisplay="off"
                marks={marks}
                max={12}
                track={false}
            />
        </div>
    );
}

export default DiscreteSlider;