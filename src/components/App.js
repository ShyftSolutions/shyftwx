import React from 'react';
import ShyftWx from './root/ShyftWx';
import BaseWxViewer from './viewers/BaseWxViewer';

export const App = () => {
    return (
        <ShyftWx indexUrl="https://wxchange-images.s3.us-east-2.amazonaws.com/index.json">
            <BaseWxViewer swBounds={[23.81, -65.69]} neBounds={[49.38, -129.17]} />
        </ShyftWx>
    );
};

export default App;
