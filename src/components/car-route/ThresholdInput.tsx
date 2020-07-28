import React from 'react';
import { Paper, Typography, makeStyles, Grid } from '@material-ui/core';
import ThresholdSlider from '../slider/ThresholdSlider';
import SimpleSelect from '../dropdown/SimpleSelect';
import BasicSwitch from '../switch/BasicSwitch';

const useStyles = makeStyles((theme) => ({
    paper: {
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
        [theme.breakpoints.down('sm')]: {
            fontSize: '.7em'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '.7em'
        },
        paddingRight: 10
    }
}));

const defaultThresholdValues = {
    wind: [5, 10],
    temp: [32, 70],
    precip: [1, 2]
};

const unitOptions = {
    wind: ['mph', 'kph'],
    precip: ['in/hr', 'mm/hr'],
    temp: ['°F', '°C']
};

export const ThresholdInput: React.FC<ThresholdInputProps> = ({ impact }) => {
    const classes = useStyles();
    const [values, setValues] = React.useState(defaultThresholdValues[impact]);

    const handleThresholdChange = (values: number[]) => {
        setValues(values);
    };

    const sliders = {
        wind: (
            <ThresholdSlider
                key="wind"
                label="Wind"
                min={0}
                max={40}
                values={values}
                units="kt"
                onChange={(values) => handleThresholdChange(values)}
            />
        ),
        temp: (
            <ThresholdSlider
                key="temp"
                label="Temp"
                min={-30}
                max={140}
                values={values}
                units="C"
                onChange={(values) => handleThresholdChange(values)}
            />
        ),
        precip: (
            <ThresholdSlider
                key="precip"
                label="Precip"
                min={0}
                max={10}
                values={values}
                units="inches"
                onChange={(values) => handleThresholdChange(values)}
            />
        )
    };

    return (
        <Paper className={classes.paper}>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <Typography className={classes.text}>Define Impact Thresholds:</Typography>
                </Grid>

                <Grid container item justify="center" xs={12}>
                    <Grid item xs={1} />
                    <Grid item xs={11}>
                        {sliders[impact]}
                    </Grid>
                </Grid>

                <Grid container item direction="row" alignItems="center">
                    <Grid container item alignItems="center" xs={6}>
                        <Typography className={classes.unitText}>Units:</Typography>
                        <SimpleSelect choices={unitOptions[impact]} />
                    </Grid>
                    < Grid container item alignItems="center" justify="flex-end" xs={6}>
                        <Typography className={classes.unitText}>Greater/Less Than:</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ThresholdInput;
