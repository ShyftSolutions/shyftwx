import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    category: {
        fontWeight: 300,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    root: {
        width: '100%',
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4)
    }
}));

export const ProductMenu = ({ defaultCategories, onCategoryClick }) => {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(0);
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
                open: !cat.open,
            };
        });
        setCategories(newCategories);
    }

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <div className={classes.root}>
            {categories.map((cat, index) => (
                <List key={index}>
                    <Paper className={classes.category}>
                        <ListItem button className={classes.category} onClick={() => handleClick(cat)}>
                            <ListItemText primary={cat.name}/>
                            {cat.open ? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                    </Paper>
                    <Collapse in={cat.open} timeout="auto" unmountOnExit>
                            {cat.products.map((product, i) => (
                                <ListItem button className={classes.nested}
                                          selected={selectedProduct === (cat.name + ' ' + product.name)}
                                          onClick={(event) => handleListItemClick(event, cat.name + ' ' + product.name)}>
                                    <ListItemIcon>
                                        <FontAwesomeIcon className={classes.icon} icon={product.icon}/>
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