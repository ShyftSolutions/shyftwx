import { CircularProgress, Grid, MuiThemeProvider, Typography } from '@material-ui/core';
import BaseWxViewer from './../viewers/BaseWxViewer';
import ModelSelector from './../models/ModelSelector';
import ProductSelector from './../products/ProductSelector';
import React from 'react';
import RegionSelector from './../regions/RegionSelector';
import RunDropdown from './../runs/RunDropdown';
import RunsSelector from './../run/RunsSelector';
import Slider from '../time/Slider';
import TimeControl from './../time/TimeControl';
import { getIndexAsync } from '../../apis';
import theme from '../../theme';
import ValidTime from '../time/ValidTime';

export const ShyftContext = React.createContext({});

export const ShyftWx: React.FC<ShyftWxProps> = ({ children, dataset, url, customer, themeOverride }) => {
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [index, setIndex] = React.useState<Index>({ datasets: [] });
    const [selectedProduct, setSelectedProduct] = React.useState<string>('');
    const [selectedLevel, setSelectedLevel] = React.useState<string>('');
    const [selectedForecast, setSelectedForecast] = React.useState<string>('');

    const urlParams = React.useRef(new URLSearchParams(window.location.search));
    customer = customer || urlParams.current.get('customer') || '';
    dataset = dataset || urlParams.current.get('model') || '';

    const customerUrl = `${url}/${customer}/${dataset}`;

    const loadAsync = async () => {
        const indexData = (await getIndexAsync(customerUrl)) as ShyftIndex;

        if (!indexData || indexData.datasets.length === 0) {
            setError('No datasets available.');
            return;
        }

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

        if (!customer || !dataset) {
            setError('No customer or model provided.');
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

    /**
     * Compares the hours of two forecasts
     *
     * @param a
     * @param b
     */
    const compare = (a, b) => {
        const valA = Number(a.hour);
        const valB = Number(b.hour);

        let comparison = 0;
        if (valA > valB) {
            comparison = 1;
        } else if (valA < valB) {
            comparison = -1;
        }
        return comparison;
    };

    const onSliderNavigationNext = () => {
        const forecasts = getSelectedProduct().forecasts;
        forecasts.sort(compare);
        let forecastIndex = forecasts.findIndex((f) => f.hour === selectedForecast);

        if (forecastIndex + 1 == forecasts.length) {
            return;
        }

        setSelectedForecast(forecasts[forecastIndex + 1].hour);
    };

    const onSliderNavigationBack = () => {
        const forecasts = getSelectedProduct().forecasts;
        forecasts.sort(compare);
        const forecastIndex = forecasts.findIndex((f) => f.hour === selectedForecast);

        if (forecastIndex - 1 < 0) {
            return;
        }

        setSelectedForecast(forecasts[forecastIndex - 1].hour);
    };

    const onSliderNavigation = (value: number) => {
        const forecasts = getSelectedProduct().forecasts;
        forecasts.sort(compare);
        let forecastIndex = forecasts.findIndex((f) => +f.hour === +value);

        setSelectedForecast(forecasts[forecastIndex].hour);
    };

    const getOffset = (): React.ReactNode => {
        return <Grid item xs={3} />;
    };

    const getDateFromEpoch = (epoch: number) => {
        epoch = +index.datasets[0].run.name * 1000;
        const date: Date = new Date(epoch);
        return date;
    };
    /**
     * Takes an epoch time value and converts it to UTC time string
     *
     * @param epoch
     */
    const toUTCTime = (epoch: number) => {
        const date = getDateFromEpoch(epoch);
        let time: string;
        if (date.getUTCHours() === 0) {
            time = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()}T 00:${date.getUTCMinutes()}Z`;
        } else if (date.getUTCMinutes() === 0) {
            time = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()}T ${date.getUTCHours()}:00Z`;
        } else {
            time = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()}T ${date.getUTCHours()}:${date.getUTCMinutes()}Z`;
        }

        return time;
    };

    const getValidTime = (forecastTime: string, modelTime: Date) => {
        const validTime = new Date(modelTime.getTime() + (+forecastTime / 60) * 60000);
        return validTime;
    };

    const generateContent = (): React.ReactNode => {
        if (error) {
            return <Typography color="error">{error}</Typography>;
        }

        if (loading) {
            return <CircularProgress />;
        }

        const selectedProduct = getSelectedProduct();

        const levelProductVals = index.datasets[0].run.levels.map((lvl, index) => {
            return { name: lvl.name, open: index == 0, products: lvl.products };
        });
        const sliderVals = selectedProduct.forecasts.map((f) => {
            return { label: f.hour, value: f.hour };
        });
        const activeForecastLayer = selectedProduct.forecasts.filter((f) => f.hour === selectedForecast)[0].image;

        return (
            <React.Fragment>
                <Grid container item>
                    <Grid container item>
                        {getOffset()}
                        <Grid item xs={2}>
                            <ModelSelector options={[index.datasets[0].dataset]} action={() => {}} />
                        </Grid>
                        <Grid item xs={1}>
                            <RegionSelector options={[index.datasets[0].region.name]} action={() => {}} />
                        </Grid>
                        <Grid item xs={3}>
                            <RunsSelector options={[toUTCTime(+index.datasets[0].run.name)]} action={() => {}} />
                        </Grid>
                        <Grid item xs={3}>
                            <ValidTime
                                time={getValidTime(selectedForecast, getDateFromEpoch(+index.datasets[0].run.name))}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                {/* Product Menu Grid */}
                <Grid container item xs={3}>
                    {/* TODO: icons not coming - theme is maybe wrong?  color of text is off */}
                    <Grid container item>
                        <ProductSelector categories={levelProductVals} action={onProductSelect} />
                    </Grid>
                </Grid>

                {/* Viewer/Time Grid */}
                <Grid container xs={9}>
                    <Grid container item xs={12}>
                        <BaseWxViewer
                            layers={activeForecastLayer}
                            neBounds={[index.datasets[0].region.bbox.ymax, index.datasets[0].region.bbox.xmax]}
                            swBounds={[index.datasets[0].region.bbox.ymin, index.datasets[0].region.bbox.xmin]}
                        />
                    </Grid>

                    <Grid container item xs={12}>
                        <Grid container item xs={2}>
                            <TimeControl
                                onBack={onSliderNavigationBack}
                                onNext={onSliderNavigationNext}
                                onPlay={() => {}}
                                onPause={() => {}}
                            />
                        </Grid>

                        <Grid item xs={1} />

                        <Grid item xs={9}>
                            <Slider
                                options={sliderVals}
                                selected={selectedForecast}
                                action={onSliderNavigation}
                                modelTime={getDateFromEpoch(+index.datasets[0].run.name)}
                            />
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
