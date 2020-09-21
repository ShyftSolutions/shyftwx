import React from 'react';
import BasicButton from '../buttons/BasicButton';
import TextField from '../textfield/TextField';
import { CustomerStatus, validateInitialDataAsync } from '../../apis';
import { Paper, Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        [theme.breakpoints.down('sm')]: {
            minHeight: '40vh',
            minWidth: '60vw'
        },
        [theme.breakpoints.up('md')]: {
            minHeight: '40vh',
            minWidth: '40vw'
        }
    },
    textPaper: {
        paddingTop: 20
    },
    text: {
        color: theme.palette.secondary.contrastText
    },
    subtitle: {
        color: theme.palette.secondary.dark
    }
}));

export const LandingPage: React.FC<PageProps> = ({ url }) => {
    const classes = useStyles();

    const [state, setState] = React.useState('initial');
    const [customerInput, setCustomerInput] = React.useState('');
    const [datasetInput, setDatasetInput] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const onClick = () => {
        if (customerInput === '' && datasetInput === '') {
            setState('error');
            setErrorMessage('Enter a Customer and Dataset ID.');
        } else if (customerInput === '') {
            setState('error');
            setErrorMessage('Enter a Customer ID.');
        } else if (datasetInput === '') {
            setState('error');
            setErrorMessage('Enter a Dataset ID.');
        } else {
            checkInput();
        }
    };

    const checkInput = async () => {
        const status = await validateInitialDataAsync(url, customerInput, datasetInput);

        if (status === CustomerStatus.Unknown) {
            setState('error');
            setErrorMessage('Customer or Dataset ID does not exist.');
        } else if (status === CustomerStatus.NoData) {
            setState('error');
            setErrorMessage('Data is still being processed. Please try again in a few moments.');
        } else {
            window.location.href += `?customer=${customerInput}&model=${datasetInput}`;
        }
    };

    const updateCustomerValue = (input: string) => {
        setCustomerInput(input);
    };

    const updateDatasetValue = (input: string) => {
        setDatasetInput(input);
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
                            justify="space-evenly"
                            spacing={2}
                            style={{ minHeight: '40vh', minWidth: '40vw' }}
                        >
                            <Grid container item justify="center">
                                <Paper className={classes.textPaper} elevation={0}>
                                    <Typography align="center" variant="h5" gutterBottom>
                                        Welcome
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" align="center">
                                        Please enter your information below <br /> to access the viewer:
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid container item alignItems="center" direction="column">
                                <TextField label="Customer ID" action={updateCustomerValue} state={state} />
                                <TextField
                                    label="Dataset ID"
                                    action={updateDatasetValue}
                                    state={state}
                                    helperText={errorMessage}
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
        </div>
    );
};

export default LandingPage;
