import { CircularProgress, Grid, Hidden, makeStyles, MuiThemeProvider, Paper } from '@material-ui/core';
import ImageViewer from './../viewers/ImageViewer';
import ModelSelector from './../models/ModelSelector';
import ProductSelector from './../products/ProductSelector';
import React from 'react';
import RegionSelector from './../regions/RegionSelector';
import RunsSelector from './../run/RunsSelector';
import Slider from '../time/Slider';
import TimeControl from './../time/TimeControl';
import ValidTime from '../time/ValidTime';
import { getIndexAsync, getProductDataAsync } from '../../apis';
import theme from '../../theme';
import moment from 'moment';
import LandingPage from './LandingPage';
import { AppStatus, validateAppAsync } from '../../services/app-service';

export const ShyftContext = React.createContext({});

const drawerWidth = 250;
const xlDrawerWidth = 350;

const useStyles = makeStyles((theme) => ({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    contentClass: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginLeft: drawerWidth
    },
    '@media (max-width: 768px)': {
        contentClass: {
            marginLeft: 0
        }
    },
    '@media (min-width: 1460px)': {
        contentClass: {
            marginLeft: xlDrawerWidth
        }
    }
}));

export const ShyftWx: React.FC<ShyftWxProps> = ({ children, dataset, url, customer, themeOverride }) => {
    const classes = useStyles();

    const [status, setStatus] = React.useState(AppStatus.Okay);
    const [loading, setLoading] = React.useState(true);
    const [index, setIndex] = React.useState<Index>({ datasets: [] });
    const [selectedProduct, setSelectedProduct] = React.useState<string>('');
    const [selectedLevel, setSelectedLevel] = React.useState<string>('');
    const [selectedForecast, setSelectedForecast] = React.useState<string>('');
    // const [selectedRun, setSelectedRun] = React.useState<string>('');

    const urlParams = React.useRef(new URLSearchParams(window.location.search));
    const customerId = React.useRef(customer || urlParams.current.get('customer') || '');
    const datasetId = React.useRef(dataset || urlParams.current.get('model') || '');

    const loadAsync = async () => {
        setLoading(true);

        const appStatus = await validateAppAsync(url, customerId.current, datasetId.current);

        if (appStatus !== AppStatus.Okay) {
            setStatus(appStatus);
            setLoading(false);
            return;
        }

        const indexData = (await getIndexAsync(url, customerId.current, datasetId.current)) as ShyftIndex;

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

    React.useEffect(() => {
        loadAsync();
    }, []);

    const getSelectedLevel = () => {
        return index.datasets[0].run.levels.filter((lvl) => lvl.name === selectedLevel)[0];
    };

    const getSelectedProduct = () => {
        return getSelectedLevel().products.filter((p) => p.name === selectedProduct)[0];
    };

    const onProductSelect = (product: ProductSelectionResponse) => {
        setSelectedLevel(product.level);
        setSelectedProduct(product.product);
        setSelectedForecast(getSelectedProduct().forecasts[0].hour);
    };

    const onRunSelect = (buttonText: string) => {
        // setSelectedRun(buttonText);
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
        const forecastIndex = forecasts.findIndex((f) => f.hour === selectedForecast);

        if (forecastIndex + 1 === forecasts.length) {
            setSelectedForecast(forecasts[0].hour);
        } else {
            setSelectedForecast(forecasts[forecastIndex + 1].hour);
        }
    };

    const onSliderNavigationBack = () => {
        const forecasts = getSelectedProduct().forecasts;
        forecasts.sort(compare);
        const forecastIndex = forecasts.findIndex((f) => f.hour === selectedForecast);

        if (forecastIndex - 1 < 0) {
            setSelectedForecast(forecasts[forecasts.length - 1].hour);
        } else {
            setSelectedForecast(forecasts[forecastIndex - 1].hour);
        }
    };

    const onSliderNavigation = (value: number) => {
        value -= +index.datasets[0].run.name;
        const forecasts = getSelectedProduct().forecasts;
        forecasts.sort(compare);
        const forecastIndex = forecasts.findIndex((f) => +f.hour === +value);

        setSelectedForecast(forecasts[forecastIndex].hour);
    };

    const onToggleToPlay = (isRunning: boolean) => {
        const forecasts = getSelectedProduct().forecasts;
        forecasts.sort(compare);

        if (!isRunning) {
            setSelectedForecast(forecasts[0].hour);
        } else {
            const forecastIndex = forecasts.findIndex((f) => f.hour === selectedForecast);

            if (selectedForecast === forecasts[forecasts.length - 1].hour) {
                setSelectedForecast(forecasts[0].hour);
            } else {
                setSelectedForecast(forecasts[forecastIndex + 1].hour);
            }
        }
    };

    const getValidTime = () => {
        return moment
            .unix(+index.datasets[0].run.name + +selectedForecast)
            .utc()
            .format('MM/DD HH:mm[Z]');
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

        const selectedProduct = getSelectedProduct();

        const levelProductVals = index.datasets[0].run.levels.map((lvl, index) => {
            return { name: lvl.name, open: index === 0, products: lvl.products };
        });

        const sliderVals: SliderValueItem[] = selectedProduct.forecasts
            .map((f) => {
                return {
                    value: +f.hour + +index.datasets[0].run.name,
                    label: moment
                        .unix(+f.hour + +index.datasets[0].run.name)
                        .utc()
                        .format('MM/DD HH:mm[Z]')
                };
            })
            .sort((valA, valB) => valA.value - valB.value);

        const activeForecastLayer = selectedProduct.forecasts.filter((f) => f.hour === selectedForecast)[0].image;

        return (
            <React.Fragment>
                {/* Product Menu Grid */}
                <Grid container>
                    <ProductSelector
                        data-cy="product-selector"
                        categories={levelProductVals}
                        action={onProductSelect}
                    />
                </Grid>

                <main className={classes.contentClass}>
                    <Hidden smUp>
                        <div className={classes.toolbar} />
                    </Hidden>

                    {/* Model/Region/Run/Valid Menu Grid */}
                    <Grid container justify="space-between" spacing={1}>
                        <Grid item xs sm md>
                            <ModelSelector
                                data-cy="model-selector"
                                options={[index.datasets[0].dataset]}
                                action={() => {}}
                            />
                        </Grid>
                        <Grid item xs md>
                            <RegionSelector
                                data-cy="region-selector"
                                options={[index.datasets[0].region.name]}
                                action={() => {}}
                            />
                        </Grid>
                        <Grid item xs sm md>
                            <RunsSelector
                                data-cy="runs-selector"
                                options={[+index.datasets[0].run.name]}
                                action={onRunSelect}
                            />
                        </Grid>
                        <Hidden xsDown>
                            <Grid item xs={12} md>
                                <ValidTime time={getValidTime()} />
                            </Grid>
                        </Hidden>
                    </Grid>

                    {/* Viewer/Time Grid */}
                    <Grid container direction="column" spacing={1}>
                        <Grid container justify="center" item xs={12}>
                            <ImageViewer image={activeForecastLayer} />
                        </Grid>

                        <Grid container item justify="center" alignItems="center">
                            <Grid item md={3} sm={5} xs={5}>
                                <TimeControl
                                    data-cy="time-control"
                                    onBack={onSliderNavigationBack}
                                    onNext={onSliderNavigationNext}
                                    onToggle={onToggleToPlay}
                                />
                            </Grid>

                            <Grid item md={9} sm={11} xs={12}>
                                <Slider
                                    data-cy="slider"
                                    options={sliderVals}
                                    selected={+selectedForecast + +index.datasets[0].run.name}
                                    action={onSliderNavigation}
                                />
                            </Grid>
                        </Grid>

                        <Hidden smUp>
                            <Grid item xs={12}>
                                <ValidTime time={getValidTime()} />
                            </Grid>
                        </Hidden>
                    </Grid>
                </main>
            </React.Fragment>
        );
    };

    return (
        <MuiThemeProvider theme={themeOverride || theme}>
            <ShyftContext.Provider value={{ data: index }}>
                <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                    {generateContent()}
                </Grid>
            </ShyftContext.Provider>
        </MuiThemeProvider>
    );
};

export default ShyftWx;
