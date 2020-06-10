import { CircularProgress, Grid, MuiThemeProvider, Typography } from '@material-ui/core';

import React from 'react';
import { getIndexAsync } from '../../apis';
import theme from '../../theme';

export const ShyftContext = React.createContext({});

export const ShyftWx: React.FC<ShyftWxProps> = ({ children, indexData, indexUrl, themeOverride }) => {
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [index, setIndex] = React.useState<ShyftIndex>();

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

    const generateContent = (): React.ReactNode => {
        if (error) {
            return <Typography color="error">{error}</Typography>;
        }

        if (loading) {
            return <CircularProgress />;
        }

        return children;
    };

    return (
        <MuiThemeProvider theme={themeOverride || theme}>
            <ShyftContext.Provider value={{ data: index }}>
                <Grid container direction="row" justify="flex-end" alignItems="flex-start" spacing={3}>
                    {generateContent()}
                </Grid>
            </ShyftContext.Provider>
        </MuiThemeProvider>
    );
};

export default ShyftWx;
