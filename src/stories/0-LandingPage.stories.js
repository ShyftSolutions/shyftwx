import { Container, MuiThemeProvider } from '@material-ui/core';
import { withKnobs } from '@storybook/addon-knobs/react';
import React from 'react';
import _LandingPage from '../components/root/Page';
import theme from './../theme';

export default {
    component: _LandingPage,
    title: 'LandingPage',
    decorators: [withKnobs]
};

export const LandingPage = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Container>
                <_LandingPage />
            </Container>
        </MuiThemeProvider>
    );
};
