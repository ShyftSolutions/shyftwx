import React from 'react';
import BaseWxViewer from './viewers/BaseWxViewer';
import ProductList from './product-list/ProductList';

function App() {
    const [products, setProducts] = React.useState();

    React.useEffect(() => {
        fetch('https://wxchange-images.s3.us-east-2.amazonaws.com/index.json')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.sources[0].regions[0].runs[0].products.map((product) => {

                }));
            });
    }, []);

    if (!products) {
        return <p>LOADING</p>;
    }

    return (
        <div className="App">
            <ProductList products={products} />
        </div>
    );
}

export default App;
