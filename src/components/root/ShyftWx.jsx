import { Grid, MuiThemeProvider, CircularProgress } from '@material-ui/core';
import React from 'react';
import { getIndexAsync } from '../../apis';
import theme from '../../theme';

export const ShyftContext = React.createContext({});

export const ShyftWx = ({ children, indexData, indexUrl, themeOverride }) => {
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [index, setIndex] = React.useState();

    React.useEffect(() => {
        if (indexUrl) {
            getIndexAsync(indexUrl).then((data) => {
                setIndex(data);
                setLoading(false);
            });
        } else if (indexData) {
            setIndex(indexData);
            setLoading(false);
        } else {
            setError('No indexUrl or indexData provided.');
        }
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <MuiThemeProvider theme={themeOverride || theme}>
            <ShyftContext.Provider value={{ data: index }}>
                <Grid container direction="row" justify="flex-end" alignItems="flex-start" spacing={3}>
                    {children}
                </Grid>
            </ShyftContext.Provider>
        </MuiThemeProvider>
    );
};

export default ShyftWx;
