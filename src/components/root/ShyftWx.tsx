import React, { useState } from 'react';
import { getIndexAsync } from 'apis';
import { MuiThemeProvider, Theme } from '@material-ui/core';
import theme from 'theme';

type ShyftWxProps = {
    indexData?: ShyftIndex;
    indexUrl?: string;
    themeOverride?: Theme;
};

export const ShyftWx: React.FC<ShyftWxProps> = ({ children, indexData, indexUrl, themeOverride }) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState<ShyftIndex>();

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
        return <p>LOADING</p>;
    }

    // TODO: pass index data to children
    return <MuiThemeProvider theme={themeOverride || theme}>{children}</MuiThemeProvider>;
};

export default ShyftWx;
