import { Grid, MuiThemeProvider, CircularProgress } from '@material-ui/core';
import React from 'react';
import theme from '../../theme';
import ShyftWxDynamic from './ShyftWxDynamic';
import ShyftWxStatic from './ShyftWxStatic';
import LandingPage from '../landingpage/Page';

export const ShyftWx: React.FC<ShyftWxProps> = (props) => {
    let { dataset, url, customer, themeOverride, dynamicFeatures } = props;

    const [loading, setLoading] = React.useState(true);
    const [landingPage, setLandingPage] = React.useState(false);

    const isDynamic = React.useRef(false);

    if (dynamicFeatures && dynamicFeatures.length !== 0) {
        isDynamic.current = true;
    }

    const urlParams = React.useRef(new URLSearchParams(window.location.search));
    customer = customer || urlParams.current.get('customer') || '';
    dataset = dataset || urlParams.current.get('model') || '';

    React.useEffect(() => {
        setLoading(true);

        if (!url) {
            setLandingPage(true);
            return;
        }

        if (!customer || !dataset) {
            setLandingPage(true);
        }

        setLoading(false);
    }, []);

    const generateContent = (): React.ReactNode => {
        if (landingPage) {
            return <LandingPage url={url} />;
        }

        if (loading) {
            return <CircularProgress />;
        }

        if (isDynamic.current) {
            return <ShyftWxDynamic {...props} />;
        } else {
            return <ShyftWxStatic {...props} />;
        }
    };

    return (
        <MuiThemeProvider theme={themeOverride || theme}>
            <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                {generateContent()}
            </Grid>
        </MuiThemeProvider>
    );
};

export default ShyftWx;
