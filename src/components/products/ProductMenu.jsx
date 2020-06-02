import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, List, ListItem, ListItemText, Collapse, ListItemIcon } from '@material-ui/core';
import { ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons';

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
                                <List component="div" disablePadding/>
                                <ListItem button className={classes.nested} selected={selectedIndex === index}
                                          onClick={(event) => handleListItemClick(event, index)}>
                                    <ListItemIcon>
                                        <StarBorder/>
                                    </ListItemIcon>
                                    <ListItemText primary="Temperature and Wind"/>
                                </ListItem>
                            </Collapse>
                        </List>
                    ))}
                </List>
            </Paper>
        </div>
    );
};

export default ProductMenu;