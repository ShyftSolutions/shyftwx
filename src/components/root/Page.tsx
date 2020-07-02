import React from 'react';
import BasicButton from './../buttons/BasicButton';
import TextField from './../textfield/TextField';
import { Paper, Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        [theme.breakpoints.down('sm')]: {
            minHeight: '40vh',
            minWidth: '80vw'
        },
        [theme.breakpoints.up('md')]: {
            minHeight: '40vh',
            minWidth: '40vw'
        }
    },
    text: {
        color: theme.palette.secondary.contrastText
    }
}));

export const LandingPage = () => {
    const classes = useStyles();
    const [empty, setEmpty] = React.useState(false);
    const [incorrect, setIncorrect] = React.useState(false);
    const [customerValue, setCustomerValue] = React.useState('');
    const [datasetValue, setDatasetValue] = React.useState('');
    // https://tqi.shyftwx.com/?customer=5b4daa25-3d9f-4f83-ade4-ee6976b259e1&model=TQIConus

    const onClick = () => {
        if (customerValue === '' || datasetValue === '') {
            setEmpty(true);
        } else {
            window.location.href += `/?customer=${customerValue}&model=${datasetValue}`;
        }
    };

    const updateCustomerValue = (input: string) => {
        setCustomerValue(input);
    };

    const updateDatasetValue = (input: string) => {
        setDatasetValue(input);
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '80vh' }}
        >
            <Grid container item direction="column" alignItems="center">
                <Paper className={classes.paper}>
                    <Grid
                        container
                        item
                        direction="column"
                        justify="space-evenly"
                        spacing={2}
                        style={{ minHeight: '40vh', minWidth: '40vw' }}
                    >
                        <Grid item />
                        <Grid container item justify="center">
                            <Typography className={classes.text} variant="h5" gutterBottom>
                                Please enter the following:
                            </Typography>
                        </Grid>
                        <Grid container item alignItems="center" direction="column">
                            <TextField
                                label="Customer ID"
                                action={updateCustomerValue}
                                state={empty ? 'empty' : incorrect ? 'incorrect' : undefined}
                            />
                            <TextField
                                label="Dataset ID"
                                action={updateDatasetValue}
                                state={empty ? 'empty' : incorrect ? 'incorrect' : undefined}
                                helperText={
                                    empty
                                        ? 'Enter a customer and dataset ID'
                                        : incorrect
                                        ? 'Customer or dataset ID is incorrect'
                                        : ' '
                                }
                            />
                        </Grid>
                        <Grid container item justify="center">
                            <BasicButton action={onClick} />
                        </Grid>
                        <Grid item />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default LandingPage;