import {
    AppBar,
    CssBaseline,
    Divider,
    Drawer,
    Hidden,
    IconButton,
    makeStyles,
    Toolbar,
    Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import React from 'react';
import ProductMenu from './ProductMenu';

const drawerWidth = 250;
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
 */
export const ProductSelector: React.FC<ProductDrawerProps> = ({ categories, label = 'Products', action, window }) => {
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
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
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
            <div className={classes.toolbar} />
            <Divider />
            <Toolbar style={{ paddingLeft: '6px', paddingRight: '6px' }}>
                <Typography variant="h6" style={{ paddingLeft: '6px', flex: 1 }}>
                    {label}
                </Typography>
                <div style={shouldSort ? { color: '#329af0' } : { color: '#aeaeae' }}>
                    <SortByAlphaIcon onClick={() => setShouldSort(!shouldSort)} style={{ fontSize: '16pt' }} />
                </div>
            </Toolbar>
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

export default ProductSelector;
