import BaseWxViewer from './viewers/BaseWxViewer';
import React from 'react';
import ShyftWx from './root/ShyftWx';

export const App = () => {
    return (
        <ShyftWx indexUrl="https://api.shyftwx.com/datasets/lkjsdflsjd/Vision">
            <BaseWxViewer />
        </ShyftWx>
    );
};

export default App;
