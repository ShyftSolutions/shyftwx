// import 'node_modules/leaflet-geosearch/dist/geosearch.css';
import { Grid, TextField, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete } from '@material-ui/lab';
import throttle from 'lodash/throttle';
import React from 'react';
import { searchAsync } from '../../apis';
import { Feature } from 'geojson';

// const provider = new OpenStreetMapProvider();

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            marginBottom: theme.spacing(1)
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1
        },
        iconButton: {
            padding: 10
        },
        icon: {
            color: theme.palette.text.secondary,
            marginRight: theme.spacing(2)
        }
    })
);

export const SearchField: React.FC<SearchFieldProps> = (props) => {
    const { label, handleChange } = props;

    const classes = useStyles();

    const [value, setValue] = React.useState<Feature | null>(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<Feature[]>([]);
    const loaded = React.useRef(false);

    // const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     handleChange(event.target.value);
    // };

    const fetch = React.useMemo(
        () =>
            throttle((request, callback) => {
                searchAsync(request.input).then((results) => callback(results.features));
            }, 200),
        []
    );

    React.useEffect(() => {
        let active = true;

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results) => {
            if (active) {
                let newOptions: Feature[] = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <Paper component="form" className={classes.root}>
            <Autocomplete
                style={{ width: 300 }}
                getOptionLabel={(option) => (typeof option === 'string' ? option : (option as any).place_name)}
                filterOptions={(x) => x}
                options={options}
                autoComplete
                includeInputInList
                filterSelectedOptions
                value={value}
                onChange={(event, newValue) => {
                    setOptions(newValue ? [newValue, ...options] : options);
                    setValue(newValue);

                    if (newValue) {
                        handleChange({ name: (newValue as any).place_name, coords: (newValue as any).center });
                    } else {
                        handleChange({ name: '', coords: [] });
                    }
                }}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label="Add a location" variant="outlined" fullWidth />}
                renderOption={(option) => {
                    return (
                        <Grid container alignItems="center">
                            <Grid item>
                                <LocationOnIcon className={classes.icon} />
                            </Grid>
                            <Grid item xs>
                                <Typography variant="body2" color="textSecondary">
                                    {(option as any).place_name}
                                </Typography>
                            </Grid>
                        </Grid>
                    );
                }}
            />
            {/* <InputBase
                className={classes.input}
                placeholder={label}
                inputProps={{ 'aria-label': label }}
                onChange={onChange}
                defaultValue={value}
            /> */}
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default SearchField;
