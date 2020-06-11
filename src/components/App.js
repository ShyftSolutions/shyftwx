import React from 'react';
import ShyftWx from './root/ShyftWx';
import BaseWxViewer from './viewers/BaseWxViewer';

export const App = () => {
    return (
        <ShyftWx indexUrl="https://api.shyftwx.com/datasets/lkjsdflsjd/Vision">
            <BaseWxViewer />
        </ShyftWx>
    );
};

export default App;
