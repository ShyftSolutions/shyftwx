import React from 'react';
import BasicButton from './../buttons/BasicButton';
import TextField from './../textfield/TextField';
import { Paper, Grid, Typography, MuiThemeProvider, makeStyles } from '@material-ui/core';
import theme from '../../theme';
import { getIndexAsync } from '../../apis';

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
    }
}));

export const LandingPage = (themeOverride) => {
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
            checkInput();
            if (!incorrect) {
                window.location.href += `?customer=${customerValue}&model=${datasetValue}`;
            }
        }
    };

    const updateCustomerValue = (input: string) => {
        setCustomerValue(input);
    };

    const updateDatasetValue = (input: string) => {
        setDatasetValue(input);
    };

    const checkInput = async () => {
        const indexData = (await getIndexAsync(window.location.href)) as ShyftIndex;

        if (!indexData || indexData.datasets.length === 0) {
            setIncorrect(true);
        }
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
                            <Typography color="primary" variant="h5" gutterBottom>
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
