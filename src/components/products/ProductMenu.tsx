import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, List, ListItem, ListItemText, Collapse, ListItemIcon, Typography, Box } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 300
    },
    category: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main
    },
    nested: {
        paddingLeft: theme.spacing(4),
        color: theme.palette.secondary.contrastText
    },
    icon: {},
    selectedIcon: {
        color: theme.palette.primary.contrastText
    }
}));

const ICON_MAP = {
    Ceiling: fas.faCloud,
    DewpointTemperature: fas.faTint,
    Pressure: fas.faArrowDown,
    RelativeHumidity: fas.faPercent,
    Temperature: fas.faTemperatureHigh,
    TotalPrecipitation: fas.faCloudShowersHeavy,
    Visibility: fas.faEye,
    Wind: fas.faWind
};

/**
 * Default settings for a menu with no populating options
 */
const emptyMenu = [
    {
        name: 'Menu',
        open: true,
        products: [
            {
                name: 'A'
            },
            {
                name: 'B'
            }
        ]
    }
];

/**
 * Uses Material UI to create a product menu with categories and subcategories
 * 
 * @param options [
    {
        name: 'Menu',
        open: true,
        products: [
            {
                name: 'A'
            },
            {
                name: 'B'
            }
        ]
    }
  ]
  * @param action function that handles the selected product in the parent component
 */
export const ProductMenu: React.FC<ProductMenuProps> = ({ options = emptyMenu, action }) => {
    const classes = useStyles();

    const [selectedProduct, setSelectedProduct] = React.useState(`${options[0].name} ${options[0].products[0].name}`);
    const [categories, setCategories] = React.useState(options || []);

    /**
     * Creates a new set of categories with 'cat' open property toggled.
     * Set the new categories to the categories state
     *
     * @param cat the category that was clicked on
     */
    const handleClick = (cat: Category) => {
        const newCategories = categories.map((item: Category) => {
            if (item !== cat) {
                return item;
            }
            return {
                ...item,
                open: !cat.open
            };
        });

        setCategories(newCategories);
    };

    /**
     * Handles the click on a list item by setting the selected product
     * and performing action
     *
     * @param event
     * @param product
     */
    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        product: ProductSelectionResponse
    ) => {
        setSelectedProduct(product.level + ' ' + product.product);
        action(product);
    };

    return (
        <div className={classes.root}>
            {/**
             * Loop through the list of categories and create the labels for each
             */}
            {categories.map((cat: Category, index: number) => (
                <List key={index}>
                    <Paper className={classes.category}>
                        <ListItem button onClick={() => handleClick(cat)}>
                            <ListItemText
                                primary={
                                    <Box m={1}>
                                        <Typography style={{ fontWeight: 800, fontSize: 16, letterSpacing: 1 }}>
                                            {cat.name}
                                        </Typography>
                                    </Box>
                                }
                            />
                            {cat.open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                    </Paper>
                    <Paper>
                        <Collapse in={cat.open} timeout="auto" unmountOnExit>
                            {/**
                             * Loop through the current category's products, and display each
                             * underneath their category.
                             */}
                            {cat.products.map((product: CategoryProduct, index: number) => (
                                <ListItem
                                    key={index}
                                    button
                                    className={classes.nested}
                                    selected={selectedProduct === cat.name + ' ' + product.name}
                                    onClick={(event) =>
                                        handleListItemClick(event, { level: cat.name, product: product.name })
                                    }
                                >
                                    {/**
                                     * If there is an icon for this product, display it before the product name
                                     */}
                                    {ICON_MAP[product.name] !== undefined && (
                                        <ListItemIcon>
                                            <FontAwesomeIcon
                                                className={
                                                    selectedProduct === cat.name + ' ' + product.name
                                                        ? classes.selectedIcon
                                                        : classes.icon
                                                }
                                                icon={ICON_MAP[product.name]}
                                            />
                                        </ListItemIcon>
                                    )}
                                    <ListItemText primary={product.name} />
                                </ListItem>
                            ))}
                        </Collapse>
                    </Paper>
                </List>
            ))}
        </div>
    );
};

export default ProductMenu;
