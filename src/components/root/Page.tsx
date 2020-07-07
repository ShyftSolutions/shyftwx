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
            checkDatasetId();
        }
    };

    const clickBack = () => {
        setContent('customer');
        setCustomerState('edit');
    };

    const clickNext = () => {
        if (customerInput === '') {
            setCustomerState('empty');
        } else {
            // checkCustomerId();
            setContent('dataset');
        }
    };

    /*
    const checkCustomerId = async () => {
        const customerUrl = `${url}/${customerInput}/TQIConus`;
        const indexData = await getIndexAsync(customerUrl);
        console.log(await getIndexAsync(customerUrl))

        if (indexData === undefined || indexData.datasets.length === 0) {
            setCustomerState('invalid');
        } else {
            setContent('dataset');
        }
    };
     */

    const checkDatasetId = async () => {
        const customerUrl = `${url}/${customerInput}/${datasetInput}`;
        const indexData = (await getIndexAsync(customerUrl)) as ShyftIndex;

        if (indexData.datasets === undefined || indexData.datasets.length === 0) {
            setDatasetInputState('invalid');
        } else {
            window.location.href += `/?customer=${customerInput}&model=${datasetInput}`;
        }
    };

    const updateCustomerValue = (input: string) => {
        setCustomerInput(input);
    };

    const updateDatasetValue = (input: string) => {
        setDatasetInput(input);
    };

    const customerContent = (
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
        </Grid>
    );

    const datasetContent = (
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
                    <Typography variant="h6" align="center">
                        Enter your dataset ID:
                    </Typography>
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
        </Grid>
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
                <Grid container item direction="column" alignItems="center" justify="center">
                    <Paper className={classes.paper}>{content === 'customer' ? customerContent : datasetContent}</Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default LandingPage;
