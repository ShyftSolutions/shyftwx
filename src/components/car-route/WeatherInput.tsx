import React from 'react';
import { Paper, Grid, Typography, makeStyles } from '@material-ui/core';
import BasicButton from '../buttons/BasicButton';
import BasicCheckbox from '../checkbox/BasicCheckbox';
import ThresholdInput from './ThresholdInput';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: 10,
        paddingBottom: 20,
        overflow: 'auto',
        maxHeight: '70vh'
    }
}));

export const WeatherInput: React.FC<WeatherInputProps> = ({
    onClick,
    onWindSliderChange,
    onPrecipSliderChange,
    onTempSliderChange,
    onStart
}) => {
    const classes = useStyles();

    const [windChecked, setWindChecked] = React.useState(false);
    const [precipChecked, setPrecipChecked] = React.useState(false);
    const [tempChecked, setTempChecked] = React.useState(false);

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
                            style={{ minHeight: '70vh', minWidth: '30vw', maxWidth: '40vw', margin: 0 }}
                        >
                            <Grid container item spacing={2}>
                                <Grid container item justify="flex-start">
                                    <BasicButton style="blue" text="back" action={onClick} />
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
                                            <BasicCheckbox text="Wind" action={setWindChecked} />
                                            {windChecked ? (
                                                <ThresholdInput impact="wind" action={onWindSliderChange} />
                                            ) : (
                                                <></>
                                            )}
                                        </Grid>
                                    </Grid>

                                    {/* Precipitation */}
                                    <Grid container item key="precipitation">
                                        <Grid item xs={2} />
                                        <Grid item xs={10}>
                                            <BasicCheckbox text="Precipitation" action={setPrecipChecked} />
                                            {precipChecked ? (
                                                <ThresholdInput impact="precip" action={onPrecipSliderChange} />
                                            ) : (
                                                <></>
                                            )}
                                        </Grid>
                                    </Grid>

                                    {/* Temperature */}
                                    <Grid container item key="temperature">
                                        <Grid item xs={2} />
                                        <Grid item xs={10}>
                                            <BasicCheckbox text="Temperature" action={setTempChecked} />
                                            {tempChecked ? (
                                                <ThresholdInput impact="temp" action={onTempSliderChange} />
                                            ) : (
                                                <></>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {windChecked || precipChecked || tempChecked ? (
                                <BasicButton style="blue" text="start" action={onStart} />
                            ) : (
                                <BasicButton style="disabled" text="start" />
                            )}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default WeatherInput;
