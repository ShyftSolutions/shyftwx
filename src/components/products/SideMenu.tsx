import { Divider, AppBar, CssBaseline, Toolbar, IconButton, Hidden, Drawer, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import ProductMenu from './ProductMenu';
import React from 'react';
import ModelSelector from '../models/ModelSelector';

const drawerWidth = 300;
const xlDrawerWidth = 350;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    drawer: {
        [theme.breakpoints.only('xl')]: {
            width: xlDrawerWidth,
            flexShrink: 0
        },
        [theme.breakpoints.between('sm', 'lg')]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        [theme.breakpoints.only('xl')]: {
            width: xlDrawerWidth
        },
        [theme.breakpoints.down('lg')]: {
            width: drawerWidth
        }
    }
}));

/**
 * Creates a product menu component with a label and a collapsable menu (ProductMenu)
 *
 * @param categories an object containing the names of the categories, their open state, and their products
 * @param label the label for this component
 * @param action to be completed upon a product being selected
 * @param window
 * @param options
 */
export const SideMenu: React.FC<ProductDrawerProps> = ({ categories, action, window, options }) => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [shouldSort, setShouldSort] = React.useState<boolean>(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // return a function to be passed down as the sort function
    const getSortFn = () => {
        if (shouldSort) {
            return function (a, b) {
                var nameA = a.name.toUpperCase();
                var nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            };
        } else {
            return function (a, b) {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return 1;
                }
                if (nameA > nameB) {
                    return -1;
                }

                // names must be equal
                return 0;
            };
        }
    };

    const menu = (
        <div>
            <ModelSelector options={options} action={(option) => console.log(option)} />
            <Divider />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '5px 5% 5px 5px',
                    color: shouldSort ? '#329af0' : '#aeaeae'
                }}
            >
                <SortByAlphaIcon onClick={() => setShouldSort(!shouldSort)} style={{ fontSize: '16pt' }} />
            </div>
            <ProductMenu options={categories} action={action} sortFn={getSortFn()} />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor="left"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                    >
                        {menu}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        variant="permanent"
                        open
                    >
                        {menu}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
};

export default SideMenu;
