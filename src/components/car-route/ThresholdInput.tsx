import React from 'react';
import { Paper, Typography, makeStyles, Grid, Fab } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import ThresholdSlider from '../slider/ThresholdSlider';
import SimpleSelect from '../dropdown/SimpleSelect';
import { convertUnits } from './../../utils/unitConverter';
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

// const defaultThresholdValues = {
//     wind: [5, 10], // mph
//     temp: [32, 70], // F
//     precip: [1, 2]  // in/hr
// }

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
}

export const ThresholdInput: React.FC<ThresholdInputProps> = ({ impact, action, unitAction, sliderValues }) => {
    const classes = useStyles();
    // const [values, setValues] = React.useState<number[]>(sliderValues?.threshold || []);
    // const [isGreaterThan, setIsGreaterThan] = React.useState(sliderValues?.greaterThan || true);
    // const [unit, setUnit] = React.useState<string>(sliderValues?.unit || unitOptions[impact][0]);


    // if (values.length === 0) {
        // setValues(defaultThresholdValues[impact]);
        // action({ threshold: defaultThresholdValues[impact], greaterThan: isGreaterThan, unit: unit });
    // }

    const handleThresholdChange = (newValues: number[]) => {
        const newThreshold: Threshold = {
            ...sliderValues,
            threshold: newValues
        }
        action(newThreshold);
    };

    const onClick = () => {
        action({ ...sliderValues, greaterThan: !sliderValues.greaterThan });
        // setIsGreaterThan(!isGreaterThan);
    };

    const handleUnitChange = (newUnit: string) => {
        // setValues(convertUnits(unit, newUnit, values))
        // setUnit(newUnit);
        unitAction(newUnit);
    }

    console.log(unitMinMaxes, sliderValues.unit);
    console.log(unitMinMaxes['temp'][sliderValues.unit]);

    const sliders = {
        wind: (
            <ThresholdSlider
                key="wind"
                label="Wind"
                min={unitMinMaxes['wind'][sliderValues.unit]?.min || 0}
                max={unitMinMaxes['wind'][sliderValues.unit]?.max || 100}
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
                min={unitMinMaxes['temp'][sliderValues.unit]?.min || 0}
                max={unitMinMaxes['temp'][sliderValues.unit]?.max || 100}
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
                min={unitMinMaxes['precip'][sliderValues.unit]?.min || 0}
                max={unitMinMaxes['precip'][sliderValues.unit]?.max || 100}
                values={sliderValues.threshold}
                units={sliderValues.unit}
                onChange={(values) => handleThresholdChange(values)}
                isGreaterThan={sliderValues.greaterThan}
            />
        )
    };

    console.log()
    console.log('returning...', sliderValues);

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
