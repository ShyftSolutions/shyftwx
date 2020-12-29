import { Container, MuiThemeProvider } from '@material-ui/core';
import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import _LandingPage from '../components/root/LandingPage';
import { AppStatus } from '../services/app-service';
import theme from './../theme';

// https://api.shyftwx.com/datasets/lkjsdflsjd/Vision/
// 26066922-2b2c-4c3c-8262-654792f6a30f/TQIOmaha/
const customer = '64f8b62e-4f3a-4119-8062-3b8c4c344255'; // "26066922-2b2c-4c3c-8262-654792f6a30f";
const dataset = 'Cathy08'; // "TQIConus";
const url = 'https://api.shyftwx.com/v1/datasets';

export default {
    component: _LandingPage,
    title: 'LandingPage',
    decorators: [withKnobs]
};

const buildView = (content) => {
    return (
        <MuiThemeProvider theme={theme}>
            <Container>{content}</Container>
        </MuiThemeProvider>
    );
};

export const LandingPage = () => {
    return buildView(<_LandingPage url={url} />);
};

export const LandingPageValid = () => {
    return buildView(<_LandingPage url={url} customerId={customer} datasetId={dataset} />);
};

export const LandingPageBadData = () => {
    return buildView(<_LandingPage url={url} customerId={1} datasetId={2} appStatus={AppStatus.Unknown} />);
};
