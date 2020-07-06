import React from 'react';
import BasicButton from './../buttons/BasicButton';
import TextField from './../textfield/TextField';
import { getIndexAsync } from '../../apis';
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

    const [customerInput, setCustomerInput] = React.useState('');
    const [customerInputState, setCustomerState] = React.useState('initial');
    const [datasetInput, setDatasetInput] = React.useState('');
    const [datasetInputState, setDatasetInputState] = React.useState('initial');
    const [content, setContent] = React.useState('customer');

    const redirect = () => {
        if (customerInput === '') {
            setDatasetInputState('empty');
        } else {
            window.location.href += `/?customer=${customerInput}&model=${datasetInput}`;
        }
    };

    const clickBack = () => {
        setContent('customer');
        setCustomerState('edit');
    };

    const clickNext = () => {
        if (customerInput === '') {
            setCustomerState('empty');
        }
        checkCustomerId();
        if (customerInputState === 'valid') {
            setContent('dataset');
        }
    };

    const checkCustomerId = async () => {
        const customerUrl = `${url}/${customerInput}`;
        const indexData = (await getIndexAsync(customerUrl)) as ShyftIndex;
        console.log(indexData);
        if (!indexData || indexData.datasets.length === 0) {
            setCustomerState('invalid');
        } else {
            setCustomerState('valid');
        }
    };

    const updateCustomerValue = (input: string) => {
        setCustomerInput(input);
    };

    const updateDatasetValue = (input: string) => {
        setDatasetInput(input);
    };

    const customerContent = (
        <>
            <Grid container item justify="center">
                <Paper className={classes.textPaper} elevation={0}>
                    <Typography variant="h6">Enter your customer ID:</Typography>
                </Paper>
            </Grid>
            <Grid container item alignItems="center" direction="column">
                <TextField
                    label="Customer ID"
                    action={updateCustomerValue}
                    state={customerInputState}
                    value={customerInput}
                />
            </Grid>
            <Grid container item justify="center">
                <BasicButton action={clickNext} />
            </Grid>
            <Grid item />
        </>
    );

    const datasetContent = (
        <>
            <Grid container item justify="center">
                <Paper className={classes.textPaper} elevation={0}>
                    <Typography variant="h6">Enter your dataset ID:</Typography>
                    <Typography className={classes.subtitle} variant="subtitle2" align="center">
                        Customer ID: {customerInput}
                    </Typography>
                </Paper>
            </Grid>
            <Grid container item alignItems="center" direction="column">
                <TextField
                    label="Dataset ID"
                    action={updateDatasetValue}
                    state={datasetInputState}
                    value={datasetInput}
                />
            </Grid>
            <Grid container item justify="center">
                <BasicButton action={clickBack} text="back" />
                <BasicButton action={redirect} text="next" />
            </Grid>
            <Grid item />
        </>
    );

    return (
        <div>
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
                            {content === 'customer' ? customerContent : datasetContent}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default LandingPage;
