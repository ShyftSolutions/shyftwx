import { Container, MuiThemeProvider } from '@material-ui/core';
import { withKnobs } from '@storybook/addon-knobs/react';
import React from 'react';
import _ShyftWx from '../components/root/ShyftWx';
import theme from './../theme';

export default {
    component: _ShyftWx,
    title: 'ShyftWx',
    decorators: [withKnobs]
};

// https://api.shyftwx.com/datasets/lkjsdflsjd/Vision/
// 26066922-2b2c-4c3c-8262-654792f6a30f/TQIOmaha/
const customer = '64f8b62e-4f3a-4119-8062-3b8c4c344255'; // "26066922-2b2c-4c3c-8262-654792f6a30f";
const dataset = 'Cathy08'; // "TQIConus";
const url = 'https://api.shyftwx.com/v1/datasets';

export const ShyftWx = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Container>
                <_ShyftWx customer={customer} dataset={dataset} url={url} />
            </Container>
        </MuiThemeProvider>
    );
};

export const LandingPageToShyftWx = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Container>
                <_ShyftWx dataset={dataset} url={url} />
            </Container>
        </MuiThemeProvider>
    );
};
