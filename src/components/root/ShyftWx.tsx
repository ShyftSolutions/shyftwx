import { CircularProgress, Grid, MuiThemeProvider, Typography } from '@material-ui/core';

import BaseWxViewer from './../viewers/BaseWxViewer';
import ModelSelector from './../models/ModelSelector';
import ProductSelector from './../products/ProductSelector';
import React from 'react';
import RegionSelector from './../regions/RegionSelector';
import RunDropdown from './../runs/RunDropdown';
import RunsSelector from './../run/RunsSelector';
import Slider from './../time/Slider';
import TimeControl from './../time/TimeControl';
import { getIndexAsync } from '../../apis';
import theme from '../../theme';

export const ShyftContext = React.createContext({});

export const ShyftWx: React.FC<ShyftWxProps> = ({ children, dataset, url, customer, themeOverride }) => {
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [index, setIndex] = React.useState<Index>({ datasets: [] });
    const [selectedProduct, setSelectedProduct] = React.useState<string>('');
    const [selectedLevel, setSelectedLevel] = React.useState<string>('');
    const [selectedForecast, setSelectedForecast] = React.useState<string>('');

    const customerUrl = `${url}/${customer}/${dataset}`;

    const loadAsync = async () => {
        const indexData = await getIndexAsync(customerUrl);

        if (!indexData || indexData.datasets.length === 0) {
            setError('No datasets available.');
            return;
        }

        for (let i = 0; i < indexData.datasets.length; i++) {
            const dataset = indexData.datasets[i];

            const datasetRegionRun: DatasetRegionRun = {
                dataset: dataset.name,
                region: dataset.region.name,
                run: {
                    name: dataset.run,
                    levels: []
                }
            };

            const runRegion = `${dataset.run}-${dataset.region.name}`;
            const datasetUrl = `${customerUrl}/${runRegion}`;

            const runRegionData = await getIndexAsync(datasetUrl);

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
                        .filter((item) => item.level === lvl.name && item.product == product.name) // only look at specific level and product
                        .map((item) => {
                            return { hour: item.forecast, image: item.filename };
                        }); // return forecast obj arr
                });
            });

            // uniqueLevels now have all of the products and forecasts hours for a given run
            datasetRegionRun.run.levels = uniqueLevels;

            const indexes = { datasets: [datasetRegionRun] };
            setIndex(indexes);

            // setting default values
            if (i === 0) {
                setSelectedLevel(indexes.datasets[0].run.levels[0].name);
                setSelectedProduct(indexes.datasets[0].run.levels[0].products[0].name);
                setSelectedForecast(indexes.datasets[0].run.levels[0].products[0].forecasts[0].hour);
            }
        }

        setLoading(false);
    };

    React.useEffect(() => {
        if (!url) {
            setError('No indexUrl or indexData provided.');
            return;
        }

        setLoading(true);

        loadAsync();
    }, []);

    const getSelectedLevel = () => {
        return index.datasets[0].run.levels.filter((lvl) => lvl.name == selectedLevel)[0];
    };

    const getSelectedProduct = () => {
        return getSelectedLevel().products.filter((p) => p.name == selectedProduct)[0];
    };

    const onProductSelect = (product: ProductSelectionResponse) => {
        setSelectedLevel(product.level);
        setSelectedProduct(product.product);
        setSelectedForecast(getSelectedProduct().forecasts[0].hour);
    };

    const onSliderNavigationNext = () => {
        const forecasts = getSelectedProduct().forecasts;
        let forecastIndex = forecasts.findIndex((f) => f.hour === selectedForecast);

        if (forecastIndex + 1 == forecasts.length) {
            return;
        }

        setSelectedForecast(forecasts[forecastIndex + 1].hour);
    };

    const onSliderNavigationBack = () => {
        const forecasts = getSelectedProduct().forecasts;
        const forecastIndex = forecasts.findIndex((f) => f.hour === selectedForecast);

        if (forecastIndex - 1 < 0) {
            return;
        }

        setSelectedForecast(forecasts[forecastIndex - 1].hour);
    };

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

        const levelProductVals = index.datasets[0].run.levels.map((lvl, index) => {
            return { name: lvl.name, open: index == 0, products: lvl.products };
        });
        const sliderVals = getSelectedProduct().forecasts.map((f) => {
            return { label: f.hour, value: f.hour };
        });
        const activeForecastLayer = getSelectedProduct().forecasts.filter((f) => f.hour === selectedForecast)[0].image;

        return (
            <React.Fragment>
                <Grid container item>
                    <Grid container item>
                        {getOffset()}
                        <Grid item xs={3}>
                            <ModelSelector options={[index.datasets[0].dataset]} action={() => {}} />
                        </Grid>
                        <Grid item xs={3}>
                            <RegionSelector options={[index.datasets[0].region]} action={() => {}} />
                        </Grid>
                        <Grid item xs={3}>
                            <RunsSelector options={[index.datasets[0].run.name]} action={() => {}} />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container item>
                    <Grid container item xs={3}>
                        {/* TODO: icons not coming - theme is maybe wrong?  color of text is off*/}
                        <Grid container item>
                            <ProductSelector categories={levelProductVals} action={onProductSelect} />
                        </Grid>
                    </Grid>

                    <Grid container item xs={9}>
                        <Grid container item>
                            <BaseWxViewer
                                layers={activeForecastLayer}
                                neBounds={[0.0, 0.0]}
                                swBounds={[-10.0, -10.0]}
                            />
                        </Grid>

                        <Grid container item>
                            <Grid item xs={2}>
                                <TimeControl
                                    onBack={onSliderNavigationBack}
                                    onNext={onSliderNavigationNext}
                                    onPlay={() => {}}
                                    onPause={() => {}}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <Slider options={sliderVals} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    };

    return (
        <MuiThemeProvider theme={themeOverride || theme}>
            <ShyftContext.Provider value={{ data: index }}>
                <Grid container direction="row" justify="flex-end" alignItems="flex-start" spacing={3}>
                    {generateContent()}
                </Grid>
            </ShyftContext.Provider>
        </MuiThemeProvider>
    );
};

export default ShyftWx;
