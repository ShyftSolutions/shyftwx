import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
        width: '90%',
        margin: 'auto',
        border: '1px solid rgba(174, 174, 174, 0.75)',
        borderRadius: '4px'
    },
    categoryStyle: {
        borderBottom: '1px solid rgba(174, 174, 174, 0.75)'
    },
    categoryText: {
        fontWeight: 400,
        fontSize: 16,
        paddingLeft: 8,
        color: '#212529'
    },
    label: {
        backgroundColor: 'white',
        color: '#F76707',
        fontSize: '13px',
        fontWeight: 800,
        letterSpacing: '.75px',
        padding: '0px 2px',
        transform: 'translate(11px, -9px)',
        position: 'absolute',
        zIndex: 1
    },
    nested: {
        paddingLeft: theme.spacing(4),
        backgroundColor: '#f8f9fa'
    },
    icon: {},
    text: {},
    selected: {
        fontWeight: 600,
        color: theme.palette.primary.contrastText
    }
}));

const ICON_MAP = {
    Ceiling: fas.faCloud,
    DewpointTemperature: fas.faTint,
    Pressure: fas.faArrowDown,
    RelativeHumidity: fas.faPercent,
    Temperature: fas.faTemperatureHigh,
    SurfaceTemperature: fas.faTemperatureHigh,
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
 * @param sortFn
 */
export const ProductMenu: React.FC<ProductMenuProps> = ({ options = emptyMenu, action, sortFn }) => {
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
            <label className={classes.label}>Products</label>
            {/**
             * Loop through the list of categories and create the labels for each
             */}
            {categories.sort(sortFn).map((cat: Category, index: number) => (
                <List key={index} style={{ paddingBottom: '0px' }}>
                    <ListItem
                        data-cy={cat.name}
                        button
                        onClick={() => handleClick(cat)}
                        className={classes.categoryStyle}
                    >
                        <ListItemText primary={<Typography className={classes.categoryText}>{cat.name}</Typography>} />
                        {cat.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={cat.open} timeout="auto" unmountOnExit>
                        {/**
                         * Loop through the current category's products, and display each
                         * underneath their category.
                         */}
                        {cat.products.map((product: CategoryProduct, index: number) => (
                            <ListItem
                                data-cy={cat.name + '-' + product.name}
                                key={index}
                                button
                                className={classes.nested}
                                style={
                                    index === cat.products.length - 1
                                        ? { borderBottom: '1px solid rgba(174, 174, 174, 0.75)' }
                                        : {}
                                }
                                selected={selectedProduct === cat.name + ' ' + product.name}
                                onClick={(event) =>
                                    handleListItemClick(event, { level: cat.name, product: product.name })
                                }
                                disableRipple
                            >
                                {/**
                                 * If there is an icon for this product, display it before the product name
                                 */}
                                {ICON_MAP[product.name] !== undefined && (
                                    <ListItemIcon>
                                        <FontAwesomeIcon
                                            className={
                                                selectedProduct === cat.name + ' ' + product.name
                                                    ? classes.selected
                                                    : classes.icon
                                            }
                                            icon={ICON_MAP[product.name]}
                                        />
                                    </ListItemIcon>
                                )}
                                <ListItemText
                                    primary={
                                        <Typography
                                            className={
                                                selectedProduct === cat.name + ' ' + product.name
                                                    ? classes.selected
                                                    : classes.text
                                            }
                                        >
                                            {product.name}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </Collapse>
                </List>
            ))}
        </div>
    );
};

export default ProductMenu;
