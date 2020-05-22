import { array, withKnobs } from '@storybook/addon-knobs';
import _BaseWxViewer from 'components/viewers/BaseWxViewer';
import _DynamicWxViewer from 'components/viewers/DynamicWxViewer';
import _StaticWxViewer from 'components/viewers/StaticWxViewer';
import _WxViewer from 'components/viewers/WxViewer';
import React from 'react';

export default {
    title: 'Viewer',
    decorators: [withKnobs],
};

export const BaseWxViewer = () => {
    const swBounds = array('Southwest Bounds', [-1, -1]);
    const neBounds = array('Northeast Bounds', [1, 1]);

    return <_BaseWxViewer swBounds={swBounds} neBounds={neBounds} />;
};

export const WxViewer = () => <_WxViewer />;

export const StaticWxViewer = () => <_StaticWxViewer />;

export const DynamicWxViewer = () => <_DynamicWxViewer />;
