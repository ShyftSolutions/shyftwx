import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginRight: theme.spacing(2)
    },
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
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
            <Paper className={classes.paper}>
                <List>
                    {categories.map((cat, index) => (
                        <List key={index}>
                            <ListItem button onClick={() => handleClick(cat)}>
                                <ListItemText primary={cat.name}/>
                                {cat.open ? <ExpandLess/> : <ExpandMore/>}
                            </ListItem>
                            <Collapse in={cat.open} timeout="auto" unmountOnExit>
                                {cat.products.map((product, i) => (
                                    // FIX selectedIndex to be scalable
                                    <ListItem button className={classes.nested} selected={selectedIndex === Number(index.toString() + i.toString())}
                                              onClick={(event) => handleListItemClick(event, Number(index.toString() + i.toString()))}>
                                        <ListItemText primary={product}/>
                                    </ListItem>
                                ))}
                            </Collapse>
                        </List>
                    ))}
                </List>
            </Paper>
        </div>
    );
};

export default ProductMenu;