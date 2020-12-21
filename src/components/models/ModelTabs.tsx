import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        paddingBottom: '10px',
        width: '60%',
        margin: 'auto'
    }
}));

const tabsStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.type === 'light' ? '#eee' : theme.palette.divider,
        borderRadius: 10,
        width: 'fit-content'
    },
    flexContainer: {
        display: 'inline-flex',
        position: 'relative',
        zIndex: 1
    },
    scroller: {
        [theme.breakpoints.up('md')]: {
            padding: '8px'
        }
    },
    indicator: {
        top: 3,
        bottom: 3,
        right: 3,
        height: 'auto',
        background: 'none'
    }
}));

const tabStyles = makeStyles((theme) => ({
    root: {
        minHeight: 50
    },
    wrapper: {
        color: theme.palette.text.primary,
        textTransform: 'initial'
    },
    selected: {
        borderRadius: 8,
        backgroundColor: theme.palette.type === 'light' ? '#fff' : theme.palette.action.selected,
        boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)'
    }
}));

export const VerticalTabs: React.FC<ModelSelectorProps> = ({ options, label = 'Model', action }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
        action(options[newValue]);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs"
                classes={tabsStyles()}
            >
                {options.map((option, index) => (
                    <Tab label={option} classes={tabStyles()} key={index} disableRipple {...a11yProps(index)} />
                ))}
            </Tabs>
        </div>
    );
};

export default VerticalTabs;
