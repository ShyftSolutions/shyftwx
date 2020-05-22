import React from 'react';
import BaseWxViewer from './viewers/BaseWxViewer';

function App() {
    return (
        <div className="App">
            <BaseWxViewer swBounds={[-40, -98]} neBounds={[-35, -58]} />
        </div>
    );
}

export default App;
