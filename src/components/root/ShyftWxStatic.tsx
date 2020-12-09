import { Grid, Hidden, makeStyles } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import Slider from '../time/Slider';
import ValidTime from '../time/ValidTime';
import ModelSelector from './../models/ModelSelector';
import ProductSelector from './../products/ProductSelector';
import RegionSelector from './../regions/RegionSelector';
import RunsSelector from './../run/RunsSelector';
import TimeControl from './../time/TimeControl';
import ImageViewer from './../viewers/ImageViewer';

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
    '@media (max-width: 767px)': {
        contentClass: {
            marginLeft: 0
        }
    },
    '@media (min-width: 1459px)': {
        contentClass: {
            marginLeft: xlDrawerWidth
        }
    }
}));

export const ShyftWxStatic: React.FC<ShyftWxContentProps> = ({
    index,
    forecast,
    level,
    product,
    region,
    run,
    onForecastSelect,
    onLevelSelect,
    onProductSelect,
    onRegionSelect,
    onRunSelect
}) => {
    const classes = useStyles();

    const getSelectedLevel = () => {
        return index.datasets[0].run.levels.filter((lvl) => lvl.name === level)[0];
    };

    const getSelectedProduct = () => {
        return getSelectedLevel().products.filter((p) => p.name === product)[0];
    };

    const handleProductSelect = (product: ProductSelectionResponse) => {
        onLevelSelect(product.level);
        onProductSelect(product.product);
        onForecastSelect(getSelectedProduct().forecasts[0].hour);
    };

    const handleRunSelect = (buttonText: string) => {
        console.log(buttonText);
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
        const forecastIndex = forecasts.findIndex((f) => f.hour === forecast);

        if (forecastIndex + 1 === forecasts.length) {
            onForecastSelect(forecasts[0].hour);
        } else {
            onForecastSelect(forecasts[forecastIndex + 1].hour);
        }
    };

    const onSliderNavigationBack = () => {
        const forecasts = getSelectedProduct().forecasts;
        forecasts.sort(compare);
        const forecastIndex = forecasts.findIndex((f) => f.hour === forecast);

        if (forecastIndex - 1 < 0) {
            onForecastSelect(forecasts[forecasts.length - 1].hour);
        } else {
            onForecastSelect(forecasts[forecastIndex - 1].hour);
        }
    };

    const onSliderNavigation = (value: number) => {
        value -= +index.datasets[0].run.name;
        const forecasts = getSelectedProduct().forecasts;
        forecasts.sort(compare);
        const forecastIndex = forecasts.findIndex((f) => +f.hour === +value);

        onForecastSelect(forecasts[forecastIndex].hour);
    };

    const onToggleToPlay = (isRunning: boolean) => {
        const forecasts = getSelectedProduct().forecasts;
        forecasts.sort(compare);

        if (!isRunning) {
            onForecastSelect(forecasts[0].hour);
        } else {
            const forecastIndex = forecasts.findIndex((f) => f.hour === forecast);

            if (forecast === forecasts[forecasts.length - 1].hour) {
                onForecastSelect(forecasts[0].hour);
            } else {
                onForecastSelect(forecasts[forecastIndex + 1].hour);
            }
        }
    };

    const getValidTime = () => {
        const validTime = moment
            .unix(+index.datasets[0].run.name + +forecast)
            .utc()
            .format('MM/DD HH:mm[Z]');
        return validTime;
    };

    const generateContent = (): React.ReactNode => {
        const selectedProduct = getSelectedProduct();

        const levelProductVals = index.datasets[0].run.levels.map((lvl, index) => {
            return { name: lvl.name, open: index === 0, products: lvl.products };
        });

        const sliderVals: SliderValueItem[] = selectedProduct.forecasts.map((f) => {
            return {
                value: +f.hour + +index.datasets[0].run.name,
                label: moment
                    .unix(+f.hour + +index.datasets[0].run.name)
                    .utc()
                    .format('MM/DD HH:mm[Z]')
            };
        });

        const activeForecastLayer = selectedProduct.forecasts.filter((f) => f.hour === forecast)[0].image;

        return (
            <React.Fragment>
                {/* Product Menu Grid */}
                <Grid container>
                    <ProductSelector
                        data-cy="product-selector"
                        categories={levelProductVals}
                        action={handleProductSelect}
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
                                action={handleRunSelect}
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
                                    selected={+forecast + +index.datasets[0].run.name}
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

    return <React.Fragment>{generateContent()}</React.Fragment>;
};

export default ShyftWxStatic;
