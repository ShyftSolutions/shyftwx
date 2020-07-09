import { CircularProgress, Grid, MuiThemeProvider, makeStyles, Hidden } from '@material-ui/core';
import ImageViewer from './../viewers/ImageViewer';
import ModelSelector from './../models/ModelSelector';
import ProductSelector from './../products/ProductSelector';
import React from 'react';
import RegionSelector from './../regions/RegionSelector';
import RunsSelector from './../run/RunsSelector';
import Slider from '../time/Slider';
import TimeControl from './../time/TimeControl';
import ValidTime from '../time/ValidTime';
import { getIndexAsync } from '../../apis';
import theme from '../../theme';
import clsx from 'clsx';
import moment from 'moment';
import LandingPage from './Page';

export const ShyftContext = React.createContext({});

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    // necessary for content to be below app bar
    [theme.breakpoints.down('xs')]: {
        toolbar: theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            marginLeft: drawerWidth
        }
    }
}));

export const ShyftWx: React.FC<ShyftWxProps> = ({ children, dataset, url, customer, themeOverride }) => {
    const classes = useStyles();

    const [loading, setLoading] = React.useState(true);
    const [index, setIndex] = React.useState<Index>({ datasets: [] });
    const [selectedProduct, setSelectedProduct] = React.useState<string>('');
    const [selectedLevel, setSelectedLevel] = React.useState<string>('');
    const [selectedForecast, setSelectedForecast] = React.useState<string>('');
    const [selectedRun, setSelectedRun] = React.useState<string>('');
    const [landingPage, setLandingPage] = React.useState(false);

    const urlParams = React.useRef(new URLSearchParams(window.location.search));
    customer = customer || urlParams.current.get('customer') || '';
    dataset = dataset || urlParams.current.get('model') || '';

    const customerUrl = `${url}/${customer}/${dataset}`;

    const loadAsync = async () => {
        const indexData = (await getIndexAsync(customerUrl)) as ShyftIndex;

        if (!indexData || indexData.datasets.length === 0) {
            setLandingPage(true);
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
                        .filter((item) => item.level === lvl.name && item.product === product.name) // only look at specific level and product
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
            setLandingPage(true);
            return;
        }

        if (!customer || !dataset) {
            setLandingPage(true);
        }

        setLoading(true);

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
        console.log(buttonText);
        //setSelectedRun(buttonText);
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
        const validTime = moment
            .unix(+index.datasets[0].run.name + +selectedForecast)
            .utc()
            .format('MM/DD HH:mm[Z]');
        return validTime;
    };

    const generateContent = (): React.ReactNode => {
        if (landingPage) {
            return <LandingPage url={url} />;
        }

        if (loading) {
            return <CircularProgress />;
        }

        const selectedProduct = getSelectedProduct();

        const levelProductVals = index.datasets[0].run.levels.map((lvl, index) => {
            return { name: lvl.name, open: index === 0, products: lvl.products };
        });

        const sliderVals: sliderValueItem[] = selectedProduct.forecasts.map((f) => {
            return {
                value: +f.hour + +index.datasets[0].run.name,
                label: moment
                    .unix(+f.hour + +index.datasets[0].run.name)
                    .utc()
                    .format('MM/DD HH:mm[Z]')
            };
        });

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

                <main className={clsx(classes.content)}>
                    <div className={classes.toolbar} />

                    {/* Model/Region/Run/Valid Menu Grid */}
                    <Grid container justify="space-between" spacing={1}>
                        <Grid item xs sm={3} md>
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
                        <Grid item xs={6} sm={6} md>
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
                        <Grid container item xs={12}>
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
