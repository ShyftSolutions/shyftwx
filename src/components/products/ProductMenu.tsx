import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, List, ListItem, ListItemText, Collapse, ListItemIcon, Typography, Box } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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
    color: theme.palette.secondary.dark
  }
}));

const emptyMenu = [
  {
    name: 'Menu',
    open: true,
    products: [{
      name: 'A'
    },
      {
        name: 'B'
      }]
  }
];

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
 * @param Props: {options: string[]}
 */
export const ProductMenu: React.FC<ProductMenuProps> = ({ options = emptyMenu, action }) => {
  const classes = useStyles();
  const [selectedProduct, setSelectedProduct] = React.useState(`${options[0].name} ${options[0].products[0].name}`);
  const [categories, setCategories] = React.useState(options || []);

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

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, product: ProductSelectionResponse) => {
    setSelectedProduct(product.level + ' ' + product.product);
    action(product);
  };

  return (
    <div className={classes.root}>
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
              {cat.open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
          </Paper>
          <Paper>
            <Collapse in={cat.open} timeout="auto" unmountOnExit>
              {cat.products.map((product: CategoryProduct, index: number) => (
                <ListItem
                  key={index}
                  button
                  className={classes.nested}
                  selected={selectedProduct === cat.name + ' ' + product.name}
                  onClick={(event) => handleListItemClick(event, { level: cat.name, product: product.name })}
                >
                  {product.icon != undefined &&
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
                  }
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
