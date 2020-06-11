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
const customer="lkjsdflsjd";
const dataset="Vision";
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

