import { Container } from '@material-ui/core';
import React from 'react';
import _ShyftWx from '../components/root/ShyftWx';
import { withKnobs } from '@storybook/addon-knobs/react';

export default {
    component: _ShyftWx,
    title: 'ShyftWx',
    decorators: [withKnobs]
};

// https://api.shyftwx.com/datasets/lkjsdflsjd/Vision/
// 26066922-2b2c-4c3c-8262-654792f6a30f/TQIOmaha/
const customer = '5b4daa25-3d9f-4f83-ade4-ee6976b259e1'; // "26066922-2b2c-4c3c-8262-654792f6a30f";
const dataset = 'TQIConus'; // "TQIConus";
const url = 'https://api.shyftwx.com/datasets';

export const ShyftWx = () => {
    return (
        <Container>
            <_ShyftWx customer={customer} dataset={dataset} url={url} />
        </Container>
    );
};
