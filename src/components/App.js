import React from 'react';
import BaseWxViewer from './viewers/BaseWxViewer';

function App() {
    return (
        <div className="App">
            <BaseWxViewer swBounds={[-1, -1]} neBounds={[1, 1]} />
        </div>
    );
}

export default App;
