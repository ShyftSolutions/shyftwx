import { CircularProgress, Grid, MuiThemeProvider, Typography } from '@material-ui/core';
import ModelSelector from './../models/ModelSelector';
import RunDropdown from './../runs/RunDropdown';
import RegionSelector from './../regions/RegionSelector';
import ProductSelector from './../products/ProductSelector';
import BaseWxViewer from './../viewers/BaseWxViewer';
import TimeControl from './../time/TimeControl';
import Slider from './../time/Slider';
import React from 'react';
import { getIndexAsync } from '../../apis';
import theme from '../../theme';

export const ShyftContext = React.createContext({});

export const ShyftWx: React.FC<ShyftWxProps> = ({ children, dataset, url, customer, themeOverride }) => {
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    // const [index, setIndex] = React.useState<ShyftIndex>();
    const [index, setIndex] = React.useState<Index>({datasets: []});

    React.useEffect(() => {
        if (url) {
            // https://api.shyftwx.com/datasets/lkjsdflsjd/Vision/
            // -> this returns a list of runs

            // https://api.shyftwx.com/datasets/lkjsdflsjd/Vision/{run}
            // -> this return a list of regions for the given run

            // https://api.shyftwx.com/datasets/lkjsdflsjd/Vision/{run}/{region}
            // -> this returns a list of items (products/levels/forecastHours)
            const customerUrl = `${url}/${customer}/${dataset}`
            let tempIndex = [];


            getIndexAsync(customerUrl).then((data: ShyftIndex) => {
                console.log(data);
                // setIndex(data);
                // console.log(index);

                data.datasets.map((dataset: ShyftDataset) => {
                    // console.log(dataset);

                    let boop: DatasetRegionRun = {
                        dataset: dataset.name,
                        region: dataset.region,
                        run: {
                            name: dataset.run,
                            levels: []
                        }
                    }

                    const runRegion = dataset.run.concat('-', dataset.region);
                    const datasetUrl = `${customerUrl}/${runRegion}`
                    getIndexAsync(datasetUrl).then((runRegionData: ShyftProductData) => {
                        console.log(runRegionData);
                        let items = runRegionData.items;

                        let uniqueLevels: Level[] = [];
                        // filter out levels
                        items.map((item) => {
                            // see if level is already in unique levels


                            if (uniqueLevels.filter(l => l.name === item.level).length == 0) {
                                uniqueLevels.push({name: item.level, products: []})
                            }
                        });

                        
                        // for every unique level, look for its products
                        uniqueLevels.map((lvl) => {
                            let lvlProducts: Product[] = [];

                            items.map((item) => {
                                if (item.level !== lvl.name) {
                                    return;
                                }

                                // see if level is already in unique levels
                                if (lvlProducts.filter(l => l.name === item.product).length == 0) {
                                    lvlProducts.push({ name: item.product, forecasts: []})
                                } else {
                                    console.log(item.product)
                                }
                            });

                           lvl.products = lvlProducts;
                        })

                        uniqueLevels.map((lvl) => {
                            lvl.products.map((product) => {

                                const filteredItems = items.filter((i) => i.level === lvl.name && i.product == product.name);
                                let forecasts: ForecastHour[] = []
                                filteredItems.map((item) => {    
                                    forecasts.push({hour: item.forecast, image: item.filename})
                                });

                                product.forecasts = forecasts;

                            });
                        });

                        boop.run.levels = uniqueLevels;
                        const indexes = {datasets: [boop]};
                        setIndex(indexes);
                        setLoading(false);
                    })
                })
                
            });
        } else {
            setError('No indexUrl or indexData provided.');
        }
    }, []);

    const tempAction = (boop) => {
        console.log('pressed ', boop)
    }

    const generateContent = (): React.ReactNode => {
        if (error) {
            return <Typography color="error">{error}</Typography>;
        }

        if (loading) {
            return <CircularProgress />;
        }

        const slider = [
            {
                value: 1,
                label: '01'
            },
            {
                value: 2,
                label: '02'
            },
            {
                value: 3,
                label: '03'
            },
            {
                value: 4,
                label: '04'
            },
            {
                value: 5,
                label: '05'
            },
            {
                value: 6,
                label: '06'
            },
            {
                value: 7,
                label: '07'
            },
            {
                value: 8,
                label: '08'
            },
            {
                value: 9,
                label: '09'
            },
            {
                value: 10,
                label: '10'
            },
            {
                value: 11,
                label: '11'
            },
            {
                value: 12,
                label: '12'
            },
        ];

        console.log(index.datasets[0].run.levels.map(lvl => lvl.name));

        return <React.Fragment>
            <Grid container item spacing={3}>
                <Grid item xs={2} />

                <Grid item xs={3}><ModelSelector options={['beep', 'boop']} action={tempAction} /></Grid>
                <Grid item xs={3}><RegionSelector options={['meep', 'moop']} action={tempAction}/></Grid>
                <Grid item xs={3}><RunDropdown label="Runs" options={['neep', 'noop']}/></Grid>
            </Grid>

            <Grid container item spacing={3}>
                {/* TODO: icons not coming - theme is maybe wrong?  color of text is off*/}
                <Grid item xs={2}>
                    <ProductSelector categories={() => index.datasets[0].run.levels.map(lvl => {return { name: lvl.name, open: false, products: lvl.products }})} 
                                     action={tempAction}/>
                </Grid>
                <Grid item xs={9}><BaseWxViewer neBounds={[0.0, 0.0]} swBounds={[-10.0, -10.0]} /></Grid>
            </Grid>

            <Grid container item spacing={3}>
                <Grid item xs={2} />

                <Grid item xs={2}><TimeControl onBack={tempAction} onNext={tempAction} onPlay={tempAction} onPause={tempAction}/></Grid>
                <Grid item xs={8}><Slider options={slider} /></Grid>
            </Grid>
        </React.Fragment>;
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