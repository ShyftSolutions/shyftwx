import { CircularProgress, Grid, MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { AppStatus, validateAppAsync } from '../../services/app-service';
import theme from '../../theme';
import LandingPage from './LandingPage';
import ShyftWxDynamic from './ShyftWxDynamic';
import ShyftWxStatic from './ShyftWxStatic';

export const ShyftWx: React.FC<ShyftWxProps> = (props) => {
    const { dataset, url, customer, themeOverride, dynamicFeatures } = props;

    const [status, setStatus] = React.useState(AppStatus.Okay);
    const [loading, setLoading] = React.useState(true);

    const isDynamic = React.useRef(false);

    if (dynamicFeatures && dynamicFeatures.length !== 0) {
        isDynamic.current = true;
    }

    const urlParams = React.useRef(new URLSearchParams(window.location.search));
    const customerId = React.useRef(customer || urlParams.current.get('customer') || '');
    const datasetId = React.useRef(dataset || urlParams.current.get('model') || '');

    React.useEffect(() => {
        setLoading(true);

        validateAppAsync(url, customerId.current, datasetId.current)
            .then((appStatus) => {
                if (appStatus !== AppStatus.Okay) {
                    setStatus(appStatus);
                    setLoading(false);
                    return;
                }

                setLoading(false);
            })
            .catch(() => {
                setStatus(AppStatus.Error);
                setLoading(false);
            });
    }, []);

    const handleStatusChange = (newStatus: AppStatus): void => {
        setStatus(newStatus);
    };

    const generateContent = (): React.ReactNode => {
        if (status !== AppStatus.Okay) {
            return (
                <LandingPage
                    url={url}
                    customerId={customerId.current}
                    datasetId={datasetId.current}
                    appStatus={status}
                    onStatusChange={handleStatusChange}
                />
            );
        }

        if (loading) {
            return (
                <div style={{ paddingTop: '50vh' }}>
                    <CircularProgress />
                </div>
            );
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
