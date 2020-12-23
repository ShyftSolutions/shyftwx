import { CircularProgress, Grid, MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { getIndexAsync, getProductDataAsync } from '../../apis';
import { AppStatus, validateAppAsync } from '../../services/app-service';
import theme from '../../theme';
import LandingPage from './LandingPage';
import ShyftWxDynamic from './ShyftWxDynamic';
import ShyftWxStatic from './ShyftWxStatic';

export const ShyftWx: React.FC<ShyftWxProps> = (props) => {
    const { dataset, url, customer, themeOverride, dynamicFeatures } = props;

    const [status, setStatus] = React.useState(AppStatus.Okay);
    const [loading, setLoading] = React.useState(true);
    const [index, setIndex] = React.useState<Index>({ datasets: [] });
    const [selectedProduct, setSelectedProduct] = React.useState<string>('');
    const [selectedLevel, setSelectedLevel] = React.useState<string>('');
    const [selectedForecast, setSelectedForecast] = React.useState<string>('');
    const [selectedRegion, setSelectedRegion] = React.useState<string>('');
    const [selectedRun, setSelectedRun] = React.useState<string>('');
    const [levelsAndProducts, setLevelsAndProducts] = React.useState<{ name: string; levels: [] }[]>([]);

    const isDynamic = React.useRef(false);

    if (dynamicFeatures && dynamicFeatures.length !== 0) {
        isDynamic.current = true;
    }

    const urlParams = React.useRef(new URLSearchParams(window.location.search));
    const customerId = React.useRef(customer || urlParams.current.get('customer') || '');
    const datasetId = React.useRef(dataset || urlParams.current.get('model') || '');

    React.useEffect(() => {
        loadAsync();
    }, []);

    const loadAsync = async () => {
        setLoading(true);

        const appStatus = await validateAppAsync(url, customerId.current, datasetId.current);

        if (appStatus !== AppStatus.Okay) {
            setStatus(appStatus);
            setLoading(false);
            return;
        }

        const indexData = await getIndexAsync(url, customerId.current, datasetId.current);

        if (!indexData || indexData.datasets.length === 0) {
            setStatus(AppStatus.NoData);
            setLoading(false);
            return;
        }

        const arr = { datasets: [] as DatasetRegionRun[] };

        for (let i = 0; i < indexData.datasets.length; i++) {
            const dataset = indexData.datasets[i];

            const datasetRegionRun: DatasetRegionRun = {
                dataset: dataset.name,
                region: dataset.region,
                run: {
                    name: dataset.run,
                    levels: []
                }
            };

            const runRegionData = await getProductDataAsync(
                url,
                customerId.current,
                datasetId.current,
                dataset.region.name,
                dataset.run
            );

            const items = runRegionData.items;
            let uniqueLevels: Level[] = [];

            uniqueLevels = items
                .map((i) => i.level) // get all level values
                .filter((v, i, a) => a.indexOf(v) === i) // filter down to unique levels
                .map((l) => {
                    return { name: l, products: [] };
                }); // return level obj arr

            uniqueLevels.forEach((lvl) => {
                lvl.products = items
                    .filter((item) => item.level === lvl.name) // only look at items for this level
                    .map((i) => i.product) // gather all of the products
                    .filter((v, i, a) => a.indexOf(v) === i) // only get unique products
                    .map((product) => {
                        return { name: product, forecasts: [] };
                    }); // return product obj arr
            });

            uniqueLevels.forEach((lvl) => {
                lvl.products.forEach((product) => {
                    product.forecasts = items
                        .filter((item) => item.level === lvl.name && item.product === product.name) // only look at specific level and product
                        .map((item) => {
                            return { hour: item.forecast, image: item.url };
                        }); // return forecast obj arr
                });
            });

            let uniqueProducts: { name: string; levels: [] }[] = [];

            uniqueProducts = items
                .map((i) => i.product) // get all product values
                .filter((v, i, a) => a.indexOf(v) === i) // filter down to unique products
                .map((l) => {
                    return { name: l, levels: [] };
                }); // return product obj arr

            uniqueProducts.forEach((product) => {
                product.levels = items
                    .filter((item) => item.product === product.name) // only look at items for this product
                    .map((i) => i.level) // gather all of the levels
                    .filter((v, i, a) => a.indexOf(v) === i) // only get unique levels
                    .map((level) => {
                        return level;
                    }); // return product obj arr
            });

            setLevelsAndProducts(uniqueProducts);

            // uniqueLevels now have all of the products and forecasts hours for a given run
            datasetRegionRun.run.levels = uniqueLevels;

            const indexes = { datasets: [datasetRegionRun] };

            // add dataset to index array
            arr.datasets.push(datasetRegionRun);

            // setting default values
            if (i === 0) {
                setSelectedLevel(indexes.datasets[0].run.levels[0].name);
                setSelectedProduct(indexes.datasets[0].run.levels[0].products[0].name);
                setSelectedForecast(indexes.datasets[0].run.levels[0].products[0].forecasts[0].hour);
            }
        }

        // set index to array of datasets
        setIndex(arr);

        setLoading(false);
    };

    const getLevels = (value: string): string[] => {
        const obj = levelsAndProducts.find((o) => o.name === value);
        if (obj) {
            return obj.levels;
        } else {
            return [];
        }
    };

    const handleStatusChange = (newStatus: AppStatus): void => {
        setStatus(newStatus);
    };

    const generateContent = (): React.ReactNode => {
        if (status !== AppStatus.Okay) {
            return (
                <LandingPage
                    url={url}
                    customerId={customerId.current}
                    datasetId={datasetId.current}
                    appStatus={status}
                    onStatusChange={handleStatusChange}
                />
            );
        }

        if (loading) {
            return (
                <div style={{ paddingTop: '50vh' }}>
                    <CircularProgress />
                </div>
            );
        }

        if (isDynamic.current && dynamicFeatures) {
            return (
                <ShyftWxDynamic
                    dynamicFeatures={dynamicFeatures}
                    index={index}
                    forecast={selectedForecast}
                    level={selectedLevel}
                    product={selectedProduct}
                    region={selectedRegion}
                    run={selectedRun}
                    onForecastSelect={setSelectedForecast}
                    onLevelSelect={setSelectedLevel}
                    onProductSelect={setSelectedProduct}
                    onRegionSelect={setSelectedRegion}
                    onRunSelect={setSelectedRun}
                    getLevels={getLevels}
                />
            );
        } else {
            return (
                <ShyftWxStatic
                    index={index}
                    forecast={selectedForecast}
                    level={selectedLevel}
                    product={selectedProduct}
                    region={selectedRegion}
                    run={selectedRun}
                    onForecastSelect={setSelectedForecast}
                    onLevelSelect={setSelectedLevel}
                    onProductSelect={setSelectedProduct}
                    onRegionSelect={setSelectedRegion}
                    onRunSelect={setSelectedRun}
                    getLevels={getLevels}
                />
            );
        }
    };

    return (
        <MuiThemeProvider theme={themeOverride || theme}>
            <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                {generateContent()}
            </Grid>
        </MuiThemeProvider>
    );
};

export default ShyftWx;
