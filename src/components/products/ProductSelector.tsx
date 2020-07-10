import {
    Divider,
    AppBar,
    CssBaseline,
    Toolbar,
    IconButton,
    Typography,
    Hidden,
    Drawer,
    makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ProductMenu from './ProductMenu';
import React from 'react';

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
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

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menu = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <Typography variant="h6" style={{ paddingLeft: '6px' }}>
                {label}
            </Typography>
            <ProductMenu options={categories} action={action} />
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
                <Hidden mdUp implementation="css">
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
                <Hidden smDown implementation="css">
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
