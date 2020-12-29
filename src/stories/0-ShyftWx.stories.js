import { Container, MuiThemeProvider } from '@material-ui/core';
import { withKnobs } from '@storybook/addon-knobs';
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
const customer = 'fdff17ec-5226-4993-a2e9-cbf8c37c3059'; // "26066922-2b2c-4c3c-8262-654792f6a30f";
const dataset = 'JulyEndToEnd01'; // "TQIConus";
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
