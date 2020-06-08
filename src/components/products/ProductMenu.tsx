import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, List, ListItem, ListItemText, Collapse, ListItemIcon, Typography, Box } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        color: theme.palette.primary.darkText,
    },
    icon: {},
    selectedIcon: {
        color: theme.palette.selected.text,
    }
}));

/**
 * Uses Material UI to create an accordian dropdown with main categories
 * and subcategories. 'defaultOptions' should be an array of objects in the
 * form of:
 *
 * {
            name: STRING,
            open: BOOLEAN,
            products: [{
                name: STRING,
                icon: FAICON,
            }, {
                name: STRING,
                icon: FAICON,
            }]
        },
 *
 * @param {Array[Object]} defaultOptions
 */
export const ProductMenu = ({ defaultOptions, onCategoryClick }) => {
    const classes = useStyles();
    const [selectedProduct, setSelectedProduct] = React.useState();
    const [categories, setCategories] = React.useState(defaultOptions || []);

    const handleClick = (cat) => {
        if (onCategoryClick) {
            onCategoryClick(cat);
        }

        const newCategories = categories.map((item, index) => {
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

    const handleListItemClick = (event, product) => {
        setSelectedProduct(product);
    };

    return (
        <div className={classes.root}>
            {categories.map((cat, index) => (
                <List key={index}>
                    <Paper className={classes.category}>
                        <ListItem button onClick={() => handleClick(cat)}>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography>
                                        <Box fontWeight={800} m={1} letterSpacing={1} fontSize={16}>
                                            {cat.name}
                                        </Box>
                                    </Typography>
                                }
                            />
                            {cat.open ? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                    </Paper>
                    <Paper>
                        <Collapse in={cat.open} timeout="auto" unmountOnExit>
                            {cat.products.map((product) => (
                                <ListItem
                                    button
                                    className={classes.nested}
                                    selected={selectedProduct === cat.name + ' ' + product.name}
                                    onClick={(event) => handleListItemClick(event, cat.name + ' ' + product.name)}
                                >
                                    <ListItemIcon>
                                        <FontAwesomeIcon
                                            className={
                                                selectedProduct === cat.name + ' ' + product.name
                                                    ? classes.selectedIcon
                                                    : classes.icon
                                            }
                                            icon={product.icon}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={product.name}/>
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
