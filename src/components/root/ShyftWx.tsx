import { CircularProgress, Grid, MuiThemeProvider, Typography } from '@material-ui/core';
import { getIndexAsync, getProductDataAsync } from '../../apis';

import React from 'react';
import RunsSelector from './../run/RunsSelector';
import theme from '../../theme';

type ShyftContextType = {
    products?: ShyftProduct[];
    setProducts?: React.Dispatch<React.SetStateAction<ShyftProduct[]>>;
    regions?: ShyftRegion[];
    setRegions?: React.Dispatch<React.SetStateAction<ShyftRegion[]>>;
    runs?: DataRun[];
    setRuns?: React.Dispatch<React.SetStateAction<DataRun[]>>;
};

type DataRun = {
    run: number;
    selected: boolean;
};

export const ShyftContext = React.createContext<ShyftContextType>({
    products: [],
    setProducts: () => {},
    regions: [],
    setRegions: () => {},
    runs: [],
    setRuns: () => {}
});

export const ShyftWx: React.FC<ShyftWxProps> = ({ children, dataset, url, customer, themeOverride }) => {
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [index, setIndex] = React.useState<ShyftIndex>();
    const [products, setProducts] = React.useState<ShyftProduct[]>([]);
    const [regions, setRegions] = React.useState<ShyftRegion[]>([]);
    const [runs, setRuns] = React.useState<DataRun[]>([]);

    const customerUrl = React.useRef(`${url}/${customer}/${dataset}`);

    const loadProductDataAsync = (regions: ShyftRegion[], runs: DataRun[]): Promise<void> => {
        setLoading(true);

        const selectedRegion = regions.find((region) => region.selected)?.name;
        const selectedRun = runs.find((run) => run.selected)?.run;

        if (!selectedRegion || !selectedRun) {
            return Promise.resolve();
        }

        return getProductDataAsync(customerUrl.current, selectedRegion, selectedRun)
            .then((productData: ShyftProductData) => {
                productData.items[0].selected = true;

                setProducts(productData.items);
            })
            .then(() => setLoading(false));
    };

    React.useEffect(() => {
        if (!url) {
            setError('No indexUrl or indexData provided.');
            return;
        }

        getIndexAsync(customerUrl.current).then((indexData: ShyftIndex) => {
            // Set the initial defaults
            const initialRuns = indexData.datasets.map((dataset, index) => {
                if (index === 0) {
                    return { run: +dataset.run, selected: true };
                } else {
                    return { run: +dataset.run, selected: false };
                }
            });

            setRuns(initialRuns);

            const initialRegions = indexData.datasets.map((dataset, index) => {
                if (index === 0) {
                    return { ...dataset.region, selected: true };
                } else {
                    return dataset.region;
                }
            });

            setRegions(initialRegions);

            setIndex(indexData);

            loadProductDataAsync(initialRegions, initialRuns);
        });
    }, []);

    React.useEffect(() => {
        loadProductDataAsync(regions, runs);
    }, [regions, runs]);

    const getOffset = (): React.ReactNode => {
        return <Grid item xs={3} />;
    };

    const generateContent = (): React.ReactNode => {
        if (error) {
            return <Typography color="error">{error}</Typography>;
        }

        if (loading) {
            return <CircularProgress />;
        }

        const selectedProduct = products.find((product) => product.selected) as ShyftProduct;
        const relatedProducts = products.filter(
            (product) => product.product === selectedProduct.product && product.level === selectedProduct.level
        );

        const sliderVals = relatedProducts.map((product) => ({ label: product.forecast, value: product.forecast }));

        const levelProductVals: Category[] = [{ name: selectedProduct.product, open: true, products: [] }];

        return <RunsSelector options={Array.from(new Set(runs.map((run) => run.run)))} setRuns={setRuns} />;
    };

    return (
        <MuiThemeProvider theme={themeOverride || theme}>
            <Grid container direction="row" justify="flex-end" alignItems="flex-start" spacing={3}>
                {generateContent()}
            </Grid>
        </MuiThemeProvider>
    );
};

export default ShyftWx;
