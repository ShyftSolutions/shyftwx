// import 'node_modules/leaflet-geosearch/dist/geosearch.css';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AutoSuggest from 'react-autosuggest';
import { Feature } from 'geojson';
import { searchAsync } from '../../apis/geocoding/geocoding';

// const provider = new OpenStreetMapProvider();

const useStyles = makeStyles((theme: Theme) =>
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
        }
    })
);

export const SearchField: React.FC<SearchFieldProps> = ({ label, handleChange }) => {
    const classes = useStyles();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(event.target.value);
    };

    return (
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder={label}
                inputProps={{ 'aria-label': label }}
                onChange={onChange}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default SearchField;
