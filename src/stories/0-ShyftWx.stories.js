import _ShyftWx from '../components/root/ShyftWx';
import { object, withKnobs } from '@storybook/addon-knobs/react';
import React from 'react';
import { MuiThemeProvider, Container } from '@material-ui/core';
import theme from './../theme';
import { text } from '@storybook/addon-knobs';

export default {
    component: _ShyftWx,
    title: 'ShyftWx',
    decorators: [withKnobs]
};


// https://api.shyftwx.com/datasets/lkjsdflsjd/Vision/
// 26066922-2b2c-4c3c-8262-654792f6a30f/TQIOmaha/
const customer="f9ea4e15-4cd8-4bb0-868c-5ff4701f4be4"// "26066922-2b2c-4c3c-8262-654792f6a30f";
const dataset="Lincoln01"; // "TQIOmaha";
const url="https://api.shyftwx.com/datasets";


export const ShyftWx = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Container>
                <_ShyftWx customer={customer} dataset={dataset} url={url} />
            </Container>
        </MuiThemeProvider>
    );
};

