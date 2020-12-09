import React from 'react';
import { Paper, Grid, Typography, makeStyles } from '@material-ui/core';
import BasicButton from '../buttons/BasicButton';
import BasicCheckbox from '../checkbox/BasicCheckbox';
import ThresholdInput from './ThresholdInput';
import { Units } from '../../utils/Units';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: 10,
        paddingBottom: 20,
        overflow: 'auto',
        maxHeight: '70vh',
        [theme.breakpoints.down('sm')]: {
            minHeight: '40vh',
            minWidth: '60vw'
        },
        [theme.breakpoints.up('md')]: {
            minHeight: '40vh',
            minWidth: '30vw'
        }
    },
    grid: {
        minHeight: '60vh',
        minWidth: '30vw',
        [theme.breakpoints.up('md')]: {
            maxWidth: '35vw'
        }
    }
}));

const defaultThresholdValues = {
    wind: {
        [Units.MPH]: [5, 10],
        [Units.KPH]: [8, 16]
    },
    temp: {
        [Units.F]: [32, 70],
        [Units.C]: [0, 21]
    },
    precip: {
        [Units.IN_HR]: [1, 2],
        [Units.MM_HR]: [25, 50]
    }
};

export const WeatherInput: React.FC<WeatherInputProps> = ({
    onClick,
    onWindSliderChange,
    onPrecipSliderChange,
    onTempSliderChange,
    onTempUnitChange,
    onPrecipUnitChange,
    onWindUnitChange,
    windThreshold,
    tempThreshold,
    precipThreshold,
    onStart
}) => {
    const classes = useStyles();

    const [windChecked, setWindChecked] = React.useState(false);
    const [precipChecked, setPrecipChecked] = React.useState(false);
    const [tempChecked, setTempChecked] = React.useState(false);

    const handleWindChecked = (isChecked) => {
        setWindChecked(isChecked);
        onWindSliderChange({ ...windThreshold, threshold: defaultThresholdValues.wind[windThreshold.unit] });
    };
    const handlePrecipChecked = (isChecked) => {
        setPrecipChecked(isChecked);
        onPrecipSliderChange({ ...precipThreshold, threshold: defaultThresholdValues.precip[precipThreshold.unit] });
    };
    const handleTempChecked = (isChecked) => {
        setTempChecked(isChecked);
        onTempSliderChange({ ...tempThreshold, threshold: defaultThresholdValues.temp[tempThreshold.unit] });
    };

    return (
        <div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid container item direction="column" alignItems="center" justify="center">
                    <Paper className={classes.paper}>
                        <Grid
                            container
                            item
                            direction="column"
                            justify="space-between"
                            alignItems="center"
                            spacing={2}
                            className={classes.grid}
                        >
                            <Grid container item spacing={2}>
                                <Grid container item justify="flex-start">
                                    <BasicButton type="blue" text="back" action={onClick} />
                                </Grid>

                                <Grid container item justify="flex-start" style={{ border: '1px red' }}>
                                    <Grid item xs={2} />
                                    <Grid item xs={10}>
                                        <Typography color="secondary" variant="h5" gutterBottom>
                                            Set weather parameters:
                                        </Typography>
                                    </Grid>

                                    {/* Wind */}
                                    <Grid container item key="wind">
                                        <Grid item xs={2} />
                                        <Grid item xs={10}>
                                            <BasicCheckbox text="Wind" action={handleWindChecked} />
                                            {windChecked ? (
                                                <ThresholdInput
                                                    impact="wind"
                                                    sliderValues={windThreshold}
                                                    action={onWindSliderChange}
                                                    unitAction={onWindUnitChange}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                        </Grid>
                                    </Grid>

                                    {/* Precipitation */}
                                    <Grid container item key="precipitation">
                                        <Grid item xs={2} />
                                        <Grid item xs={10}>
                                            <BasicCheckbox text="Precipitation" action={handlePrecipChecked} />
                                            {precipChecked ? (
                                                <ThresholdInput
                                                    impact="precip"
                                                    sliderValues={precipThreshold}
                                                    action={onPrecipSliderChange}
                                                    unitAction={onPrecipUnitChange}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                        </Grid>
                                    </Grid>

                                    {/* Temperature */}
                                    <Grid container item key="temperature">
                                        <Grid item xs={2} />
                                        <Grid item xs={10}>
                                            <BasicCheckbox text="Temperature" action={handleTempChecked} />
                                            {tempChecked ? (
                                                <ThresholdInput
                                                    impact="temp"
                                                    sliderValues={tempThreshold}
                                                    action={onTempSliderChange}
                                                    unitAction={onTempUnitChange}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {windChecked || precipChecked || tempChecked ? (
                                <BasicButton type="blue" text="start" action={onStart} />
                            ) : (
                                <BasicButton type="disabled" text="start" />
                            )}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default WeatherInput;
