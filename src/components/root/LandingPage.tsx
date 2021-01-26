import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { AppStatus, validateAppAsync } from '../../services/app-service';
import BasicButton from '../buttons/BasicButton';
import TextField from '../textfield/TextField';

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

export const LandingPage: React.FC<LandingPageProps> = ({
    url,
    customerId = '',
    datasetId = '',
    appStatus = AppStatus.Okay,
    onStatusChange
}) => {
    const classes = useStyles();

    const [state, setState] = React.useState('initial');
    const [customerInput, setCustomerInput] = React.useState(customerId);
    const [datasetInput, setDatasetInput] = React.useState(datasetId);
    const [errorMessage, setErrorMessage] = React.useState('');

    React.useEffect(() => {
        setStateFromStatus(appStatus);
    }, []);

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
            validateComponentAsync();
        }
    };

    const updateCustomerValue = (input: string) => {
        setCustomerInput(input);
    };

    const updateDatasetValue = (input: string) => {
        setDatasetInput(input);
    };

    const validateComponentAsync = async () => {
        const status = await validateAppAsync(url, customerInput, datasetInput);

        if (status === AppStatus.Okay) {
            onStatusChange && onStatusChange(AppStatus.Okay);
        } else {
            setStateFromStatus(status);
        }
    };

    const setStateFromStatus = (status: AppStatus) => {
        if (status === AppStatus.Unknown) {
            setState('error');
            setErrorMessage('Customer or Dataset ID does not exist.');
        } else if (status === AppStatus.NoData) {
            setState('error');
            setErrorMessage('Data is still being processed. Please try again in a few moments.');
        } else if (status === AppStatus.NoBaseUrl) {
            setState('error');
            setErrorMessage('Missing baseUrl. Please check your configuration.');
        }
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
                                <TextField
                                    label="Customer ID"
                                    action={updateCustomerValue}
                                    state={state}
                                    defaultValue={customerId}
                                />
                                <TextField
                                    label="Dataset ID"
                                    action={updateDatasetValue}
                                    state={state}
                                    helperText={errorMessage}
                                    defaultValue={datasetId}
                                />
                            </Grid>
                            <Grid container item justify="center">
                                <BasicButton onClick={onClick} />
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
