import React from 'react';
import { makeStyles, Collapse, List, ListItem, ListItemIcon, ListItemText, Paper } from '@material-ui/core';
import { ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function NestedList({category}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (

        <List>
            <ListItem button onClick={handleClick} >
                <ListItemText className={classes.category} primary={category} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Temperature and Wind" />
                    </ListItem>
                    <ListItem button className={classes.nested} selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Relative Humidity" />
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
}