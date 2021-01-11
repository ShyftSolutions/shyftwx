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
// const url = 'https://api.shyftwx.com/v1/datasets';
const url = 'https://u5om6f0jk7.execute-api.us-east-2.amazonaws.com/test/datasets';

export const ShyftWx = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Container>
                <_ShyftWx customer={customer} dataset={dataset} url={url} />
            </Container>
        </MuiThemeProvider>
    );
};

export const ShyftWxMultipleLevels = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Container>
                <_ShyftWx customer="d3b939d0-36a2-4583-a6c5-c880a454c861" dataset="Metadata04" url={url} />
            </Container>
        </MuiThemeProvider>
    );
};

export const ShyftWxMultipleRegions = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Container>
                <_ShyftWx customer="b7a37c1c-1abe-4f37-b11d-6836dc51709d" dataset="JulyEndToEnd03" url={url} />
            </Container>
        </MuiThemeProvider>
    );
};

export const ShyftWxMetadata = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Container>
                <_ShyftWx customer="0aaf9dc6-3dc5-43b8-9492-17711427deb0" dataset="Metadata11" url={url} />
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
