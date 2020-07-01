import React from 'react';
import BasicButton from './../buttons/BasicButton';
import TextField from './../textfield/TextField';
import { Paper, Grid, Typography, MuiThemeProvider, makeStyles } from '@material-ui/core';
import theme from '../../theme';

const useStyles = makeStyles((theme) => ({
    paper: {
        [theme.breakpoints.down('xs')]: {
            minHeight: '40vh',
            minWidth: '80vw'
        },
        [theme.breakpoints.up('sm')]: {
            minHeight: '40vh',
            minWidth: '40vw'
        }
    }
}));

export const LandingPage = (themeOverride) => {
    const classes = useStyles();
    const [incorrect, setIncorrect] = React.useState(false);
    const [customerValue, setCustomerValue] = React.useState('');
    const [datasetValue, setDatasetValue] = React.useState('');
    // https://tqi.shyftwx.com/?customer=5b4daa25-3d9f-4f83-ade4-ee6976b259e1&model=TQIConus

    const onClick = () => {
        alert(customerValue + datasetValue);
        if (customerValue === '' || datasetValue === '') {
            setIncorrect(true);
        }
    };

    const updateCustomerValue = (input: string) => {
        setCustomerValue(input);
    };

    const updateDatasetValue = (input: string) => {
        setDatasetValue(input);
    };

    const content = (
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
                        spacing={3}
                        style={{ minHeight: '40vh', minWidth: '40vw' }}
                    >
                        <Grid item />
                        <Grid item>
                            <Typography align="center" variant="h5">
                                Please enter the following:
                            </Typography>
                        </Grid>
                        <Grid container item alignItems="center" direction="column">
                            <TextField label="Customer ID" action={updateCustomerValue} />
                            <TextField label="Dataset ID" action={updateDatasetValue} />
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

    return <MuiThemeProvider theme={themeOverride || theme}>{content}</MuiThemeProvider>;
};

export default LandingPage;
