import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, List, ListItem, ListItemText, Collapse, ListItemIcon, Typography, Box } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(1.5)
    },
    paper: {
        width: '95%',
        backgroundColor: theme.palette.primary.main
    },
    category: {
        color: theme.palette.primary.contrastText
    },
    nested: {
        paddingLeft: theme.spacing(4),
        color: theme.palette.primary.contrastText,
        width: '95%'
    },
    icon: {},
    selectedIcon: {
        color: theme.palette.text.selected
    }
}));
export const ProductMenu = ({ defaultCategories, onCategoryClick }) => {
    const classes = useStyles();
    const [selectedProduct, setSelectedProduct] = React.useState();
    const [categories, setCategories] = React.useState(defaultCategories || []);

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
                    <Paper className={classes.paper}>
                        <ListItem button className={classes.category} onClick={() => handleClick(cat)}>
                            <ListItemText disableTypography primary= {
                                <Typography>
                                    <Box fontWeight="fontWeightBold" m={1} fontSize={16}>
                                    {cat.name}
                                    </Box>
                                </Typography>}
                            />
                            {cat.open ? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                    </Paper>

                    <Collapse in={cat.open} timeout="auto" unmountOnExit>
                        {cat.products.map((product) => (
                            <ListItem button className={classes.nested}
                                      selected={selectedProduct === (cat.name + ' ' + product.name)}
                                      onClick={(event) => handleListItemClick(event, cat.name + ' ' + product.name)}>
                                <ListItemIcon>
                                    <FontAwesomeIcon
                                        className={selectedProduct === (cat.name + ' ' + product.name) ? classes.selectedIcon : classes.icon}
                                        icon={product.icon}/>
                                </ListItemIcon>
                                <ListItemText primary={product.name}/>
                            </ListItem>
                        ))}
                    </Collapse>

                </List>
            ))}
        </div>
    );
};
export default ProductMenu;