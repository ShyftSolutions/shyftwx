import React from 'react';
import { Paper, Typography, makeStyles, Grid, Fab } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import ThresholdSlider from '../slider/ThresholdSlider';
import SimpleSelect from '../dropdown/SimpleSelect';
import { Units } from './../../utils/Units';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        padding: 10,
        backgroundColor: '#E9ECEF'
    },
    slider: {
        backgroundColor: '#E9ECEF',
        width: '100%'
    },
    text: {
        fontWeight: 500,
        fontSize: '1em',
        [theme.breakpoints.down('sm')]: {
            fontSize: '.75em'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '.75em'
        }
    },
    unitText: {
        fontSize: '.8em',
        fontWeight: 500,
        [theme.breakpoints.down('sm')]: {
            fontSize: '.7em'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '.7em'
        },
        paddingRight: 10
    }
}));

const unitOptions = {
    wind: [Units.MPH, Units.KPH],
    precip: [Units.IN_HR, Units.MM_HR],
    temp: [Units.F, Units.C]
};

const unitMinMaxes = {
    wind: {
        [Units.MPH]: {
            min: 0,
            max: 40
        },
        [Units.KPH]: {
            min: 0,
            max: 64
        }
    },
    precip: {
        [Units.IN_HR]: {
            min: 0,
            max: 10
        },
        [Units.MM_HR]: {
            min: 0,
            max: 250
        }
    },
    temp: {
        [Units.F]: {
            min: -30,
            max: 140
        },
        [Units.C]: {
            min: -34,
            max: 60
        }
    }
};

export const ThresholdInput: React.FC<ThresholdInputProps> = ({ impact, action, unitAction, sliderValues }) => {
    const classes = useStyles();

    const handleThresholdChange = (newValues: number[]) => {
        const newThreshold: Threshold = {
            ...sliderValues,
            threshold: newValues
        };
        action(newThreshold);
    };

    const onClick = () => {
        action({ ...sliderValues, greaterThan: !sliderValues.greaterThan });
    };

    const handleUnitChange = (newUnit: string) => {
        unitAction(newUnit);
    };

    const sliders = {
        wind: (
            <ThresholdSlider
                key="wind"
                label="Wind"
                min={unitMinMaxes.wind[sliderValues.unit]?.min || 0}
                max={unitMinMaxes.wind[sliderValues.unit]?.max || 100}
                values={sliderValues.threshold}
                units={sliderValues.unit}
                onChange={(values) => handleThresholdChange(values)}
                isGreaterThan={sliderValues.greaterThan}
            />
        ),
        temp: (
            <ThresholdSlider
                key="temp"
                label="Temp"
                min={unitMinMaxes.temp[sliderValues.unit]?.min || 0}
                max={unitMinMaxes.temp[sliderValues.unit]?.max || 100}
                values={sliderValues.threshold}
                units={sliderValues.unit}
                onChange={(values) => handleThresholdChange(values)}
                isGreaterThan={sliderValues.greaterThan}
            />
        ),
        precip: (
            <ThresholdSlider
                key="precip"
                label="Precip"
                min={unitMinMaxes.precip[sliderValues.unit]?.min || 0}
                max={unitMinMaxes.precip[sliderValues.unit]?.max || 100}
                values={sliderValues.threshold}
                units={sliderValues.unit}
                onChange={(values) => handleThresholdChange(values)}
                isGreaterThan={sliderValues.greaterThan}
            />
        )
    };

    return (
        <Paper className={classes.paper}>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <Typography className={classes.text}>Define Impact Thresholds:</Typography>
                </Grid>

                <Grid container item justify="center" alignItems="center" xs={12} spacing={1}>
                    <Grid container item xs justify="center">
                        <Fab onClick={onClick} color="primary" size="small">
                            {sliderValues.greaterThan ? <ChevronRight /> : <ChevronLeft />}
                        </Fab>
                    </Grid>
                    <Grid item xs lg={10} md={9} sm={9}>
                        {sliders[impact]}
                    </Grid>
                </Grid>

                <Grid container item alignItems="center" xs={6}>
                    <Typography className={classes.unitText}>Units:</Typography>
                    <SimpleSelect action={handleUnitChange} choices={unitOptions[impact]} />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ThresholdInput;
