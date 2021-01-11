import axios from 'axios';
import { makeStyles, ButtonGroup, Button, Grid, Typography, List, ListItem, ListItemText, Collapse, ListItemIcon, CssBaseline, AppBar, Toolbar, IconButton, Hidden, Drawer, Divider, createStyles, Paper, createMuiTheme, fade, responsiveFontSizes, Fab, MuiThemeProvider, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import MenuIcon from '@material-ui/icons/Menu';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import { makeStyles as makeStyles$1 } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles as makeStyles$2, createStyles as createStyles$1, TextField } from '@material-ui/core/';
import moment from 'moment';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Button$1 from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PauseIcon from '@material-ui/icons/Pause';
import startCase from 'lodash/startCase';
import mergeWith from 'lodash/mergeWith';
import isEqual from 'lodash/isEqual';
import get$1 from 'lodash/get';
import debounce from 'lodash/debounce';
import 'leaflet/dist/leaflet.css';
import { Map as Map$1, TileLayer, Marker, Popup } from 'react-leaflet';
import { latLngBounds, Icon } from 'leaflet';

const MAPBOX_KEY = 'pk.eyJ1Ijoiam9lMTIzMSIsImEiOiJjanlqMzV5MnAwMXdhM21vZDl4dXFqYmY0In0.02hMgnNRIBws9IM7ZoHsIg';

const MAPBOX_API_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/{SEARCH_TEXT}.json?country=US&access_token=' + MAPBOX_KEY;
const MAPBOX_DIRECTIONS_API_URL = 'https://api.mapbox.com/directions/v5/mapbox/driving-traffic/{COORDS}?geometries=geojson&overview=full&annotations=duration,congestion,speed&access_token=' + MAPBOX_KEY;
const SHYFT_CAR_ROUTE_API_URL = 'https://api.shyftwx.com/v1/product/car_route';
const SHYFT_CAPS_URL = 'https://ogc.shyftwx.com/ogcRestful/layers';
const SHYFT_WCS_ROUTE = 'https://api.shyftwx.com/getwxdata/point';
const getProductUrl = (baseUrl, customerId, datasetId, region, run) => {
  return `${baseUrl}/${customerId}/${datasetId}/products${region && run ? `/${run}-${region}` : ''}`;
};
const getOutputUrl = (baseUrl, customerId, datasetId, run) => {
  return `${baseUrl}/${customerId}/${datasetId}/outputs${run ? `/${run}` : ''}`;
};
const getIndexAsync = (baseUrl, customerId, datasetId) => {
  const url = getProductUrl(baseUrl, customerId, datasetId);
  return fetch(url).then(response => response.json());
};
const getProductDataAsync = (baseUrl, customerId, datasetId, region, run) => {
  const url = getProductUrl(baseUrl, customerId, datasetId, region, run);
  return fetch(url).then(response => response.json());
};
const getOutputStatusAsync = (baseUrl, customerId, datasetId) => {
  const url = getOutputUrl(baseUrl, customerId, datasetId);
  return fetch(url).then(response => response.status !== 200 ? Promise.reject(response) : response.json());
};
const getOutputRunStatusAsync = (baseUrl, customerId, datasetId, run) => {
  const url = getOutputUrl(baseUrl, customerId, datasetId, run);
  return fetch(url).then(response => response.json());
};
function directionsAsync(coords) {
  let stringCoords = '';
  coords.forEach(c => {
    stringCoords += `${c[0]},${c[1]};`;
  });
  stringCoords = stringCoords.slice(0, stringCoords.length - 1);
  const url = MAPBOX_DIRECTIONS_API_URL.replace('{COORDS}', stringCoords);
  return axios.get(url).then(response => response.data);
}
const carRouteAsync = (currentRoute, startTime) => {
  startTime.setMilliseconds(0);
  startTime.setSeconds(0);
  startTime.setMinutes(0);
  const route = currentRoute.routes[0];
  return axios.post(SHYFT_CAR_ROUTE_API_URL, {
    start_time: startTime.toISOString().slice(0, -1),
    routes: {
      geometry: route.geometry,
      legs: [{
        annotation: {
          duration: route.legs[0].annotation.duration,
          distance: [route.legs[0].distance]
        }
      }]
    }
  }, {
    withCredentials: true
  }).then(response => response.data).then(data => {
    return data;
  });
};

var index = {
    __proto__: null,
    MAPBOX_API_URL: MAPBOX_API_URL,
    MAPBOX_DIRECTIONS_API_URL: MAPBOX_DIRECTIONS_API_URL,
    SHYFT_CAR_ROUTE_API_URL: SHYFT_CAR_ROUTE_API_URL,
    SHYFT_CAPS_URL: SHYFT_CAPS_URL,
    SHYFT_WCS_ROUTE: SHYFT_WCS_ROUTE,
    getProductUrl: getProductUrl,
    getOutputUrl: getOutputUrl,
    getIndexAsync: getIndexAsync,
    getProductDataAsync: getProductDataAsync,
    getOutputStatusAsync: getOutputStatusAsync,
    getOutputRunStatusAsync: getOutputRunStatusAsync,
    directionsAsync: directionsAsync,
    carRouteAsync: carRouteAsync
};

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    boxShadow: theme.shadows[3],
    maxWidth: '100%'
  },
  defaultButton: {
    backgroundColor: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    }
  },
  selectedButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 800,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText
    }
  }
}));
const GroupedButtons = ({
  options: _options = ['1', '2', '3'],
  action
}) => {
  const classes = useStyles();
  const [selected, setSelected] = useState(_options[0]);

  const handleClick = option => {
    setSelected(option);
    action(option);
  };

  return /*#__PURE__*/React.createElement(ButtonGroup, {
    className: classes.root
  }, _options.map(option => /*#__PURE__*/React.createElement(Button, {
    key: option,
    name: "group-button",
    onClick: () => handleClick(option),
    className: selected === option ? classes.selectedButton : classes.defaultButton
  }, option)));
};

const useStyles$1 = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%'
  }
}));
const ModelSelector = ({
  options,
  label: _label = 'Model'
}) => {
  const classes = useStyles$1();

  var handleClick = function handleClick(index) {
    console.log(index);
  };

  return (
    /*#__PURE__*/
    React.createElement(Grid, {
      container: true,
      "data-cy": "model-selector",
      direction: "column",
      className: classes.root
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true
    }, /*#__PURE__*/React.createElement(Typography, {
      variant: "h6"
    }, _label), /*#__PURE__*/React.createElement(GroupedButtons, {
      "data-cy": "model-selector-buttons",
      options: options,
      action: handleClick
    })))
  );
};

const useStyles$2 = makeStyles(theme => ({
  root: {
    maxWidth: 400
  },
  categoryStyle: {
    fontWeight: 800,
    fontSize: 16,
    letterSpacing: 1,
    paddingLeft: 8,
    color: theme.palette.secondary.main
  },
  nested: {
    paddingLeft: theme.spacing(4),
    color: theme.palette.secondary.contrastText
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
const emptyMenu = [{
  name: 'Menu',
  open: true,
  products: [{
    name: 'A'
  }, {
    name: 'B'
  }]
}];
const ProductMenu = ({
  options: _options = emptyMenu,
  action,
  sortFn
}) => {
  const classes = useStyles$2();
  const [selectedProduct, setSelectedProduct] = React.useState(`${_options[0].name} ${_options[0].products[0].name}`);
  const [categories, setCategories] = React.useState(_options || []);

  const handleClick = cat => {
    const newCategories = categories.map(item => {
      if (item !== cat) {
        return item;
      }

      return { ...item,
        open: !cat.open
      };
    });
    setCategories(newCategories);
  };

  const handleListItemClick = (event, product) => {
    setSelectedProduct(product.level + ' ' + product.product);
    action(product);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, categories.sort(sortFn).map((cat, index) => /*#__PURE__*/React.createElement(List, {
    key: index
  }, /*#__PURE__*/React.createElement(ListItem, {
    "data-cy": cat.name,
    button: true,
    onClick: () => handleClick(cat)
  }, /*#__PURE__*/React.createElement(ListItemText, {
    primary: /*#__PURE__*/React.createElement(Typography, {
      className: classes.categoryStyle
    }, cat.name)
  }), cat.open ? /*#__PURE__*/React.createElement(ExpandLess, null) : /*#__PURE__*/React.createElement(ExpandMore, null)), /*#__PURE__*/React.createElement(Collapse, {
    in: cat.open,
    timeout: "auto",
    unmountOnExit: true
  }, cat.products.map((product, index) => /*#__PURE__*/React.createElement(ListItem, {
    "data-cy": cat.name + '-' + product.name,
    key: index,
    button: true,
    className: classes.nested,
    selected: selectedProduct === cat.name + ' ' + product.name,
    onClick: event => handleListItemClick(event, {
      level: cat.name,
      product: product.name
    })
  }, ICON_MAP[product.name] !== undefined && /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    className: selectedProduct === cat.name + ' ' + product.name ? classes.selected : classes.icon,
    icon: ICON_MAP[product.name]
  })), /*#__PURE__*/React.createElement(ListItemText, {
    primary: /*#__PURE__*/React.createElement(Typography, {
      className: selectedProduct === cat.name + ' ' + product.name ? classes.selected : classes.text
    }, product.name)
  })))))));
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

const useStyles$3 = makeStyles$1(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: 10,
    alignItems: 'center'
  }
}));
const tabsStyles = makeStyles$1(theme => ({
  root: {
    backgroundColor: theme.palette.type === 'light' ? '#eee' : theme.palette.divider,
    borderRadius: 10,
    maxWidth: '75%',
    alignItems: 'center'
  },
  flexContainer: {
    display: 'inline-flex',
    position: 'relative',
    zIndex: 1
  },
  scroller: {
    [theme.breakpoints.up('md')]: {
      padding: '0 8px'
    }
  },
  indicator: {
    top: 3,
    bottom: 3,
    right: 3,
    height: 'auto',
    background: 'none'
  }
}));
const tabStyles = makeStyles$1(theme => ({
  root: {
    minHeight: 50,
    minWidth: 100,
    [theme.breakpoints.up('md')]: {
      minWidth: 120
    }
  },
  wrapper: {
    color: theme.palette.text.primary,
    textTransform: 'initial'
  },
  selected: {
    top: 4,
    bottom: 4,
    borderRadius: 8,
    backgroundColor: theme.palette.type === 'light' ? '#fff' : theme.palette.action.selected,
    boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)'
  }
}));
const VerticalTabs = ({
  options,
  label: _label = 'Model',
  action
}) => {
  const classes = useStyles$3();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    action(options[newValue]);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement(Tabs, {
    orientation: "vertical",
    variant: "scrollable",
    value: value,
    onChange: handleChange,
    "aria-label": "Vertical tabs",
    classes: tabsStyles()
  }, options.map((option, index) => /*#__PURE__*/React.createElement(Tab, Object.assign({
    label: option,
    classes: tabStyles(),
    key: index,
    disableRipple: true
  }, a11yProps(index))))));
};

const drawerWidth = 300;
const xlDrawerWidth = 350;
const useStyles$4 = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.only('xl')]: {
      width: xlDrawerWidth,
      flexShrink: 0
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    [theme.breakpoints.only('xl')]: {
      width: xlDrawerWidth
    },
    [theme.breakpoints.down('lg')]: {
      width: drawerWidth
    }
  }
}));
const SideMenu = ({
  categories,
  label: _label = 'Products',
  action,
  window,
  options
}) => {
  const classes = useStyles$4();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [shouldSort, setShouldSort] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getSortFn = () => {
    if (shouldSort) {
      return function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }

        return 0;
      };
    } else {
      return function (a, b) {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (nameA < nameB) {
          return 1;
        }

        if (nameA > nameB) {
          return -1;
        }

        return 0;
      };
    }
  };

  const menu = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: classes.toolbar
  }), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Toolbar, {
    style: {
      paddingLeft: '6px',
      paddingRight: '6px'
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h6",
    style: {
      paddingLeft: '6px',
      flex: 1
    }
  }, "Model")), /*#__PURE__*/React.createElement(VerticalTabs, {
    options: options,
    action: option => console.log(option)
  }), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Toolbar, {
    style: {
      paddingLeft: '6px',
      paddingRight: '6px'
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h6",
    style: {
      paddingLeft: '6px',
      flex: 1
    }
  }, _label), /*#__PURE__*/React.createElement("div", {
    style: shouldSort ? {
      color: '#329af0'
    } : {
      color: '#aeaeae'
    }
  }, /*#__PURE__*/React.createElement(SortByAlphaIcon, {
    onClick: () => setShouldSort(!shouldSort),
    style: {
      fontSize: '16pt'
    }
  }))), /*#__PURE__*/React.createElement(ProductMenu, {
    options: categories,
    action: action,
    sortFn: getSortFn()
  }));
  const container = window !== undefined ? () => window().document.body : undefined;
  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement(CssBaseline, null), /*#__PURE__*/React.createElement(AppBar, {
    position: "fixed",
    className: classes.appBar
  }, /*#__PURE__*/React.createElement(Toolbar, null, /*#__PURE__*/React.createElement(IconButton, {
    color: "inherit",
    "aria-label": "open drawer",
    edge: "start",
    onClick: handleDrawerToggle,
    className: classes.menuButton
  }, /*#__PURE__*/React.createElement(MenuIcon, null)))), /*#__PURE__*/React.createElement("nav", {
    className: classes.drawer
  }, /*#__PURE__*/React.createElement(Hidden, {
    smUp: true,
    implementation: "css"
  }, /*#__PURE__*/React.createElement(Drawer, {
    container: container,
    variant: "temporary",
    anchor: "left",
    open: mobileOpen,
    onClose: handleDrawerToggle,
    classes: {
      paper: classes.drawerPaper
    },
    ModalProps: {
      keepMounted: true
    }
  }, menu)), /*#__PURE__*/React.createElement(Hidden, {
    xsDown: true,
    implementation: "css"
  }, /*#__PURE__*/React.createElement(Drawer, {
    classes: {
      paper: classes.drawerPaper
    },
    variant: "permanent",
    open: true
  }, menu))));
};

const useStyles$5 = makeStyles$1(theme => ({
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  label: {
    align: 'center'
  },
  dropdown: {
    backgroundColor: 'white',
    fontSize: '.8em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '.7em'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '.7em'
    },
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderWidth: 2,
    borderRadius: 8,
    boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',
    '&:focus': {
      background: 'white',
      borderColor: theme.palette.primary
    }
  },
  items: {
    background: 'white'
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    background: 'white',
    '& li.Mui-selected': {
      fontWeight: 700
    }
  },
  disabled: {
    color: '#212529'
  }
}));
const SimpleSelect = ({
  choices,
  action
}) => {
  const classes = useStyles$5();
  const [selectedValue, setSelectedValue] = React.useState(choices[0]);

  const handleChange = event => {
    setSelectedValue(event.target.value);
    action(event.target.value);
  };

  let oneChoice = false;

  if (choices.length === 1) {
    oneChoice = true;
  }

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormControl, {
    variant: "outlined"
  }, oneChoice ? /*#__PURE__*/React.createElement(Select, {
    classes: {
      select: classes.dropdown,
      disabled: classes.disabled
    },
    id: "simple-select",
    value: selectedValue,
    onChange: handleChange,
    disabled: true,
    IconComponent: () => /*#__PURE__*/React.createElement(Fragment, null)
  }, choices.map(option => /*#__PURE__*/React.createElement(MenuItem, {
    color: "primary",
    key: option,
    className: classes.items,
    value: option
  }, option))) : /*#__PURE__*/React.createElement(Select, {
    classes: {
      select: classes.dropdown,
      disabled: classes.disabled
    },
    id: "simple-select",
    value: selectedValue,
    onChange: handleChange,
    MenuProps: {
      classes: {
        list: classes.list
      }
    }
  }, choices.map(option => /*#__PURE__*/React.createElement(MenuItem, {
    color: "primary",
    key: option,
    className: classes.items,
    value: option
  }, option)))));
};

const useStyles$6 = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%'
  }
}));
const RegionSelector = ({
  options,
  label: _label = 'Region'
}) => {
  const classes = useStyles$6();

  var handleClick = function handleClick(index) {
    console.log(index);
  };

  return (
    /*#__PURE__*/
    React.createElement(Grid, {
      container: true,
      item: true,
      className: classes.root
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true
    }, /*#__PURE__*/React.createElement(Typography, {
      variant: "h6"
    }, _label), /*#__PURE__*/React.createElement(SimpleSelect, {
      choices: options,
      action: handleClick
    })))
  );
};

var AppStatus;

(function (AppStatus) {
  AppStatus[AppStatus["Unknown"] = 0] = "Unknown";
  AppStatus[AppStatus["Okay"] = 1] = "Okay";
  AppStatus[AppStatus["NoBaseUrl"] = 2] = "NoBaseUrl";
  AppStatus[AppStatus["NoData"] = 3] = "NoData";
  AppStatus[AppStatus["Error"] = 4] = "Error";
})(AppStatus || (AppStatus = {}));

async function validateAppAsync(baseUrl, customerId, datasetId) {
  if (!baseUrl) {
    return AppStatus.NoBaseUrl;
  }

  if (!customerId || !datasetId) {
    return AppStatus.Unknown;
  }

  const outputStatus = await getOutputStatusAsync(baseUrl, customerId, datasetId).catch(() => undefined);

  if (!(outputStatus && outputStatus.runs)) {
    return AppStatus.Unknown;
  }

  if (outputStatus.runs.length === 0) {
    return AppStatus.NoData;
  }

  const outputRunStatus = await getOutputRunStatusAsync(baseUrl, customerId, datasetId, outputStatus.runs[0]);

  if (!(outputRunStatus && outputRunStatus.total_available > 0)) {
    return AppStatus.NoData;
  }

  return AppStatus.Okay;
}

const useStyles$7 = makeStyles(theme => createStyles({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  gradient: {
    background: 'linear-gradient(-139deg, #F0329A 0%, #FF922B 100%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 60,
    padding: '0 30px',
    boxShadow: theme.shadows[3],
    fontWeight: 800,
    fontSize: '1.25em'
  },
  disabled: {
    borderRadius: 3,
    height: 60,
    padding: '0 30px',
    fontWeight: 800,
    fontSize: '1.25em'
  }
}));
const BasicButton = ({
  action,
  text: _text = 'Next',
  type: _type = 'blue'
}) => {
  const classes = useStyles$7();
  const buttonStyles = {
    blue: /*#__PURE__*/React.createElement(Button, {
      variant: "contained",
      color: "primary",
      size: "large",
      onClick: action
    }, _text),
    disabled: /*#__PURE__*/React.createElement(Button, {
      variant: "contained",
      color: "primary",
      size: "large",
      disabled: true
    }, _text),
    gradient: /*#__PURE__*/React.createElement(Button, {
      className: classes.gradient,
      size: "large",
      onClick: action
    }, _text),
    disabledGradient: /*#__PURE__*/React.createElement(Button, {
      className: classes.disabled,
      variant: "contained",
      size: "large",
      disabled: true
    }, _text)
  };
  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, buttonStyles[_type]);
};

const useStyles$8 = makeStyles$2(theme => createStyles$1({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '35ch'
    }
  },
  textField: {
    '& label.Mui-focused': {
      color: theme.palette.secondary.main,
      fontWeight: 700
    }
  }
}));
const BasicTextField = ({
  action,
  label,
  state,
  helperText,
  defaultValue
}) => {
  const classes = useStyles$8();

  const handleChange = event => {
    action(event.target.value);
  };

  const textFieldStates = {
    initial: /*#__PURE__*/React.createElement("form", {
      className: classes.root,
      noValidate: true,
      autoComplete: "off"
    }, /*#__PURE__*/React.createElement(TextField, {
      className: classes.textField,
      id: "outlined-basic",
      label: label,
      variant: "outlined",
      color: "secondary",
      onChange: handleChange,
      helperText: helperText,
      defaultValue: defaultValue
    })),
    error: /*#__PURE__*/React.createElement("form", {
      className: classes.root,
      noValidate: true,
      autoComplete: "off"
    }, /*#__PURE__*/React.createElement(TextField, {
      error: true,
      id: "outlined-error",
      label: label,
      variant: "outlined",
      onChange: handleChange,
      helperText: helperText,
      defaultValue: defaultValue
    }))
  };
  return textFieldStates[state];
};

const useStyles$9 = makeStyles(theme => ({
  paper: {
    [theme.breakpoints.down('sm')]: {
      minHeight: '40vh',
      minWidth: '60vw'
    },
    [theme.breakpoints.up('md')]: {
      minHeight: '40vh',
      minWidth: '40vw'
    }
  },
  textPaper: {
    paddingTop: 20
  },
  text: {
    color: theme.palette.secondary.contrastText
  },
  subtitle: {
    color: theme.palette.secondary.dark
  }
}));
const LandingPage = ({
  url,
  customerId: _customerId = '',
  datasetId: _datasetId = '',
  appStatus: _appStatus = AppStatus.Okay,
  onStatusChange
}) => {
  const classes = useStyles$9();
  const [state, setState] = React.useState('initial');
  const [customerInput, setCustomerInput] = React.useState(_customerId);
  const [datasetInput, setDatasetInput] = React.useState(_datasetId);
  const [errorMessage, setErrorMessage] = React.useState('');
  React.useEffect(() => {
    setStateFromStatus(_appStatus);
  }, []);

  const onClick = () => {
    if (customerInput === '' && datasetInput === '') {
      setState('error');
      setErrorMessage('Enter a Customer and Dataset ID.');
    } else if (customerInput === '') {
      setState('error');
      setErrorMessage('Enter a Customer ID.');
    } else if (datasetInput === '') {
      setState('error');
      setErrorMessage('Enter a Dataset ID.');
    } else {
      validateComponentAsync();
    }
  };

  const updateCustomerValue = input => {
    setCustomerInput(input);
  };

  const updateDatasetValue = input => {
    setDatasetInput(input);
  };

  const validateComponentAsync = async () => {
    const status = await validateAppAsync(url, customerInput, datasetInput);

    if (status === AppStatus.Okay) {
      onStatusChange && onStatusChange(AppStatus.Okay);
    } else {
      setStateFromStatus(status);
    }
  };

  const setStateFromStatus = status => {
    if (status === AppStatus.Unknown) {
      setState('error');
      setErrorMessage('Customer or Dataset ID does not exist.');
    } else if (status === AppStatus.NoData) {
      setState('error');
      setErrorMessage('Data is still being processed. Please try again in a few moments.');
    } else if (status === AppStatus.NoBaseUrl) {
      setState('error');
      setErrorMessage('Missing baseUrl. Please check your configuration.');
    }
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 0,
    direction: "column",
    alignItems: "center",
    justify: "center",
    style: {
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    item: true,
    direction: "column",
    alignItems: "center",
    justify: "center"
  }, /*#__PURE__*/React.createElement(Paper, {
    className: classes.paper
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    item: true,
    direction: "column",
    justify: "space-evenly",
    spacing: 2,
    style: {
      minHeight: '40vh',
      minWidth: '40vw'
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    item: true,
    justify: "center"
  }, /*#__PURE__*/React.createElement(Paper, {
    className: classes.textPaper,
    elevation: 0
  }, /*#__PURE__*/React.createElement(Typography, {
    align: "center",
    variant: "h5",
    gutterBottom: true
  }, "Welcome"), /*#__PURE__*/React.createElement(Typography, {
    variant: "body1",
    color: "textSecondary",
    align: "center"
  }, "Please enter your information below ", /*#__PURE__*/React.createElement("br", null), " to access the viewer:"))), /*#__PURE__*/React.createElement(Grid, {
    container: true,
    item: true,
    alignItems: "center",
    direction: "column"
  }, /*#__PURE__*/React.createElement(BasicTextField, {
    label: "Customer ID",
    action: updateCustomerValue,
    state: state,
    defaultValue: _customerId
  }), /*#__PURE__*/React.createElement(BasicTextField, {
    label: "Dataset ID",
    action: updateDatasetValue,
    state: state,
    helperText: errorMessage,
    defaultValue: _datasetId
  })), /*#__PURE__*/React.createElement(Grid, {
    container: true,
    item: true,
    justify: "center"
  }, /*#__PURE__*/React.createElement(BasicButton, {
    action: onClick
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }))))));
};

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#72c3fc',
      main: '#329af0',
      dark: '#1c7cd6',
      contrastText: '#f8f9fa'
    },
    secondary: {
      light: '#ffffff',
      main: '#F76707',
      dark: '#868e96',
      contrastText: '#212529'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 950,
      lg: 1130,
      xl: 1460
    }
  },
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: '1rem',
        fontWeight: 400
      },
      h5: {
        fontWeight: 500
      },
      body2: {
        fontWeight: 500,
        fontSize: 16
      },
      button: {
        color: '#FFFFFF',
        fontWeight: 800
      }
    },
    MuiListItem: {
      root: {
        '&$selected, &$selected:hover': {
          backgroundColor: '#329af0',
          color: '#f8f9fa'
        },
        paddingTop: '6px',
        paddingBottom: '6px'
      },
      gutters: {
        paddingLeft: '6px',
        paddingRight: '6px'
      }
    },
    MuiListItemIcon: {
      root: {
        color: '#329af0',
        minWidth: 30
      }
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#F76707',
        color: '#f8f9fa',
        fontSize: 16,
        fontWeight: 800
      },
      tooltipPlacementBottom: {
        marginTop: 15
      }
    },
    MuiSwitch: {
      colorPrimary: {
        color: '#37B24D',
        '& + $track': {
          backgroundColor: '#37B24D'
        },
        '&$checked': {
          color: '#F50000',
          '&:hover': {
            backgroundColor: fade('#F50000', 0.04)
          }
        },
        '&$checked + $track': {
          backgroundColor: '#F50000'
        }
      }
    }
  },
  spacing: 10
});
const options = {
  disableAlign: true,
  factor: 5
};
theme = responsiveFontSizes(theme, options);
var theme$1 = theme;

const useStyles$a = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%'
  }
}));
const RunsSelector = ({
  options,
  label: _label = 'Run',
  action
}) => {
  const classes = useStyles$a();
  const newOptions = options.map(option => moment.unix(option).utc().format('YYYY-MM-DD[T] hh:mm[Z]'));
  return (
    /*#__PURE__*/
    React.createElement(Grid, {
      container: true,
      item: true,
      className: classes.root
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true
    }, /*#__PURE__*/React.createElement(Typography, {
      variant: "h6"
    }, _label), /*#__PURE__*/React.createElement(SimpleSelect, {
      choices: newOptions,
      action: action
    })))
  );
};

const useStyles$b = makeStyles$1(theme => ({
  root: {
    color: theme.palette.primary.main,
    height: 20,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 20
    }
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: theme.palette.secondary.light,
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  rail: {
    height: 5,
    borderRadius: 4
  },
  markLabelActive: {
    fontWeight: 700,
    padding: 12
  },
  markLabel: {
    fontWeight: 500,
    padding: 12,
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  mark: {
    backgroundColor: theme.palette.primary.dark,
    height: 5
  }
}));

function ValueLabelComponent(props) {
  const {
    children,
    open,
    value
  } = props;
  const validTime = moment.unix(value).utc().format('MM/DD HH:mm[Z]');
  return /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(CssBaseline, null), /*#__PURE__*/React.createElement(Hidden, {
    smDown: true
  }, /*#__PURE__*/React.createElement(Tooltip, {
    open: open,
    enterTouchDelay: 0,
    title: validTime,
    placement: "top"
  }, children)), /*#__PURE__*/React.createElement(Hidden, {
    mdUp: true
  }, /*#__PURE__*/React.createElement(Tooltip, {
    open: open,
    enterTouchDelay: 0,
    title: validTime,
    placement: "bottom"
  }, children)));
}

const DiscreteSlider = ({
  options,
  action,
  selected
}) => {
  const classes = useStyles$b();
  const optionsCount = React.useRef(options.length);
  const stepValue = options[1].value - options[0].value;
  const maxValue = options[options.length - 1].value;
  const minValue = options[0].value;

  var handleChangeCommitted = function handleChangeCommitted(_, value) {
    action(value);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement(CssBaseline, null), /*#__PURE__*/React.createElement(Hidden, {
    xsDown: true
  }, optionsCount.current >= 16 ? options.forEach((option, index) => {
    if (!(index === 0 || index === optionsCount.current - 1 || index % 4 === 0 && index <= optionsCount.current - 4)) {
      option.label = '';
    }
  }) : undefined, /*#__PURE__*/React.createElement(Slider, {
    classes: classes,
    valueLabelDisplay: "auto",
    "aria-label": "pretty slider",
    track: false,
    step: stepValue,
    marks: options,
    max: maxValue,
    ValueLabelComponent: ValueLabelComponent,
    onChange: handleChangeCommitted,
    value: selected,
    min: minValue
  })), /*#__PURE__*/React.createElement(Hidden, {
    smUp: true
  }, /*#__PURE__*/React.createElement(Slider, {
    classes: classes,
    "aria-label": "pretty slider",
    track: false,
    step: stepValue,
    marks: options,
    max: maxValue,
    onChange: handleChangeCommitted,
    value: selected,
    min: minValue
  })));
};

const useStyles$c = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.dark,
    boxShadow: theme.shadows[3],
    ariaLabel: 'back',
    maxWidth: '100%',
    minWidth: '100%',
    maxHeight: 30,
    minHeight: 15
  }
}));
const BackButton = ({
  action
}) => {
  const classes = useStyles$c();
  return /*#__PURE__*/React.createElement(Button$1, {
    onClick: action,
    className: classes.root,
    variant: "outlined",
    color: "primary"
  }, /*#__PURE__*/React.createElement(NavigateBeforeIcon, null));
};

const useStyles$d = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.dark,
    boxShadow: theme.shadows[3],
    ariaLabel: 'back',
    maxWidth: '100%',
    minWidth: '100%',
    maxHeight: 30,
    minHeight: 15
  }
}));
const ForwardButton = ({
  action
}) => {
  const classes = useStyles$d();
  return /*#__PURE__*/React.createElement(Button, {
    onClick: action,
    className: classes.root,
    variant: "outlined",
    color: "primary"
  }, /*#__PURE__*/React.createElement(NavigateNextIcon, null));
};

const useTimer = interval => {
  const [ticks, setTicks] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  React.useEffect(() => {
    if (isRunning) {
      const timerId = window.setTimeout(() => {
        setTicks(ticks + 1);
      }, interval);
      return () => window.clearTimeout(timerId);
    }
  }, [ticks, isRunning]);
  return [ticks, isRunning, setIsRunning];
};

const useStyles$e = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  play: {
    ariaLabel: 'play',
    boxShadow: theme.shadows[3],
    background: theme.palette.primary.dark,
    '&:hover': {
      background: theme.palette.primary.dark
    },
    resize: 'inherit'
  },
  pause: {
    ariaLabel: 'pause',
    boxShadow: theme.shadows[3],
    background: theme.palette.primary.dark,
    '&:hover': {
      background: theme.palette.primary.dark
    },
    resize: 'inherit'
  },
  icon: {
    color: theme.palette.primary.contrastText
  }
}));
const StartStopButton = ({
  onToggle
}) => {
  const classes = useStyles$e();
  const [tick, isRunning, setIsRunning] = useTimer(600);

  const handleClick = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };

  React.useEffect(() => {
    onToggle(isRunning);
  }, [tick]);
  return isRunning ? /*#__PURE__*/React.createElement(Fab, {
    onClick: handleClick,
    className: classes.pause
  }, /*#__PURE__*/React.createElement(PauseIcon, {
    className: classes.icon
  })) : /*#__PURE__*/React.createElement(Fab, {
    onClick: handleClick,
    className: classes.play
  }, /*#__PURE__*/React.createElement(PlayArrowIcon, {
    className: classes.icon
  }));
};

const useStyles$f = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  offset: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}));
const TimeControl = ({
  onBack,
  onNext,
  onToggle
}) => {
  const classes = useStyles$f();
  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    item: true,
    direction: "row",
    alignItems: "center",
    justify: "center",
    wrap: "nowrap",
    spacing: 1
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true,
    className: classes.offset
  }), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 3
  }, /*#__PURE__*/React.createElement(BackButton, {
    "data-cy": "back-button",
    action: onBack
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    container: true,
    xs: true,
    justify: "center"
  }, /*#__PURE__*/React.createElement(StartStopButton, {
    "data-cy": "play-button",
    onToggle: onToggle
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 3
  }, /*#__PURE__*/React.createElement(ForwardButton, {
    "data-cy": "forward-button",
    action: onNext
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true
  })));
};

const useStyles$g = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    paddingTop: 5,
    paddingBottom: 5
  },
  paper: {
    backgroundColor: theme.palette.secondary.main,
    padding: 5
  },
  mobilePaper: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    border: '1px solid currentColor',
    padding: 5
  },
  text: {
    color: theme.palette.secondary.main
  }
}));
const ValidTime = ({
  time
}) => {
  const classes = useStyles$g();
  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement(CssBaseline, null), /*#__PURE__*/React.createElement(Hidden, {
    smDown: true
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row",
    justify: "flex-end",
    alignItems: "center"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h6"
  }, "Valid Time"), /*#__PURE__*/React.createElement(Paper, {
    className: classes.paper
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "button"
  }, time))))), /*#__PURE__*/React.createElement(Hidden, {
    mdUp: true
  }, /*#__PURE__*/React.createElement(Paper, {
    className: classes.mobilePaper
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    item: true,
    xs: 12,
    justify: "center"
  }, /*#__PURE__*/React.createElement(Typography, {
    className: classes.text,
    variant: "h6"
  }, time)))));
};

const useStyles$h = makeStyles(theme => ({
  media: {
    [theme.breakpoints.up('md')]: {
      height: '40vw'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}));
const ImageViewer = ({
  image
}) => {
  const classes = useStyles$h();
  return /*#__PURE__*/React.createElement("img", {
    className: classes.media,
    src: image,
    alt: "weather viewer"
  });
};

const ShyftContext = React.createContext({});
const drawerWidth$1 = 300;
const xlDrawerWidth$1 = 350;
const useStyles$i = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  contentClass: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth$1
  },
  '@media (max-width: 767px)': {
    contentClass: {
      marginLeft: 0
    }
  },
  '@media (min-width: 1459px)': {
    contentClass: {
      marginLeft: xlDrawerWidth$1
    }
  }
}));
const ShyftWxDynamic = ({
  dynamicFeatures,
  index,
  forecast,
  level,
  product,
  region,
  run,
  onForecastSelect,
  onLevelSelect,
  onProductSelect,
  onRegionSelect,
  onRunSelect
}) => {
  const classes = useStyles$i();

  const getSelectedLevel = () => {
    return index.datasets[0].run.levels.filter(lvl => lvl.name === level)[0];
  };

  const getSelectedProduct = () => {
    return getSelectedLevel().products.filter(p => p.name === product)[0];
  };

  const handleProductSelect = product => {
    onLevelSelect(product.level);
    onProductSelect(product.product);
    onForecastSelect(getSelectedProduct().forecasts[0].hour);
  };

  const handleRunSelect = buttonText => {
    console.log(buttonText);
  };

  const compare = (a, b) => {
    const valA = Number(a.hour);
    const valB = Number(b.hour);
    let comparison = 0;

    if (valA > valB) {
      comparison = 1;
    } else if (valA < valB) {
      comparison = -1;
    }

    return comparison;
  };

  const onSliderNavigationNext = () => {
    const forecasts = getSelectedProduct().forecasts;
    forecasts.sort(compare);
    const forecastIndex = forecasts.findIndex(f => f.hour === forecast);

    if (forecastIndex + 1 === forecasts.length) {
      onForecastSelect(forecasts[0].hour);
    } else {
      onForecastSelect(forecasts[forecastIndex + 1].hour);
    }
  };

  const onSliderNavigationBack = () => {
    const forecasts = getSelectedProduct().forecasts;
    forecasts.sort(compare);
    const forecastIndex = forecasts.findIndex(f => f.hour === forecast);

    if (forecastIndex - 1 < 0) {
      onForecastSelect(forecasts[forecasts.length - 1].hour);
    } else {
      onForecastSelect(forecasts[forecastIndex - 1].hour);
    }
  };

  const onSliderNavigation = value => {
    value -= +index.datasets[0].run.name;
    const forecasts = getSelectedProduct().forecasts;
    forecasts.sort(compare);
    const forecastIndex = forecasts.findIndex(f => +f.hour === +value);
    onForecastSelect(forecasts[forecastIndex].hour);
  };

  const onToggleToPlay = isRunning => {
    const forecasts = getSelectedProduct().forecasts;
    forecasts.sort(compare);

    if (!isRunning) {
      onForecastSelect(forecasts[0].hour);
    } else {
      const forecastIndex = forecasts.findIndex(f => f.hour === forecast);

      if (forecast === forecasts[forecasts.length - 1].hour) {
        onForecastSelect(forecasts[0].hour);
      } else {
        onForecastSelect(forecasts[forecastIndex + 1].hour);
      }
    }
  };

  const getValidTime = () => {
    const validTime = moment.unix(+index.datasets[0].run.name + +forecast).utc().format('MM/DD HH:mm[Z]');
    return validTime;
  };

  const generateContent = () => {
    const selectedProduct = getSelectedProduct();
    const levelProductVals = index.datasets[0].run.levels.map((lvl, index) => {
      return {
        name: lvl.name,
        open: index === 0,
        products: lvl.products
      };
    });
    const sliderVals = selectedProduct.forecasts.map(f => {
      return {
        value: +f.hour + +index.datasets[0].run.name,
        label: moment.unix(+f.hour + +index.datasets[0].run.name).utc().format('MM/DD HH:mm[Z]')
      };
    });
    const activeForecastLayer = selectedProduct.forecasts.filter(f => f.hour === forecast)[0].image;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Grid, {
      container: true
    }, /*#__PURE__*/React.createElement(SideMenu, {
      "data-cy": "product-selector",
      categories: levelProductVals,
      action: handleProductSelect,
      options: [index.datasets[0].dataset]
    })), /*#__PURE__*/React.createElement("main", {
      className: classes.contentClass
    }, /*#__PURE__*/React.createElement(Hidden, {
      smUp: true
    }, /*#__PURE__*/React.createElement("div", {
      className: classes.toolbar
    })), /*#__PURE__*/React.createElement(Grid, {
      container: true,
      justify: "space-between",
      spacing: 1
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: true,
      md: true
    }, /*#__PURE__*/React.createElement(RegionSelector, {
      "data-cy": "region-selector",
      options: [index.datasets[0].region.name],
      action: () => {}
    })), /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: true,
      sm: true,
      md: true
    }, /*#__PURE__*/React.createElement(RunsSelector, {
      "data-cy": "runs-selector",
      options: [+index.datasets[0].run.name],
      action: handleRunSelect
    })), /*#__PURE__*/React.createElement(Hidden, {
      xsDown: true
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: 12,
      md: true
    }, /*#__PURE__*/React.createElement(ValidTime, {
      time: getValidTime()
    })))), /*#__PURE__*/React.createElement(Grid, {
      container: true,
      direction: "column",
      spacing: 1
    }, /*#__PURE__*/React.createElement(Grid, {
      container: true,
      justify: "center",
      item: true,
      xs: 12
    }, /*#__PURE__*/React.createElement(ImageViewer, {
      image: activeForecastLayer
    })), /*#__PURE__*/React.createElement(Grid, {
      container: true,
      item: true,
      justify: "center",
      alignItems: "center"
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true,
      md: 3,
      sm: 5,
      xs: 5
    }, /*#__PURE__*/React.createElement(TimeControl, {
      "data-cy": "time-control",
      onBack: onSliderNavigationBack,
      onNext: onSliderNavigationNext,
      onToggle: onToggleToPlay
    })), /*#__PURE__*/React.createElement(Grid, {
      item: true,
      md: 9,
      sm: 11,
      xs: 12
    }, /*#__PURE__*/React.createElement(DiscreteSlider, {
      "data-cy": "slider",
      options: sliderVals,
      selected: +forecast + +index.datasets[0].run.name,
      action: onSliderNavigation
    }))), /*#__PURE__*/React.createElement(Hidden, {
      smUp: true
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: 12
    }, /*#__PURE__*/React.createElement(ValidTime, {
      time: getValidTime()
    }))))));
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, generateContent());
};

const useStyles$j = makeStyles$1(theme => ({
  root: {
    color: theme.palette.primary.main,
    height: 300
  },
  thumb: {
    height: 18,
    width: 18,
    backgroundColor: theme.palette.secondary.light,
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit'
    }
  },
  rail: {
    height: 5,
    borderRadius: 4
  },
  markLabelActive: {
    fontWeight: 700,
    padding: 10
  },
  markLabel: {
    fontWeight: 500,
    padding: 10
  },
  mark: {
    backgroundColor: theme.palette.primary.dark,
    height: 5
  },
  vertical: {
    '& $rail': {
      width: 5
    },
    '& $track': {
      width: 5
    },
    '& $mark': {
      width: 5,
      height: 1
    },
    '& $thumb': {
      marginLeft: -6,
      marginBottom: -8
    }
  }
}));
const DiscreteSlider$1 = ({
  options,
  action,
  selected
}) => {
  const classes = useStyles$j();
  const stepValue = options[1].value - options[0].value;
  const maxValue = options[options.length - 1].value;
  const minValue = options[0].value;

  const handleChangeCommitted = (e, value) => {
    action(value);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement(CssBaseline, null), /*#__PURE__*/React.createElement(Slider, {
    classes: classes,
    "aria-label": "pretty slider",
    track: false,
    step: stepValue,
    marks: options,
    max: maxValue,
    onChange: handleChangeCommitted,
    value: selected,
    min: minValue,
    orientation: "vertical"
  }));
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global_1 =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var descriptors = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var document$1 = global_1.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !descriptors && !fails(function () {
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var objectDefineProperty = {
	f: f
};

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var createNonEnumerableProperty = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  } return value;
};

var SHARED = '__core-js_shared__';
var store = global_1[SHARED] || setGlobal(SHARED, {});

var sharedStore = store;

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource = sharedStore.inspectSource;

var WeakMap$1 = global_1.WeakMap;

var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource(WeakMap$1));

var shared = createCommonjsModule(function (module) {
(module.exports = function (key, value) {
  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode:  'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys = {};

var WeakMap$2 = global_1.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (nativeWeakMap) {
  var store$1 = new WeakMap$2();
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;
  set = function (it, metadata) {
    wmset.call(store$1, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store$1, it) || {};
  };
  has$1 = function (it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };
  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};

var redefine = createCommonjsModule(function (module) {
var getInternalState = internalState.get;
var enforceInternalState = internalState.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global_1) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});
});

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime;

// `Date.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tostring
if (new Date(NaN) + '' != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

var objectPropertyIsEnumerable = {
	f: f$1
};

var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings



var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
var f$2 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};

var objectGetOwnPropertyDescriptor = {
	f: f$2
};

var path = global_1;

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var indexOf = arrayIncludes.indexOf;


var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};

var objectGetOwnPropertyNames = {
	f: f$3
};

var f$4 = Object.getOwnPropertySymbols;

var objectGetOwnPropertySymbols = {
	f: f$4
};

// all object keys, includes non-enumerable and symbols
var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var copyConstructorProperties = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

var isForced_1 = isForced;

var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global_1;
  } else if (STATIC) {
    target = global_1[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global_1[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};

var nativeAssign = Object.assign;
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
var objectAssign = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
  while (argumentsLength > index) {
    var S = indexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
_export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
  assign: objectAssign
});

var aFunction$1 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

// optional / simple context binding
var functionBindContext = function (fn, that, length) {
  aFunction$1(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
var isArray = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

var useSymbolAsUid = nativeSymbol
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';

var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global_1.Symbol;
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod$1 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$1(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod$1(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod$1(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod$1(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod$1(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod$1(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$1(6)
};

var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

var defineProperty$1 = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

var arrayMethodUsesToLength = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !descriptors) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty$1(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};

var $forEach = arrayIteration.forEach;



var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
var arrayForEach = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
  forEach: arrayForEach
});

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof = toStringTagSupport ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
var objectToString = toStringTagSupport ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!toStringTagSupport) {
  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
}

var propertyIsEnumerable = objectPropertyIsEnumerable.f;

// `Object.{ entries, values }` methods implementation
var createMethod$2 = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!descriptors || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

var objectToArray = {
  // `Object.entries` method
  // https://tc39.github.io/ecma262/#sec-object.entries
  entries: createMethod$2(true),
  // `Object.values` method
  // https://tc39.github.io/ecma262/#sec-object.values
  values: createMethod$2(false)
};

var $values = objectToArray.values;

// `Object.values` method
// https://tc39.github.io/ecma262/#sec-object.values
_export({ target: 'Object', stat: true }, {
  values: function values(O) {
    return $values(O);
  }
});

var nativePromiseConstructor = global_1.Promise;

var redefineAll = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};

var defineProperty$2 = objectDefineProperty.f;



var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

var setToStringTag = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG$2)) {
    defineProperty$2(it, TO_STRING_TAG$2, { configurable: true, value: TAG });
  }
};

var SPECIES$1 = wellKnownSymbol('species');

var setSpecies = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = objectDefineProperty.f;

  if (descriptors && Constructor && !Constructor[SPECIES$1]) {
    defineProperty(Constructor, SPECIES$1, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var anInstance = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};

var iterators = {};

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod = function (it) {
  return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

var ITERATOR$1 = wellKnownSymbol('iterator');

var getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$1]
    || it['@@iterator']
    || iterators[classof(it)];
};

// call something on iterator step with safe closing on error
var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

var iterate_1 = createCommonjsModule(function (module) {
var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};
});

var ITERATOR$2 = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$2] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$2] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var SPECIES$2 = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
var speciesConstructor = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES$2]) == undefined ? defaultConstructor : aFunction$1(S);
};

var html = getBuiltIn('document', 'documentElement');

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

var location = global_1.location;
var set$1 = global_1.setImmediate;
var clear = global_1.clearImmediate;
var process = global_1.process;
var MessageChannel = global_1.MessageChannel;
var Dispatch = global_1.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global_1.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set$1 || !clear) {
  set$1 = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (classofRaw(process) == 'process') {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !engineIsIos) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = functionBindContext(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global_1.addEventListener &&
    typeof postMessage == 'function' &&
    !global_1.importScripts &&
    !fails(post) &&
    location.protocol !== 'file:'
  ) {
    defer = post;
    global_1.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
    defer = function (id) {
      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

var task = {
  set: set$1,
  clear: clear
};

var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;

var macrotask = task.set;


var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
var process$1 = global_1.process;
var Promise$1 = global_1.Promise;
var IS_NODE = classofRaw(process$1) == 'process';
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global_1, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process$1.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (IS_NODE) {
    notify = function () {
      process$1.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  } else if (MutationObserver && !engineIsIos) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise$1.resolve(undefined);
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global_1, flush);
    };
  }
}

var microtask = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction$1(resolve);
  this.reject = aFunction$1(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
var f$5 = function (C) {
  return new PromiseCapability(C);
};

var newPromiseCapability = {
	f: f$5
};

var promiseResolve = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var hostReportErrors = function (a, b) {
  var console = global_1.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

var perform = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

var process$2 = global_1.process;
var versions = process$2 && process$2.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

var task$1 = task.set;










var SPECIES$3 = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = internalState.get;
var setInternalState = internalState.set;
var getInternalPromiseState = internalState.getterFor(PROMISE);
var PromiseConstructor = nativePromiseConstructor;
var TypeError$1 = global_1.TypeError;
var document$2 = global_1.document;
var process$3 = global_1.process;
var $fetch = getBuiltIn('fetch');
var newPromiseCapability$1 = newPromiseCapability.f;
var newGenericPromiseCapability = newPromiseCapability$1;
var IS_NODE$1 = classofRaw(process$3) == 'process';
var DISPATCH_EVENT = !!(document$2 && document$2.createEvent && global_1.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced_1(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  if (!GLOBAL_CORE_JS_PROMISE) {
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (engineV8Version === 66) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    if (!IS_NODE$1 && typeof PromiseRejectionEvent != 'function') return true;
  }
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (engineV8Version >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES$3] = FakePromise;
  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify$1 = function (promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$2.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global_1.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (handler = global_1['on' + name]) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (promise, state) {
  task$1.call(global_1, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE$1) {
          process$3.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (promise, state) {
  task$1.call(global_1, function () {
    if (IS_NODE$1) {
      process$3.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify$1(promise, state, true);
};

var internalResolve = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, promise, wrapper, state),
            bind(internalReject, promise, wrapper, state)
          );
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify$1(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, { done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction$1(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE$1 ? process$3.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify$1(this, state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };
  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if ( typeof nativePromiseConstructor == 'function') {
    nativeThen = nativePromiseConstructor.prototype.then;

    // wrap native Promise#then for native async functions
    redefine(nativePromiseConstructor.prototype, 'then', function then(onFulfilled, onRejected) {
      var that = this;
      return new PromiseConstructor(function (resolve, reject) {
        nativeThen.call(that, resolve, reject);
      }).then(onFulfilled, onRejected);
    // https://github.com/zloirock/core-js/issues/640
    }, { unsafe: true });

    // wrap fetch result
    if (typeof $fetch == 'function') _export({ global: true, enumerable: true, forced: true }, {
      // eslint-disable-next-line no-unused-vars
      fetch: function fetch(input /* , init */) {
        return promiseResolve(PromiseConstructor, $fetch.apply(global_1, arguments));
      }
    });
  }
}

_export({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
_export({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability$1(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

_export({ target: PROMISE, stat: true, forced:  FORCED }, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve( this, x);
  }
});

_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability$1(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction$1(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate_1(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability$1(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction$1(C.resolve);
      iterate_1(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

for (var COLLECTION_NAME in domIterables) {
  var Collection = global_1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
  } catch (error) {
    CollectionPrototype.forEach = arrayForEach;
  }
}

var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof commonjsGlobal !== "undefined") {
    win = commonjsGlobal;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

var window_1 = win;

var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

var SPECIES$4 = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return engineV8Version >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$4] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
_export({ target: 'Array', proto: true, forced: FORCED$1 }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

var dist = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;
var _global = commonjsGlobal,
    console = _global.console;
/* tslint:disable: no-console */

var logger = {
  debug: function debug(message) {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    return console.debug.apply(console, [message].concat(rest));
  },
  log: function log(message) {
    for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      rest[_key2 - 1] = arguments[_key2];
    }

    return console.log.apply(console, [message].concat(rest));
  },
  info: function info(message) {
    for (var _len3 = arguments.length, rest = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      rest[_key3 - 1] = arguments[_key3];
    }

    return console.info.apply(console, [message].concat(rest));
  },
  warn: function warn(message) {
    for (var _len4 = arguments.length, rest = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      rest[_key4 - 1] = arguments[_key4];
    }

    return console.warn.apply(console, [message].concat(rest));
  },
  error: function error(message) {
    for (var _len5 = arguments.length, rest = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      rest[_key5 - 1] = arguments[_key5];
    }

    return console.error.apply(console, [message].concat(rest));
  }
};
exports.logger = logger;
});

unwrapExports(dist);

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
  return O;
};

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype$1 = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
  objectDefineProperty.f(ArrayPrototype$1, UNSCOPABLES, {
    configurable: true,
    value: objectCreate(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables = function (key) {
  ArrayPrototype$1[UNSCOPABLES][key] = true;
};

var $find = arrayIteration.find;



var FIND = 'find';
var SKIPS_HOLES = true;

var USES_TO_LENGTH$1 = arrayMethodUsesToLength(FIND);

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find
_export({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH$1 }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);

var types_1 = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSupportedType = isSupportedType;
exports.types = void 0;
var types;
exports.types = types;

(function (types) {
  types["TAB"] = "tab";
  types["PANEL"] = "panel";
  types["TOOL"] = "tool";
  types["PREVIEW"] = "preview";
  types["NOTES_ELEMENT"] = "notes-element";
})(types || (exports.types = types = {}));

function isSupportedType(type) {
  return !!Object.values(types).find(function (typeVal) {
    return typeVal === type;
  });
}
});

unwrapExports(types_1);

var dist$1 = createCommonjsModule(function (module, exports) {













Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addons = exports.AddonStore = void 0;

var _global = _interopRequireDefault(window_1);





function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddonStore = function AddonStore() {
  var _this = this;

  _classCallCheck(this, AddonStore);

  this.loaders = {};
  this.elements = {};
  this.config = {};
  this.channel = void 0;
  this.promise = void 0;
  this.resolve = void 0;

  this.getChannel = function () {
    // this.channel should get overwritten by setChannel. If it wasn't called (e.g. in non-browser environment), throw.
    if (!_this.channel) {
      throw new Error('Accessing non-existent addons channel, see https://storybook.js.org/basics/faq/#why-is-there-no-addons-channel');
    }

    return _this.channel;
  };

  this.ready = function () {
    return _this.promise;
  };

  this.hasChannel = function () {
    return !!_this.channel;
  };

  this.setChannel = function (channel) {
    _this.channel = channel;

    _this.resolve();
  };

  this.getElements = function (type) {
    if (!_this.elements[type]) {
      _this.elements[type] = {};
    }

    return _this.elements[type];
  };

  this.addPanel = function (name, options) {
    _this.add(name, Object.assign({
      type: types_1.types.PANEL
    }, options));
  };

  this.add = function (name, addon) {
    var type = addon.type;

    var collection = _this.getElements(type);

    collection[name] = Object.assign({
      id: name
    }, addon);
  };

  this.setConfig = function (value) {
    Object.assign(_this.config, value);
  };

  this.getConfig = function () {
    return _this.config;
  };

  this.register = function (name, registerCallback) {
    if (_this.loaders[name]) {
      dist.logger.warn("".concat(name, " was loaded twice, this could have bad side-effects"));
    }

    _this.loaders[name] = registerCallback;
  };

  this.loadAddons = function (api) {
    Object.values(_this.loaders).forEach(function (value) {
      return value(api);
    });
  };

  this.promise = new Promise(function (res) {
    _this.resolve = function () {
      return res(_this.getChannel());
    };
  });
}; // Enforce addons store to be a singleton


exports.AddonStore = AddonStore;
var KEY = '__STORYBOOK_ADDONS';

function getAddonsStore() {
  if (!_global["default"][KEY]) {
    _global["default"][KEY] = new AddonStore();
  }

  return _global["default"][KEY];
} // Exporting this twice in order to to be able to import it like { addons } instead of 'addons'
// prefer import { addons } from '@storybook/addons' over import addons from '@storybook/addons'
//
// See public_api.ts


var addons = getAddonsStore();
exports.addons = addons;
});

unwrapExports(dist$1);

var defineProperty$3 = objectDefineProperty.f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (descriptors && !(NAME in FunctionPrototype)) {
  defineProperty$3(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}

/**
 * Module exports.
 */

var browser = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!commonjsGlobal.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = commonjsGlobal.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

var makeDecorator_1 = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeDecorator = void 0;

var _utilDeprecate = _interopRequireDefault(browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var makeDecorator = function makeDecorator(_ref) {
  var name = _ref.name,
      parameterName = _ref.parameterName,
      wrapper = _ref.wrapper,
      _ref$skipIfNoParamete = _ref.skipIfNoParametersOrOptions,
      skipIfNoParametersOrOptions = _ref$skipIfNoParamete === void 0 ? false : _ref$skipIfNoParamete,
      _ref$allowDeprecatedU = _ref.allowDeprecatedUsage,
      allowDeprecatedUsage = _ref$allowDeprecatedU === void 0 ? false : _ref$allowDeprecatedU;

  var decorator = function decorator(options) {
    return function (getStory, context) {
      var parameters = context.parameters && context.parameters[parameterName];

      if (parameters && parameters.disable) {
        return getStory(context);
      }

      if (skipIfNoParametersOrOptions && !options && !parameters) {
        return getStory(context);
      }

      return wrapper(getStory, context, {
        options: options,
        parameters: parameters
      });
    };
  };

  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // Used without options as .addDecorator(decorator)
    if (typeof args[0] === 'function') {
      return decorator().apply(void 0, args);
    }

    return function () {
      for (var _len2 = arguments.length, innerArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        innerArgs[_key2] = arguments[_key2];
      }

      // Used as [.]addDecorator(decorator(options))
      if (innerArgs.length > 1) {
        return decorator.apply(void 0, args).apply(void 0, innerArgs);
      }

      if (allowDeprecatedUsage) {
        // Used to wrap a story directly .add('story', decorator(options)(() => <Story />))
        //   This is now deprecated:
        return (0, _utilDeprecate["default"])(function (context) {
          return decorator.apply(void 0, args)(innerArgs[0], context);
        }, "Passing stories directly into ".concat(name, "() is deprecated,\n          instead use addDecorator(").concat(name, ") and pass options with the '").concat(parameterName, "' parameter"));
      }

      throw new Error("Passing stories directly into ".concat(name, "() is not allowed,\n        instead use addDecorator(").concat(name, ") and pass options with the '").concat(parameterName, "' parameter"));
    };
  };
};

exports.makeDecorator = makeDecorator;
});

unwrapExports(makeDecorator_1);

var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

var toString$1 = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var f$6 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};

var objectGetOwnPropertyNamesExternal = {
	f: f$6
};

var f$7 = wellKnownSymbol;

var wellKnownSymbolWrapped = {
	f: f$7
};

var defineProperty$4 = objectDefineProperty.f;

var defineWellKnownSymbol = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty$4(Symbol, NAME, {
    value: wellKnownSymbolWrapped.f(NAME)
  });
};

var $forEach$1 = arrayIteration.forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE$1 = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState$1 = internalState.set;
var getInternalState$1 = internalState.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE$1];
var $Symbol = global_1.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var nativeDefineProperty$1 = objectDefineProperty.f;
var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore$1 = shared('wks');
var QObject = global_1.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = descriptors && fails(function () {
  return objectCreate(nativeDefineProperty$1({}, 'a', {
    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty$1(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty$1;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
  setInternalState$1(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!descriptors) symbol.description = description;
  return symbol;
};

var isSymbol = useSymbolAsUid ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty$1(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach$1(keys, function (key) {
    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
  var result = [];
  $forEach$1(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach$1(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!nativeSymbol) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
    return getInternalState$1(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
  objectDefineProperty.f = $defineProperty;
  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

  wellKnownSymbolWrapped.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (descriptors) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState$1(this).description;
      }
    });
    {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
  Symbol: $Symbol
});

$forEach$1(objectKeys(WellKnownSymbolsStore$1), function (name) {
  defineWellKnownSymbol(name);
});

_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return objectGetOwnPropertySymbols.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;

var defineProperty$5 = objectDefineProperty.f;


var NativeSymbol = global_1.Symbol;

if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty$5(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  _export({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}

// `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');

var $filter = arrayIteration.filter;



var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH$2 = arrayMethodUsesToLength('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$2 }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from
var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};

var INCORRECT_ITERATION$1 = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
_export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION$1 }, {
  from: arrayFrom
});

// `Array.isArray` method
// https://tc39.github.io/ecma262/#sec-array.isarray
_export({ target: 'Array', stat: true }, {
  isArray: isArray
});

var correctPrototypeGetter = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var IE_PROTO$1 = sharedKey('IE_PROTO');
var ObjectPrototype$1 = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype$1 : null;
};

var ITERATOR$3 = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if ( !has(IteratorPrototype, ITERATOR$3)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR$3, returnThis);
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





var returnThis$1 = function () { return this; };

var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
  iterators[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var aPossiblePrototype = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$4 = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis$2 = function () { return this; };

var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$4]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
        if (objectSetPrototypeOf) {
          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
        } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$4, returnThis$2);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ( IterablePrototype[ITERATOR$4] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR$4, defaultIterator);
  }
  iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$2 = internalState.set;
var getInternalState$2 = internalState.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState$2(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$2(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
iterators.Arguments = iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH$3 = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES$5 = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max$1 = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$3 }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES$5];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
_export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
  defineProperty: objectDefineProperty.f
});

var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return objectKeys(toObject(it));
  }
});

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var TO_STRING$1 = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING$1];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING$1;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING$1, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod$3 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$3(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$3(true)
};

var charAt = stringMultibyte.charAt;



var STRING_ITERATOR = 'String Iterator';
var setInternalState$3 = internalState.set;
var getInternalState$3 = internalState.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState$3(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$3(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

var ITERATOR$5 = wellKnownSymbol('iterator');
var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
var ArrayValues = es_array_iterator.values;

for (var COLLECTION_NAME$1 in domIterables) {
  var Collection$1 = global_1[COLLECTION_NAME$1];
  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
  if (CollectionPrototype$1) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype$1[ITERATOR$5] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype$1, ITERATOR$5, ArrayValues);
    } catch (error) {
      CollectionPrototype$1[ITERATOR$5] = ArrayValues;
    }
    if (!CollectionPrototype$1[TO_STRING_TAG$3]) {
      createNonEnumerableProperty(CollectionPrototype$1, TO_STRING_TAG$3, COLLECTION_NAME$1);
    }
    if (domIterables[COLLECTION_NAME$1]) for (var METHOD_NAME in es_array_iterator) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype$1[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype$1, METHOD_NAME, es_array_iterator[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype$1[METHOD_NAME] = es_array_iterator[METHOD_NAME];
      }
    }
  }
}

var FORCED$2 = !global_1.setImmediate || !global_1.clearImmediate;

// http://w3c.github.io/setImmediate/
_export({ global: true, bind: true, enumerable: true, forced: FORCED$2 }, {
  // `setImmediate` method
  // http://w3c.github.io/setImmediate/#si-setImmediate
  setImmediate: task.set,
  // `clearImmediate` method
  // http://w3c.github.io/setImmediate/#si-clearImmediate
  clearImmediate: task.clear
});

var dist$2 = createCommonjsModule(function (module, exports) {





































Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Channel = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var generateRandomId = function generateRandomId() {
  // generates a random 13 character string
  return Math.random().toString(16).slice(2);
};

var Channel =
/*#__PURE__*/
function () {
  function Channel() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        transport = _ref.transport,
        _ref$async = _ref.async,
        async = _ref$async === void 0 ? false : _ref$async;

    _classCallCheck(this, Channel);

    this.isAsync = void 0;
    this.sender = generateRandomId();
    this.events = {};
    this.transport = void 0;
    this.isAsync = async;

    if (transport) {
      this.transport = transport;
      this.transport.setHandler(function (event) {
        return _this.handleEvent(event);
      });
    }
  }

  _createClass(Channel, [{
    key: "addListener",
    value: function addListener(eventName, listener) {
      this.events[eventName] = this.events[eventName] || [];
      this.events[eventName].push(listener);
    }
  }, {
    key: "addPeerListener",
    value: function addPeerListener(eventName, listener) {
      var peerListener = listener;
      peerListener.ignorePeer = true;
      this.addListener(eventName, peerListener);
    }
  }, {
    key: "emit",
    value: function emit(eventName) {
      var _this2 = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var event = {
        type: eventName,
        args: args,
        from: this.sender
      };
      var options = {};

      if (args.length >= 1 && args[0] && args[0].options) {
        options = args[0].options;
      }

      var handler = function handler() {
        if (_this2.transport) {
          _this2.transport.send(event, options);
        }

        _this2.handleEvent(event, true);
      };

      if (this.isAsync) {
        // todo I'm not sure how to test this
        setImmediate(handler);
      } else {
        handler();
      }
    }
  }, {
    key: "eventNames",
    value: function eventNames() {
      return Object.keys(this.events);
    }
  }, {
    key: "listenerCount",
    value: function listenerCount(eventName) {
      var listeners = this.listeners(eventName);
      return listeners ? listeners.length : 0;
    }
  }, {
    key: "listeners",
    value: function listeners(eventName) {
      var listeners = this.events[eventName];
      return listeners || undefined;
    }
  }, {
    key: "once",
    value: function once(eventName, listener) {
      var onceListener = this.onceListener(eventName, listener);
      this.addListener(eventName, onceListener);
    }
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners(eventName) {
      if (!eventName) {
        this.events = {};
      } else if (this.events[eventName]) {
        delete this.events[eventName];
      }
    }
  }, {
    key: "removeListener",
    value: function removeListener(eventName, listener) {
      var listeners = this.listeners(eventName);

      if (listeners) {
        this.events[eventName] = listeners.filter(function (l) {
          return l !== listener;
        });
      }
    }
  }, {
    key: "on",
    value: function on(eventName, listener) {
      this.addListener(eventName, listener);
    }
  }, {
    key: "off",
    value: function off(eventName, listener) {
      this.removeListener(eventName, listener);
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(event) {
      var isPeer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var listeners = this.listeners(event.type);

      if (listeners && (isPeer || event.from !== this.sender)) {
        listeners.forEach(function (fn) {
          return !(isPeer && fn.ignorePeer) && fn.apply(void 0, _toConsumableArray(event.args));
        });
      }
    }
  }, {
    key: "onceListener",
    value: function onceListener(eventName, listener) {
      var _this3 = this;

      var onceListener = function onceListener() {
        _this3.removeListener(eventName, onceListener);

        return listener.apply(void 0, arguments);
      };

      return onceListener;
    }
  }, {
    key: "hasTransport",
    get: function get() {
      return !!this.transport;
    }
  }]);

  return Channel;
}();

exports.Channel = Channel;
var _default = Channel;
exports["default"] = _default;
});

unwrapExports(dist$2);

var storybookChannelMock = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockChannel = mockChannel;

var _channels = _interopRequireDefault(dist$2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function mockChannel() {
  var transport = {
    setHandler: function setHandler() {},
    send: function send() {}
  };
  return new _channels["default"]({
    transport: transport
  });
}
});

unwrapExports(storybookChannelMock);

var $every = arrayIteration.every;



var STRICT_METHOD$1 = arrayMethodIsStrict('every');
var USES_TO_LENGTH$4 = arrayMethodUsesToLength('every');

// `Array.prototype.every` method
// https://tc39.github.io/ecma262/#sec-array.prototype.every
_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$1 || !USES_TO_LENGTH$4 }, {
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $includes = arrayIncludes.includes;



var USES_TO_LENGTH$5 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
_export({ target: 'Array', proto: true, forced: !USES_TO_LENGTH$5 }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');

var $map = arrayIteration.map;



var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH$6 = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$6 }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
var functionBind = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction$1(this);
  var partArgs = slice.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};

// `Function.prototype.bind` method
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
_export({ target: 'Function', proto: true }, {
  bind: functionBind
});

var $entries = objectToArray.entries;

// `Object.entries` method
// https://tc39.github.io/ecma262/#sec-object.entries
_export({ target: 'Object', stat: true }, {
  entries: function entries(O) {
    return $entries(O);
  }
});

var freezing = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});

var internalMetadata = createCommonjsModule(function (module) {
var defineProperty = objectDefineProperty.f;



var METADATA = uid('meta');
var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;
});

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    objectSetPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) objectSetPrototypeOf($this, NewTargetPrototype);
  return $this;
};

var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        nativeMethod.call(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        nativeMethod.call(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  // eslint-disable-next-line max-len
  if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    internalMetadata.REQUIRED = true;
  } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  _export({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};

var defineProperty$6 = objectDefineProperty.f;








var fastKey = internalMetadata.fastKey;


var setInternalState$4 = internalState.set;
var internalStateGetterFor = internalState.getterFor;

var collectionStrong = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState$4(that, {
        type: CONSTRUCTOR_NAME,
        index: objectCreate(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!descriptors) that.size = 0;
      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (descriptors) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (descriptors) state.size = 0;
        else that.size = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (descriptors) state.size--;
          else that.size--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (descriptors) defineProperty$6(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState$4(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(CONSTRUCTOR_NAME);
  }
};

// `Set` constructor
// https://tc39.github.io/ecma262/#sec-set-objects
var es_set = collection('Set', function (init) {
  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
};

var notARegexp = function (it) {
  if (isRegexp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};

var MATCH$1 = wellKnownSymbol('match');

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH$1] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
_export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible(this))
      .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});

var getWeakData = internalMetadata.getWeakData;








var setInternalState$5 = internalState.set;
var internalStateGetterFor$1 = internalState.getterFor;
var find = arrayIteration.find;
var findIndex = arrayIteration.findIndex;
var id$1 = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) this.entries.splice(index, 1);
    return !!~index;
  }
};

var collectionWeak = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState$5(that, {
        type: CONSTRUCTOR_NAME,
        id: id$1++,
        frozen: undefined
      });
      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && has(data, state.id) && delete data[state.id];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has$1(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && has(data, state.id);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // 23.4.3.1 WeakSet.prototype.add(value)
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return C;
  }
};

var es_weakMap = createCommonjsModule(function (module) {






var enforceIternalState = internalState.enforce;


var IS_IE11 = !global_1.ActiveXObject && 'ActiveXObject' in global_1;
var isExtensible = Object.isExtensible;
var InternalWeakMap;

var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.github.io/ecma262/#sec-weakmap-constructor
var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak);

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (nativeWeakMap && IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  internalMetadata.REQUIRED = true;
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = WeakMapPrototype['delete'];
  var nativeHas = WeakMapPrototype.has;
  var nativeGet = WeakMapPrototype.get;
  var nativeSet = WeakMapPrototype.set;
  redefineAll(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete.call(this, key) || state.frozen['delete'](key);
      } return nativeDelete.call(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) || state.frozen.has(key);
      } return nativeHas.call(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
      } return nativeGet.call(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
      } else nativeSet.call(this, key, value);
      return this;
    }
  });
}
});

var dist$3 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NAVIGATE_URL = exports.DOCS_RENDERED = exports.STORY_THREW_EXCEPTION = exports.STORIES_EXPAND_ALL = exports.STORIES_COLLAPSE_ALL = exports.STORY_CHANGED = exports.STORY_ERRORED = exports.STORY_MISSING = exports.STORY_RENDERED = exports.STORY_RENDER = exports.STORY_ADDED = exports.STORY_INIT = exports.REGISTER_SUBSCRIPTION = exports.FORCE_RE_RENDER = exports.PREVIEW_KEYDOWN = exports.SELECT_STORY = exports.STORIES_CONFIGURED = exports.SET_STORIES = exports.GET_STORIES = exports.SET_CURRENT_STORY = exports.GET_CURRENT_STORY = exports.CHANNEL_CREATED = exports["default"] = void 0;
var events; // Enables: `import Events from ...`

(function (events) {
  events["CHANNEL_CREATED"] = "channelCreated";
  events["GET_CURRENT_STORY"] = "getCurrentStory";
  events["SET_CURRENT_STORY"] = "setCurrentStory";
  events["GET_STORIES"] = "getStories";
  events["SET_STORIES"] = "setStories";
  events["STORIES_CONFIGURED"] = "storiesConfigured";
  events["SELECT_STORY"] = "selectStory";
  events["PREVIEW_KEYDOWN"] = "previewKeydown";
  events["STORY_ADDED"] = "storyAdded";
  events["STORY_CHANGED"] = "storyChanged";
  events["STORY_UNCHANGED"] = "storyUnchanged";
  events["FORCE_RE_RENDER"] = "forceReRender";
  events["REGISTER_SUBSCRIPTION"] = "registerSubscription";
  events["STORY_INIT"] = "storyInit";
  events["STORY_RENDER"] = "storyRender";
  events["STORY_RENDERED"] = "storyRendered";
  events["STORY_MISSING"] = "storyMissing";
  events["STORY_ERRORED"] = "storyErrored";
  events["STORY_THREW_EXCEPTION"] = "storyThrewException";
  events["STORIES_COLLAPSE_ALL"] = "storiesCollapseAll";
  events["STORIES_EXPAND_ALL"] = "storiesExpandAll";
  events["DOCS_RENDERED"] = "docsRendered";
  events["NAVIGATE_URL"] = "navigateUrl";
})(events || (events = {}));

var _default = events; // Enables: `import * as Events from ...` or `import { CHANNEL_CREATED } as Events from ...`
// This is the preferred method

exports["default"] = _default;
var CHANNEL_CREATED = events.CHANNEL_CREATED,
    GET_CURRENT_STORY = events.GET_CURRENT_STORY,
    SET_CURRENT_STORY = events.SET_CURRENT_STORY,
    GET_STORIES = events.GET_STORIES,
    SET_STORIES = events.SET_STORIES,
    STORIES_CONFIGURED = events.STORIES_CONFIGURED,
    SELECT_STORY = events.SELECT_STORY,
    PREVIEW_KEYDOWN = events.PREVIEW_KEYDOWN,
    FORCE_RE_RENDER = events.FORCE_RE_RENDER,
    REGISTER_SUBSCRIPTION = events.REGISTER_SUBSCRIPTION,
    STORY_INIT = events.STORY_INIT,
    STORY_ADDED = events.STORY_ADDED,
    STORY_RENDER = events.STORY_RENDER,
    STORY_RENDERED = events.STORY_RENDERED,
    STORY_MISSING = events.STORY_MISSING,
    STORY_ERRORED = events.STORY_ERRORED,
    STORY_CHANGED = events.STORY_CHANGED,
    STORIES_COLLAPSE_ALL = events.STORIES_COLLAPSE_ALL,
    STORIES_EXPAND_ALL = events.STORIES_EXPAND_ALL,
    STORY_THREW_EXCEPTION = events.STORY_THREW_EXCEPTION,
    DOCS_RENDERED = events.DOCS_RENDERED,
    NAVIGATE_URL = events.NAVIGATE_URL;
exports.NAVIGATE_URL = NAVIGATE_URL;
exports.DOCS_RENDERED = DOCS_RENDERED;
exports.STORY_THREW_EXCEPTION = STORY_THREW_EXCEPTION;
exports.STORIES_EXPAND_ALL = STORIES_EXPAND_ALL;
exports.STORIES_COLLAPSE_ALL = STORIES_COLLAPSE_ALL;
exports.STORY_CHANGED = STORY_CHANGED;
exports.STORY_ERRORED = STORY_ERRORED;
exports.STORY_MISSING = STORY_MISSING;
exports.STORY_RENDERED = STORY_RENDERED;
exports.STORY_RENDER = STORY_RENDER;
exports.STORY_ADDED = STORY_ADDED;
exports.STORY_INIT = STORY_INIT;
exports.REGISTER_SUBSCRIPTION = REGISTER_SUBSCRIPTION;
exports.FORCE_RE_RENDER = FORCE_RE_RENDER;
exports.PREVIEW_KEYDOWN = PREVIEW_KEYDOWN;
exports.SELECT_STORY = SELECT_STORY;
exports.STORIES_CONFIGURED = STORIES_CONFIGURED;
exports.SET_STORIES = SET_STORIES;
exports.GET_STORIES = GET_STORIES;
exports.SET_CURRENT_STORY = SET_CURRENT_STORY;
exports.GET_CURRENT_STORY = GET_CURRENT_STORY;
exports.CHANNEL_CREATED = CHANNEL_CREATED;
});

unwrapExports(dist$3);

var hooks = createCommonjsModule(function (module, exports) {



















































Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMemo = useMemo;
exports.useCallback = useCallback;
exports.useRef = useRef;
exports.useState = useState;
exports.useReducer = useReducer;
exports.useEffect = useEffect;
exports.useChannel = useChannel;
exports.useStoryContext = useStoryContext;
exports.useParameter = useParameter;
exports.applyHooks = exports.HooksContext = void 0;

var _global = _interopRequireDefault(window_1);







function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RenderEvents = [dist$3.STORY_RENDERED, dist$3.DOCS_RENDERED];

var HooksContext =
/*#__PURE__*/
function () {
  function HooksContext() {
    var _this = this;

    _classCallCheck(this, HooksContext);

    this.hookListsMap = void 0;
    this.mountedDecorators = void 0;
    this.prevMountedDecorators = void 0;
    this.currentHooks = void 0;
    this.nextHookIndex = void 0;
    this.currentPhase = void 0;
    this.currentEffects = void 0;
    this.prevEffects = void 0;
    this.currentDecoratorName = void 0;
    this.hasUpdates = void 0;
    this.currentContext = void 0;

    this.renderListener = function () {
      _this.triggerEffects();

      _this.currentContext = null;

      _this.removeRenderListeners();
    };

    this.init();
  }

  _createClass(HooksContext, [{
    key: "init",
    value: function init() {
      this.hookListsMap = new WeakMap();
      this.mountedDecorators = new Set();
      this.prevMountedDecorators = this.mountedDecorators;
      this.currentHooks = [];
      this.nextHookIndex = 0;
      this.currentPhase = 'NONE';
      this.currentEffects = [];
      this.prevEffects = [];
      this.currentDecoratorName = null;
      this.hasUpdates = false;
      this.currentContext = null;
    }
  }, {
    key: "clean",
    value: function clean() {
      this.prevEffects.forEach(function (effect) {
        if (effect.destroy) {
          effect.destroy();
        }
      });
      this.init();
      this.removeRenderListeners();
    }
  }, {
    key: "getNextHook",
    value: function getNextHook() {
      var hook = this.currentHooks[this.nextHookIndex];
      this.nextHookIndex += 1;
      return hook;
    }
  }, {
    key: "triggerEffects",
    value: function triggerEffects() {
      var _this2 = this;

      // destroy removed effects
      this.prevEffects.forEach(function (effect) {
        if (!_this2.currentEffects.includes(effect) && effect.destroy) {
          effect.destroy();
        }
      }); // trigger added effects

      this.currentEffects.forEach(function (effect) {
        if (!_this2.prevEffects.includes(effect)) {
          // eslint-disable-next-line no-param-reassign
          effect.destroy = effect.create();
        }
      });
      this.prevEffects = this.currentEffects;
      this.currentEffects = [];
    }
  }, {
    key: "addRenderListeners",
    value: function addRenderListeners() {
      var _this3 = this;

      this.removeRenderListeners();

      var channel = dist$1.addons.getChannel();

      RenderEvents.forEach(function (e) {
        return channel.on(e, _this3.renderListener);
      });
    }
  }, {
    key: "removeRenderListeners",
    value: function removeRenderListeners() {
      var _this4 = this;

      var channel = dist$1.addons.getChannel();

      RenderEvents.forEach(function (e) {
        return channel.removeListener(e, _this4.renderListener);
      });
    }
  }]);

  return HooksContext;
}();

exports.HooksContext = HooksContext;

var hookify = function hookify(fn) {
  return function () {
    var _ref = typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'function' ? arguments.length <= 1 ? undefined : arguments[1] : arguments.length <= 0 ? undefined : arguments[0],
        hooks = _ref.hooks;

    var prevPhase = hooks.currentPhase;
    var prevHooks = hooks.currentHooks;
    var prevNextHookIndex = hooks.nextHookIndex;
    var prevDecoratorName = hooks.currentDecoratorName;
    hooks.currentDecoratorName = fn.name;

    if (hooks.prevMountedDecorators.has(fn)) {
      hooks.currentPhase = 'UPDATE';
      hooks.currentHooks = hooks.hookListsMap.get(fn) || [];
    } else {
      hooks.currentPhase = 'MOUNT';
      hooks.currentHooks = [];
      hooks.hookListsMap.set(fn, hooks.currentHooks);
      hooks.prevMountedDecorators.add(fn);
    }

    hooks.nextHookIndex = 0;
    var prevContext = _global["default"].STORYBOOK_HOOKS_CONTEXT;
    _global["default"].STORYBOOK_HOOKS_CONTEXT = hooks;
    var result = fn.apply(void 0, arguments);
    _global["default"].STORYBOOK_HOOKS_CONTEXT = prevContext;

    if (hooks.currentPhase === 'UPDATE' && hooks.getNextHook() != null) {
      throw new Error('Rendered fewer hooks than expected. This may be caused by an accidental early return statement.');
    }

    hooks.currentPhase = prevPhase;
    hooks.currentHooks = prevHooks;
    hooks.nextHookIndex = prevNextHookIndex;
    hooks.currentDecoratorName = prevDecoratorName;
    return result;
  };
}; // Counter to prevent infinite loops.


var numberOfRenders = 0;
var RENDER_LIMIT = 25;

var applyHooks = function applyHooks(applyDecorators) {
  return function (getStory, decorators) {
    var decorated = applyDecorators(hookify(getStory), decorators.map(hookify));
    return function (context) {
      var hooks = context.hooks;
      hooks.prevMountedDecorators = hooks.mountedDecorators;
      hooks.mountedDecorators = new Set([getStory].concat(_toConsumableArray(decorators)));
      hooks.currentContext = context;
      hooks.hasUpdates = false;
      var result = decorated(context);
      numberOfRenders = 1;

      while (hooks.hasUpdates) {
        hooks.hasUpdates = false;
        hooks.currentEffects = [];
        result = decorated(context);
        numberOfRenders += 1;

        if (numberOfRenders > RENDER_LIMIT) {
          throw new Error('Too many re-renders. Storybook limits the number of renders to prevent an infinite loop.');
        }
      }

      hooks.addRenderListeners();
      return result;
    };
  };
};

exports.applyHooks = applyHooks;

var areDepsEqual = function areDepsEqual(deps, nextDeps) {
  return deps.length === nextDeps.length && deps.every(function (dep, i) {
    return dep === nextDeps[i];
  });
};

var invalidHooksError = function invalidHooksError() {
  return new Error('Storybook preview hooks can only be called inside decorators and story functions.');
};

function getHooksContextOrNull() {
  return _global["default"].STORYBOOK_HOOKS_CONTEXT || null;
}

function getHooksContextOrThrow() {
  var hooks = getHooksContextOrNull();

  if (hooks == null) {
    throw invalidHooksError();
  }

  return hooks;
}

function useHook(name, callback, deps) {
  var hooks = getHooksContextOrThrow();

  if (hooks.currentPhase === 'MOUNT') {
    if (deps != null && !Array.isArray(deps)) {
      dist.logger.warn("".concat(name, " received a final argument that is not an array (instead, received ").concat(deps, "). When specified, the final argument must be an array."));
    }

    var _hook = {
      name: name,
      deps: deps
    };
    hooks.currentHooks.push(_hook);
    callback(_hook);
    return _hook;
  }

  if (hooks.currentPhase === 'UPDATE') {
    var _hook2 = hooks.getNextHook();

    if (_hook2 == null) {
      throw new Error('Rendered more hooks than during the previous render.');
    }

    if (_hook2.name !== name) {
      dist.logger.warn("Storybook has detected a change in the order of Hooks".concat(hooks.currentDecoratorName ? " called by ".concat(hooks.currentDecoratorName) : '', ". This will lead to bugs and errors if not fixed."));
    }

    if (deps != null && _hook2.deps == null) {
      dist.logger.warn("".concat(name, " received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders."));
    }

    if (deps != null && _hook2.deps != null && deps.length !== _hook2.deps.length) {
      dist.logger.warn("The final argument passed to ".concat(name, " changed size between renders. The order and size of this array must remain constant.\nPrevious: ").concat(_hook2.deps, "\nIncoming: ").concat(deps));
    }

    if (deps == null || _hook2.deps == null || !areDepsEqual(deps, _hook2.deps)) {
      callback(_hook2);
      _hook2.deps = deps;
    }

    return _hook2;
  }

  throw invalidHooksError();
}

function useMemoLike(name, nextCreate, deps) {
  var _useHook = useHook(name, function (hook) {
    // eslint-disable-next-line no-param-reassign
    hook.memoizedState = nextCreate();
  }, deps),
      memoizedState = _useHook.memoizedState;

  return memoizedState;
}
/* Returns a memoized value, see https://reactjs.org/docs/hooks-reference.html#usememo */


function useMemo(nextCreate, deps) {
  return useMemoLike('useMemo', nextCreate, deps);
}
/* Returns a memoized callback, see https://reactjs.org/docs/hooks-reference.html#usecallback */


function useCallback(callback, deps) {
  return useMemoLike('useCallback', function () {
    return callback;
  }, deps);
}

function useRefLike(name, initialValue) {
  return useMemoLike(name, function () {
    return {
      current: initialValue
    };
  }, []);
}
/* Returns a mutable ref object, see https://reactjs.org/docs/hooks-reference.html#useref */


function useRef(initialValue) {
  return useRefLike('useRef', initialValue);
}

function triggerUpdate() {
  var hooks = getHooksContextOrNull(); // Rerun getStory if updates were triggered synchronously, force rerender otherwise

  if (hooks != null && hooks.currentPhase !== 'NONE') {
    hooks.hasUpdates = true;
  } else {
    try {
      dist$1.addons.getChannel().emit(dist$3.FORCE_RE_RENDER);
    } catch (e) {
      dist.logger.warn('State updates of Storybook preview hooks work only in browser');
    }
  }
}

function useStateLike(name, initialState) {
  var stateRef = useRefLike(name, // @ts-ignore S type should never be function, but there's no way to tell that to TypeScript
  typeof initialState === 'function' ? initialState() : initialState);

  var setState = function setState(update) {
    // @ts-ignore S type should never be function, but there's no way to tell that to TypeScript
    stateRef.current = typeof update === 'function' ? update(stateRef.current) : update;
    triggerUpdate();
  };

  return [stateRef.current, setState];
}
/* Returns a stateful value, and a function to update it, see https://reactjs.org/docs/hooks-reference.html#usestate */


function useState(initialState) {
  return useStateLike('useState', initialState);
}
/* A redux-like alternative to useState, see https://reactjs.org/docs/hooks-reference.html#usereducer */


function useReducer(reducer, initialArg, init) {
  var initialState = init != null ? function () {
    return init(initialArg);
  } : initialArg;

  var _useStateLike = useStateLike('useReducer', initialState),
      _useStateLike2 = _slicedToArray(_useStateLike, 2),
      state = _useStateLike2[0],
      setState = _useStateLike2[1];

  var dispatch = function dispatch(action) {
    return setState(function (prevState) {
      return reducer(prevState, action);
    });
  };

  return [state, dispatch];
}
/*
  Triggers a side effect, see https://reactjs.org/docs/hooks-reference.html#usestate
  Effects are triggered synchronously after rendering the story
*/


function useEffect(create, deps) {
  var hooks = getHooksContextOrThrow();
  var effect = useMemoLike('useEffect', function () {
    return {
      create: create
    };
  }, deps);

  if (!hooks.currentEffects.includes(effect)) {
    hooks.currentEffects.push(effect);
  }
}

/* Accepts a map of Storybook channel event listeners, returns an emit function */
function useChannel(eventMap) {
  var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var channel = dist$1.addons.getChannel();

  useEffect(function () {
    Object.entries(eventMap).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          type = _ref3[0],
          listener = _ref3[1];

      return channel.on(type, listener);
    });
    return function () {
      Object.entries(eventMap).forEach(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            type = _ref5[0],
            listener = _ref5[1];

        return channel.removeListener(type, listener);
      });
    };
  }, [].concat(_toConsumableArray(Object.keys(eventMap)), _toConsumableArray(deps)));
  return channel.emit.bind(channel);
}
/* Returns current story context */


function useStoryContext() {
  var _getHooksContextOrThr = getHooksContextOrThrow(),
      currentContext = _getHooksContextOrThr.currentContext;

  if (currentContext == null) {
    throw invalidHooksError();
  }

  return currentContext;
}
/* Returns current value of a story parameter */


function useParameter(parameterKey, defaultValue) {
  var _useStoryContext = useStoryContext(),
      parameters = _useStoryContext.parameters;

  if (parameterKey) {
    return parameters[parameterKey] || defaultValue;
  }

  return undefined;
}
});

unwrapExports(hooks);

var public_api = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;



Object.keys(dist$1).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return dist$1[key];
    }
  });
});



Object.keys(makeDecorator_1).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return makeDecorator_1[key];
    }
  });
});



Object.keys(types_1).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return types_1[key];
    }
  });
});



Object.keys(storybookChannelMock).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return storybookChannelMock[key];
    }
  });
});



Object.keys(hooks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return hooks[key];
    }
  });
});
// There can only be 1 default export per entry point and it has to be directly from public_api
// Exporting this twice in order to to be able to import it like { addons } instead of 'addons'
// prefer import { addons } from '@storybook/addons' over import addons from '@storybook/addons'
//
// See index.ts
var _default = dist$1.addons;
exports["default"] = _default;
});

unwrapExports(public_api);

var shared$1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CLICK = exports.SET_OPTIONS = exports.CHANGE = exports.SET = exports.RESET = exports.PANEL_ID = exports.ADDON_ID = exports.PARAM_KEY = void 0;
// addons, panels and events get unique names using a prefix
var PARAM_KEY = 'knobs';
exports.PARAM_KEY = PARAM_KEY;
var ADDON_ID = 'storybookjs/knobs';
exports.ADDON_ID = ADDON_ID;
var PANEL_ID = "".concat(ADDON_ID, "/panel");
exports.PANEL_ID = PANEL_ID;
var RESET = "".concat(ADDON_ID, "/reset");
exports.RESET = RESET;
var SET = "".concat(ADDON_ID, "/set");
exports.SET = SET;
var CHANGE = "".concat(ADDON_ID, "/change");
exports.CHANGE = CHANGE;
var SET_OPTIONS = "".concat(ADDON_ID, "/set-options");
exports.SET_OPTIONS = SET_OPTIONS;
var CLICK = "".concat(ADDON_ID, "/click");
exports.CLICK = CLICK;
});

unwrapExports(shared$1);

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod$4 = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction$1(callbackfn);
    var O = toObject(that);
    var self = indexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod$4(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod$4(true)
};

var $reduce = arrayReduce.left;



var STRICT_METHOD$2 = arrayMethodIsStrict('reduce');
var USES_TO_LENGTH$7 = arrayMethodUsesToLength('reduce', { 1: 0 });

// `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$2 || !USES_TO_LENGTH$7 }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $some = arrayIteration.some;



var STRICT_METHOD$3 = arrayMethodIsStrict('some');
var USES_TO_LENGTH$8 = arrayMethodUsesToLength('some');

// `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some
_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$3 || !USES_TO_LENGTH$8 }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var FAILS_ON_PRIMITIVES$1 = fails(function () { objectGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1, sham: !correctPrototypeGetter }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return objectGetPrototypeOf(toObject(it));
  }
});

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

var UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

var BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var regexpStickyHelpers = {
	UNSUPPORTED_Y: UNSUPPORTED_Y,
	BROKEN_CARET: BROKEN_CARET
};

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y$1 && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

var regexpExec = patchedExec;

_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
  exec: regexpExec
});

// TODO: Remove from `core-js@4` since it's moved to entry points







var SPECIES$6 = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES$6] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};

var charAt$1 = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
var advanceStringIndex = function (S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1);
};

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classofRaw(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};

// @@match logic
fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      if (!rx.global) return regexpExecAbstract(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regexpExecAbstract(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject$1(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObjectObject(o) {
  return isObject$1(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

var dist$4 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isExportStory = isExportStory;
exports.parseKind = exports.storyNameFromExport = exports.toId = exports.sanitize = void 0;

var _startCase = _interopRequireDefault(startCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Remove punctuation and illegal characters from a story ID.
 *
 * See https://gist.github.com/davidjrice/9d2af51100e41c6c4b4a
 */
var sanitize = function sanitize(string) {
  return string.toLowerCase() // eslint-disable-next-line no-useless-escape
  .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-').replace(/-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
};

exports.sanitize = sanitize;

var sanitizeSafe = function sanitizeSafe(string, part) {
  var sanitized = sanitize(string);

  if (sanitized === '') {
    throw new Error("Invalid ".concat(part, " '").concat(string, "', must include alphanumeric characters"));
  }

  return sanitized;
};
/**
 * Generate a storybook ID from a component/kind and story name.
 */


var toId = function toId(kind, name) {
  return "".concat(sanitizeSafe(kind, 'kind'), "--").concat(sanitizeSafe(name, 'name'));
};
/**
 * Transform a CSF named export into a readable story name
 */


exports.toId = toId;

var storyNameFromExport = function storyNameFromExport(key) {
  return (0, _startCase["default"])(key);
};

exports.storyNameFromExport = storyNameFromExport;

function matches(storyKey, arrayOrRegex) {
  if (Array.isArray(arrayOrRegex)) {
    return arrayOrRegex.includes(storyKey);
  }

  return storyKey.match(arrayOrRegex);
}
/**
 * Does a named export match CSF inclusion/exclusion options?
 */


function isExportStory(key, _ref) {
  var includeStories = _ref.includeStories,
      excludeStories = _ref.excludeStories;
  return (// https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs
    key !== '__esModule' && (!includeStories || matches(key, includeStories)) && (!excludeStories || !matches(key, excludeStories))
  );
}

/**
 * Parse out the component/kind name from a path, using the given separator config.
 */
var parseKind = function parseKind(kind, _ref2) {
  var rootSeparator = _ref2.rootSeparator,
      groupSeparator = _ref2.groupSeparator;

  var _kind$split = kind.split(rootSeparator, 2),
      _kind$split2 = _slicedToArray(_kind$split, 2),
      root = _kind$split2[0],
      remainder = _kind$split2[1];

  var groups = (remainder || kind).split(groupSeparator).filter(function (i) {
    return !!i;
  }); // when there's no remainder, it means the root wasn't found/split

  return {
    root: remainder ? root : null,
    groups: groups
  };
};

exports.parseKind = parseKind;
});

unwrapExports(dist$4);

// `Map` constructor
// https://tc39.github.io/ecma262/#sec-map-objects
var es_map = collection('Map', function (init) {
  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

var subscriptions_store = createCommonjsModule(function (module, exports) {















Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createSubscriptionsStore = void 0;

var createSubscriptionsStore = function createSubscriptionsStore() {
  var subscriptions = new Map();
  return {
    register: function register(subscribe) {
      var subscription = subscriptions.get(subscribe);

      if (!subscription) {
        subscription = {
          unsubscribe: subscribe()
        };
        subscriptions.set(subscribe, subscription);
      }

      subscription.used = true;
    },
    markAllAsUnused: function markAllAsUnused() {
      subscriptions.forEach(function (subscription) {
        // eslint-disable-next-line no-param-reassign
        subscription.used = false;
      });
    },
    clearUnused: function clearUnused() {
      subscriptions.forEach(function (subscription, key) {
        if (subscription.used) return;
        subscription.unsubscribe();
        subscriptions["delete"](key);
      });
    }
  };
};

exports.createSubscriptionsStore = createSubscriptionsStore;

var _default = createSubscriptionsStore();

exports["default"] = _default;
});

unwrapExports(subscriptions_store);

var hooks$1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "HooksContext", {
  enumerable: true,
  get: function get() {
    return public_api.HooksContext;
  }
});
Object.defineProperty(exports, "applyHooks", {
  enumerable: true,
  get: function get() {
    return public_api.applyHooks;
  }
});
Object.defineProperty(exports, "useMemo", {
  enumerable: true,
  get: function get() {
    return public_api.useMemo;
  }
});
Object.defineProperty(exports, "useCallback", {
  enumerable: true,
  get: function get() {
    return public_api.useCallback;
  }
});
Object.defineProperty(exports, "useRef", {
  enumerable: true,
  get: function get() {
    return public_api.useRef;
  }
});
Object.defineProperty(exports, "useState", {
  enumerable: true,
  get: function get() {
    return public_api.useState;
  }
});
Object.defineProperty(exports, "useReducer", {
  enumerable: true,
  get: function get() {
    return public_api.useReducer;
  }
});
Object.defineProperty(exports, "useEffect", {
  enumerable: true,
  get: function get() {
    return public_api.useEffect;
  }
});
Object.defineProperty(exports, "useChannel", {
  enumerable: true,
  get: function get() {
    return public_api.useChannel;
  }
});
Object.defineProperty(exports, "useStoryContext", {
  enumerable: true,
  get: function get() {
    return public_api.useStoryContext;
  }
});
Object.defineProperty(exports, "useParameter", {
  enumerable: true,
  get: function get() {
    return public_api.useParameter;
  }
});
});

unwrapExports(hooks$1);

var client_api = createCommonjsModule(function (module, exports) {

















































Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.addParameters = exports.addDecorator = exports.defaultDecorateStory = void 0;

var _utilDeprecate = _interopRequireDefault(browser);

var _isPlainObject = _interopRequireDefault(isPlainObject);



var _addons = _interopRequireDefault(public_api);

var _coreEvents = _interopRequireDefault(dist$3);



var _mergeWith = _interopRequireDefault(mergeWith);

var _isEqual = _interopRequireDefault(isEqual);

var _get = _interopRequireDefault(get$1);

var _subscriptions_store = _interopRequireDefault(subscriptions_store);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// merge with concatenating arrays, but no duplicates
var merge = function merge(a, b) {
  return (0, _mergeWith["default"])({}, a, b, function (objValue, srcValue) {
    if (Array.isArray(srcValue) && Array.isArray(objValue)) {
      srcValue.forEach(function (s) {
        var existing = objValue.find(function (o) {
          return o === s || (0, _isEqual["default"])(o, s);
        });

        if (!existing) {
          objValue.push(s);
        }
      });
      return objValue;
    }

    if (Array.isArray(objValue)) {
      dist.logger.log('the types mismatch, picking', objValue);

      return objValue;
    }

    return undefined;
  });
};

var defaultContext = {
  id: 'unspecified',
  name: 'unspecified',
  kind: 'unspecified',
  parameters: {}
};

var defaultDecorateStory = function defaultDecorateStory(storyFn, decorators) {
  return decorators.reduce(function (decorated, decorator) {
    return function () {
      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultContext;
      return decorator(function (p) {
        return decorated(p ? Object.assign({}, context, {}, p, {
          parameters: Object.assign({}, context.parameters, {}, p.parameters)
        }) : context);
      }, context);
    };
  }, storyFn);
};

exports.defaultDecorateStory = defaultDecorateStory;
var metaSubscriptionHandler = (0, _utilDeprecate["default"])(_subscriptions_store["default"].register, 'Events.REGISTER_SUBSCRIPTION is deprecated and will be removed in 6.0. Please use useEffect from @storybook/client-api instead.');

var metaSubscription = function metaSubscription() {
  _addons["default"].getChannel().on(_coreEvents["default"].REGISTER_SUBSCRIPTION, metaSubscriptionHandler);

  return function () {
    return _addons["default"].getChannel().removeListener(_coreEvents["default"].REGISTER_SUBSCRIPTION, metaSubscriptionHandler);
  };
};

var withSubscriptionTracking = function withSubscriptionTracking(storyFn) {
  if (!_addons["default"].hasChannel()) {
    return storyFn();
  }

  _subscriptions_store["default"].markAllAsUnused();

  _subscriptions_store["default"].register(metaSubscription);

  var result = storyFn();

  _subscriptions_store["default"].clearUnused();

  return result;
};

var _globalDecorators = [];
var _globalParameters = {};

var addDecorator = function addDecorator(decoratorFn) {
  _globalDecorators.push(decoratorFn);
};

exports.addDecorator = addDecorator;

var addParameters = function addParameters(parameters) {
  _globalParameters = Object.assign({}, _globalParameters, {}, parameters, {
    options: Object.assign({}, merge((0, _get["default"])(_globalParameters, 'options', {}), (0, _get["default"])(parameters, 'options', {}))),
    // FIXME: https://github.com/storybookjs/storybook/issues/7872
    docs: Object.assign({}, merge((0, _get["default"])(_globalParameters, 'docs', {}), (0, _get["default"])(parameters, 'docs', {})))
  });
};

exports.addParameters = addParameters;

var ClientApi = function ClientApi(_ref) {
  var _this = this;

  var storyStore = _ref.storyStore,
      _ref$decorateStory = _ref.decorateStory,
      decorateStory = _ref$decorateStory === void 0 ? defaultDecorateStory : _ref$decorateStory;

  _classCallCheck(this, ClientApi);

  this._storyStore = void 0;
  this._addons = void 0;
  this._decorateStory = void 0;

  this.setAddon = function (addon) {
    _this._addons = Object.assign({}, _this._addons, {}, addon);
  };

  this.getSeparators = function () {
    var _ref2 = _globalParameters.options || {},
        hierarchySeparator = _ref2.hierarchySeparator,
        hierarchyRootSeparator = _ref2.hierarchyRootSeparator,
        showRoots = _ref2.showRoots; // Note these checks will be removed in 6.0, leaving this much simpler


    if (typeof hierarchySeparator !== 'undefined' || typeof hierarchyRootSeparator !== 'undefined') {
      return {
        hierarchySeparator: hierarchySeparator,
        hierarchyRootSeparator: hierarchyRootSeparator
      };
    }

    if (typeof showRoots === 'undefined' && _this.store().getStoryKinds().some(function (kind) {
      return kind.match(/\.|\|/);
    })) {
      return {
        hierarchyRootSeparator: '|',
        hierarchySeparator: /\/|\./
      };
    }

    return {
      hierarchySeparator: '/'
    };
  };

  this.addDecorator = function (decorator) {
    addDecorator(decorator);
  };

  this.addParameters = function (parameters) {
    addParameters(parameters);
  };

  this.clearDecorators = function () {
    _globalDecorators = [];
  };

  this.clearParameters = function () {
    // Utility function FOR TESTING USE ONLY
    _globalParameters = {};
  };

  this.storiesOf = function (kind, m) {
    if (!kind && typeof kind !== 'string') {
      throw new Error('Invalid or missing kind provided for stories, should be a string');
    }

    if (!m) {
      dist.logger.warn("Missing 'module' parameter for story with a kind of '".concat(kind, "'. It will break your HMR"));
    }

    if (m) {
      var proto = Object.getPrototypeOf(m);

      if (proto.exports && proto.exports["default"]) {
        // FIXME: throw an error in SB6.0
        dist.logger.error("Illegal mix of CSF default export and storiesOf calls in a single file: ".concat(proto.i));
      }
    }

    if (m && m.hot && m.hot.dispose) {
      m.hot.dispose(function () {
        var _storyStore = _this._storyStore;

        _storyStore.removeStoryKind(kind);

        _storyStore.incrementRevision();
      });
    }

    var localDecorators = [];
    var localParameters = {};
    var hasAdded = false;
    var api = {
      kind: kind.toString(),
      add: function add() {
        return api;
      },
      addDecorator: function addDecorator() {
        return api;
      },
      addParameters: function addParameters() {
        return api;
      }
    }; // apply addons

    Object.keys(_this._addons).forEach(function (name) {
      var addon = _this._addons[name];

      api[name] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        addon.apply(api, args);
        return api;
      };
    });

    api.add = function (storyName, storyFn) {
      var parameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      hasAdded = true;
      var id = parameters.__id || (0, dist$4.toId)(kind, storyName);

      if (typeof storyName !== 'string') {
        throw new Error("Invalid or missing storyName provided for a \"".concat(kind, "\" story."));
      }

      if (m && m.hot && m.hot.dispose) {
        m.hot.dispose(function () {
          var _storyStore = _this._storyStore;

          _storyStore.remove(id);
        });
      }

      var fileName = m && m.id ? "".concat(m.id) : undefined;
      var allParam = [_globalParameters, localParameters, parameters].reduce(function (acc, p) {
        if (p) {
          Object.entries(p).forEach(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                key = _ref4[0],
                value = _ref4[1];

            var existingValue = acc[key];

            if (Array.isArray(value)) {
              acc[key] = value;
            } else if ((0, _isPlainObject["default"])(value) && (0, _isPlainObject["default"])(existingValue)) {
              acc[key] = merge(existingValue, value);
            } else {
              acc[key] = value;
            }
          });
        }

        return acc;
      }, {
        fileName: fileName
      });

      _this._storyStore.addStory({
        id: id,
        kind: kind,
        name: storyName,
        storyFn: storyFn,
        parameters: allParam
      }, {
        applyDecorators: (0, hooks$1.applyHooks)(_this._decorateStory),
        getDecorators: function getDecorators() {
          return [].concat(_toConsumableArray(allParam.decorators || []), localDecorators, _toConsumableArray(_globalDecorators), [withSubscriptionTracking]);
        }
      });

      return api;
    };

    api.addDecorator = function (decorator) {
      if (hasAdded) {
        dist.logger.warn("You have added a decorator to the kind '".concat(kind, "' after a story has already been added.\nIn Storybook 4 this applied the decorator only to subsequent stories. In Storybook 5+ it applies to all stories.\nThis is probably not what you intended. Read more here: https://github.com/storybookjs/storybook/blob/master/MIGRATION.md"));
      }

      localDecorators.push(decorator);
      return api;
    };

    api.addParameters = function (parameters) {
      localParameters = Object.assign({}, localParameters, {}, parameters);
      return api;
    };

    return api;
  };

  this.getStorybook = function () {
    return _this._storyStore.getStoryKinds().map(function (kind) {
      var fileName = _this._storyStore.getStoryFileName(kind);

      var stories = _this._storyStore.getStories(kind).map(function (name) {
        var render = _this._storyStore.getStoryWithContext(kind, name);

        return {
          name: name,
          render: render
        };
      });

      return {
        kind: kind,
        fileName: fileName,
        stories: stories
      };
    });
  };

  this.raw = function () {
    return _this._storyStore.raw();
  };

  this.store = function () {
    return _this._storyStore;
  };

  this._storyStore = storyStore;
  this._addons = {};
  this._decorateStory = decorateStory;

  if (!storyStore) {
    throw new Error('storyStore is required');
  }
};

exports["default"] = ClientApi;
});

unwrapExports(client_api);

var test$1 = [];
var nativeSort = test$1.sort;

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test$1.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test$1.sort(null);
});
// Old WebKit
var STRICT_METHOD$4 = arrayMethodIsStrict('sort');

var FORCED$3 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$4;

// `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort
_export({ target: 'Array', proto: true, forced: FORCED$3 }, {
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? nativeSort.call(toObject(this))
      : nativeSort.call(toObject(this), aFunction$1(comparefn));
  }
});

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
_export({ target: 'Object', stat: true, sham: !descriptors }, {
  create: objectCreate
});

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
_export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
  defineProperties: objectDefineProperties
});

var onFreeze = internalMetadata.onFreeze;

var nativeFreeze = Object.freeze;
var FAILS_ON_PRIMITIVES$2 = fails(function () { nativeFreeze(1); });

// `Object.freeze` method
// https://tc39.github.io/ecma262/#sec-object.freeze
_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$2, sham: !freezing }, {
  freeze: function freeze(it) {
    return nativeFreeze && isObject(it) ? nativeFreeze(onFreeze(it)) : it;
  }
});

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
_export({ target: 'Object', stat: true }, {
  setPrototypeOf: objectSetPrototypeOf
});

var max$2 = Math.max;
var min$2 = Math.min;
var floor$1 = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regexpExecAbstract(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max$2(min$2(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor$1(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

var slice$1 = [].slice;
var MSIE = /MSIE .\./.test(engineUserAgent); // <- dirty ie9- check

var wrap$1 = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice$1.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
_export({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap$1(global_1.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap$1(global_1.setInterval)
});

var eventemitter3 = createCommonjsModule(function (module) {

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
{
  module.exports = EventEmitter;
}
});

var memoizerific = createCommonjsModule(function (module, exports) {
(function(f){{module.exports=f();}})(function(){return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof commonjsRequire=="function"&&commonjsRequire;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r);}return n[o].exports}var i=typeof commonjsRequire=="function"&&commonjsRequire;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports = function(forceSimilar) {
	if (typeof Map !== 'function' || forceSimilar) {
		var Similar = _dereq_('./similar');
		return new Similar();
	}
	else {
		return new Map();
	}
};

},{"./similar":2}],2:[function(_dereq_,module,exports){
function Similar() {
	this.list = [];
	this.lastItem = undefined;
	this.size = 0;

	return this;
}

Similar.prototype.get = function(key) {
	var index;

	if (this.lastItem && this.isEqual(this.lastItem.key, key)) {
		return this.lastItem.val;
	}

	index = this.indexOf(key);
	if (index >= 0) {
		this.lastItem = this.list[index];
		return this.list[index].val;
	}

	return undefined;
};

Similar.prototype.set = function(key, val) {
	var index;

	if (this.lastItem && this.isEqual(this.lastItem.key, key)) {
		this.lastItem.val = val;
		return this;
	}

	index = this.indexOf(key);
	if (index >= 0) {
		this.lastItem = this.list[index];
		this.list[index].val = val;
		return this;
	}

	this.lastItem = { key: key, val: val };
	this.list.push(this.lastItem);
	this.size++;

	return this;
};

Similar.prototype.delete = function(key) {
	var index;

	if (this.lastItem && this.isEqual(this.lastItem.key, key)) {
		this.lastItem = undefined;
	}

	index = this.indexOf(key);
	if (index >= 0) {
		this.size--;
		return this.list.splice(index, 1)[0];
	}

	return undefined;
};


// important that has() doesn't use get() in case an existing key has a falsy value, in which case has() would return false
Similar.prototype.has = function(key) {
	var index;

	if (this.lastItem && this.isEqual(this.lastItem.key, key)) {
		return true;
	}

	index = this.indexOf(key);
	if (index >= 0) {
		this.lastItem = this.list[index];
		return true;
	}

	return false;
};

Similar.prototype.forEach = function(callback, thisArg) {
	var i;
	for (i = 0; i < this.size; i++) {
		callback.call(thisArg || this, this.list[i].val, this.list[i].key, this);
	}
};

Similar.prototype.indexOf = function(key) {
	var i;
	for (i = 0; i < this.size; i++) {
		if (this.isEqual(this.list[i].key, key)) {
			return i;
		}
	}
	return -1;
};

// check if the numbers are equal, or whether they are both precisely NaN (isNaN returns true for all non-numbers)
Similar.prototype.isEqual = function(val1, val2) {
	return val1 === val2 || (val1 !== val1 && val2 !== val2);
};

module.exports = Similar;
},{}],3:[function(_dereq_,module,exports){
var MapOrSimilar = _dereq_('map-or-similar');

module.exports = function (limit) {
	var cache = new MapOrSimilar(undefined === 'true'),
		lru = [];

	return function (fn) {
		var memoizerific = function () {
			var currentCache = cache,
				newMap,
				fnResult,
				argsLengthMinusOne = arguments.length - 1,
				lruPath = Array(argsLengthMinusOne + 1),
				isMemoized = true,
				i;

			if ((memoizerific.numArgs || memoizerific.numArgs === 0) && memoizerific.numArgs !== argsLengthMinusOne + 1) {
				throw new Error('Memoizerific functions should always be called with the same number of arguments');
			}

			// loop through each argument to traverse the map tree
			for (i = 0; i < argsLengthMinusOne; i++) {
				lruPath[i] = {
					cacheItem: currentCache,
					arg: arguments[i]
				};

				// climb through the hierarchical map tree until the second-last argument has been found, or an argument is missing.
				// if all arguments up to the second-last have been found, this will potentially be a cache hit (determined later)
				if (currentCache.has(arguments[i])) {
					currentCache = currentCache.get(arguments[i]);
					continue;
				}

				isMemoized = false;

				// make maps until last value
				newMap = new MapOrSimilar(undefined === 'true');
				currentCache.set(arguments[i], newMap);
				currentCache = newMap;
			}

			// we are at the last arg, check if it is really memoized
			if (isMemoized) {
				if (currentCache.has(arguments[argsLengthMinusOne])) {
					fnResult = currentCache.get(arguments[argsLengthMinusOne]);
				}
				else {
					isMemoized = false;
				}
			}

			if (!isMemoized) {
				fnResult = fn.apply(null, arguments);
				currentCache.set(arguments[argsLengthMinusOne], fnResult);
			}

			if (limit > 0) {
				lruPath[argsLengthMinusOne] = {
					cacheItem: currentCache,
					arg: arguments[argsLengthMinusOne]
				};

				if (isMemoized) {
					moveToMostRecentLru(lru, lruPath);
				}
				else {
					lru.push(lruPath);
				}

				if (lru.length > limit) {
					removeCachedResult(lru.shift());
				}
			}

			memoizerific.wasMemoized = isMemoized;
			memoizerific.numArgs = argsLengthMinusOne + 1;

			return fnResult;
		};

		memoizerific.limit = limit;
		memoizerific.wasMemoized = false;
		memoizerific.cache = cache;
		memoizerific.lru = lru;

		return memoizerific;
	};
};

// move current args to most recent position
function moveToMostRecentLru(lru, lruPath) {
	var lruLen = lru.length,
		lruPathLen = lruPath.length,
		isMatch,
		i, ii;

	for (i = 0; i < lruLen; i++) {
		isMatch = true;
		for (ii = 0; ii < lruPathLen; ii++) {
			if (!isEqual(lru[i][ii].arg, lruPath[ii].arg)) {
				isMatch = false;
				break;
			}
		}
		if (isMatch) {
			break;
		}
	}

	lru.push(lru.splice(i, 1)[0]);
}

// remove least recently used cache item and all dead branches
function removeCachedResult(removedLru) {
	var removedLruLen = removedLru.length,
		currentLru = removedLru[removedLruLen - 1],
		tmp,
		i;

	currentLru.cacheItem.delete(currentLru.arg);

	// walk down the tree removing dead branches (size 0) along the way
	for (i = removedLruLen - 2; i >= 0; i--) {
		currentLru = removedLru[i];
		tmp = currentLru.cacheItem.get(currentLru.arg);

		if (!tmp || !tmp.size) {
			currentLru.cacheItem.delete(currentLru.arg);
		} else {
			break;
		}
	}
}

// check if the numbers are equal, or whether they are both precisely NaN (isNaN returns true for all non-numbers)
function isEqual(val1, val2) {
	return val1 === val2 || (val1 !== val1 && val2 !== val2);
}
},{"map-or-similar":1}]},{},[3])(3)
});
});

var dist$5 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function dedent(templ) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var strings = Array.from(typeof templ === 'string' ? [templ] : templ.raw);
    strings[strings.length - 1] = strings[strings.length - 1].replace(/\r?\n([\t ]*)$/, '');
    var indentLengths = strings.reduce(function (arr, str) {
        var matches = str.match(/\n[\t ]+/g);
        if (matches) {
            return arr.concat(matches.map(function (match) { return match.length - 1; }));
        }
        return arr;
    }, []);
    if (indentLengths.length) {
        var pattern_1 = new RegExp("\n[\t ]{" + Math.min.apply(Math, indentLengths) + "}", 'g');
        strings = strings.map(function (str) { return str.replace(pattern_1, '\n'); });
    }
    strings[0] = strings[0].replace(/^\r?\n/, '');
    var string = strings[0];
    values.forEach(function (value, i) {
        string += value + strings[i + 1];
    });
    return string;
}
exports.dedent = dedent;
exports.default = dedent;

});

unwrapExports(dist$5);

var stable = createCommonjsModule(function (module, exports) {
//! stable.js 0.1.8, https://github.com/Two-Screen/stable
//! © 2018 Angry Bytes and contributors. MIT licensed.

(function (global, factory) {
   module.exports = factory() ;
}(commonjsGlobal, (function () {
  // A stable array sort, because `Array#sort()` is not guaranteed stable.
  // This is an implementation of merge sort, without recursion.

  var stable = function (arr, comp) {
    return exec(arr.slice(), comp)
  };

  stable.inplace = function (arr, comp) {
    var result = exec(arr, comp);

    // This simply copies back if the result isn't in the original array,
    // which happens on an odd number of passes.
    if (result !== arr) {
      pass(result, null, arr.length, arr);
    }

    return arr
  };

  // Execute the sort using the input array and a second buffer as work space.
  // Returns one of those two, containing the final result.
  function exec(arr, comp) {
    if (typeof(comp) !== 'function') {
      comp = function (a, b) {
        return String(a).localeCompare(b)
      };
    }

    // Short-circuit when there's nothing to sort.
    var len = arr.length;
    if (len <= 1) {
      return arr
    }

    // Rather than dividing input, simply iterate chunks of 1, 2, 4, 8, etc.
    // Chunks are the size of the left or right hand in merge sort.
    // Stop when the left-hand covers all of the array.
    var buffer = new Array(len);
    for (var chk = 1; chk < len; chk *= 2) {
      pass(arr, comp, chk, buffer);

      var tmp = arr;
      arr = buffer;
      buffer = tmp;
    }

    return arr
  }

  // Run a single pass with the given chunk size.
  var pass = function (arr, comp, chk, result) {
    var len = arr.length;
    var i = 0;
    // Step size / double chunk size.
    var dbl = chk * 2;
    // Bounds of the left and right chunks.
    var l, r, e;
    // Iterators over the left and right chunk.
    var li, ri;

    // Iterate over pairs of chunks.
    for (l = 0; l < len; l += dbl) {
      r = l + chk;
      e = r + chk;
      if (r > len) r = len;
      if (e > len) e = len;

      // Iterate both chunks in parallel.
      li = l;
      ri = r;
      while (true) {
        // Compare the chunks.
        if (li < r && ri < e) {
          // This works for a regular `sort()` compatible comparator,
          // but also for a simple comparator like: `a > b`
          if (comp(arr[li], arr[ri]) <= 0) {
            result[i++] = arr[li++];
          }
          else {
            result[i++] = arr[ri++];
          }
        }
        // Nothing to compare, just flush what's left.
        else if (li < r) {
          result[i++] = arr[li++];
        }
        else if (ri < e) {
          result[i++] = arr[ri++];
        }
        // Both iterators are at the chunk ends.
        else {
          break
        }
      }
    }
  };

  return stable;

})));
});

var story_store = createCommonjsModule(function (module, exports) {

































































Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _eventemitter = _interopRequireDefault(eventemitter3);

var _memoizerific = _interopRequireDefault(memoizerific);

var _debounce = _interopRequireDefault(debounce);

var _tsDedent = _interopRequireDefault(dist$5);

var _stable = _interopRequireDefault(stable);

var _coreEvents = _interopRequireDefault(dist$3);





function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Story with id ", " already exists in the store!\n\n        Perhaps you added the same story twice, or you have a name collision?\n        Story ids need to be unique -- ensure you aren't using the same names modulo url-sanitization.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// TODO: these are copies from components/nav/lib
// refactor to DRY
var toKey = function toKey(input) {
  return input.replace(/[^a-z0-9]+([a-z0-9])/gi, function () {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    return params[1].toUpperCase();
  });
};

var count = 0;

var getId = function getId() {
  count += 1;
  return count;
};

var toExtracted = function toExtracted(obj) {
  return Object.entries(obj).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (typeof value === 'function') {
      return acc;
    }

    if (key === 'hooks') {
      return acc;
    }

    if (Array.isArray(value)) {
      return Object.assign(acc, _defineProperty({}, key, value.slice().sort()));
    }

    return Object.assign(acc, _defineProperty({}, key, value));
  }, {});
};

var isStoryDocsOnly = function isStoryDocsOnly(parameters) {
  return parameters && parameters.docsOnly;
};

var includeStory = function includeStory(story) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    includeDocsOnly: false
  };

  if (options.includeDocsOnly) {
    return true;
  }

  return !isStoryDocsOnly(story.parameters);
};

var StoryStore =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(StoryStore, _EventEmitter);

  function StoryStore(params) {
    var _this;

    _classCallCheck(this, StoryStore);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StoryStore).call(this));
    _this._error = void 0;
    _this._channel = void 0;
    _this._data = void 0;
    _this._legacyData = void 0;
    _this._legacydata = void 0;
    _this._revision = void 0;
    _this._selection = void 0;
    _this._kindOrder = void 0;

    _this.setChannel = function (channel) {
      _this._channel = channel;
    };

    _this.fromId = function (id) {
      try {
        var data = _this._data[id];

        if (!data || !data.getDecorated) {
          return null;
        }

        return data;
      } catch (e) {
        dist.logger.warn('failed to get story:', _this._data);

        dist.logger.error(e);

        return null;
      }
    };

    _this.getSelection = function () {
      return _this._selection;
    };

    _this.getError = function () {
      return _this._error;
    };

    _this.remove = function (id) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          _data = _assertThisInitialize._data;

      var story = _data[id];
      delete _data[id];

      if (story) {
        story.hooks.clean();
        var kind = story.kind,
            name = story.name;

        var kindData = _this._legacydata[toKey(kind)];

        if (kindData) {
          delete kindData.stories[toKey(name)];
        }
      }
    };

    _this.getStoriesForManager = function () {
      return _this.extract({
        includeDocsOnly: true
      });
    };

    _this.pushToManager = (0, _debounce["default"])(function () {
      if (_this._channel) {
        var stories = _this.getStoriesForManager(); // send to the parent frame.


        _this._channel.emit(_coreEvents["default"].SET_STORIES, {
          stories: stories
        });
      }
    }, 0);
    _this._legacydata = {};
    _this._data = {};
    _this._revision = 0;
    _this._selection = {};
    _this._channel = params.channel;
    _this._error = undefined;
    _this._kindOrder = {};
    return _this;
  }

  _createClass(StoryStore, [{
    key: "raw",
    value: function raw(options) {
      var _this2 = this;

      return Object.values(this._data).filter(function (i) {
        return !!i.getDecorated;
      }).filter(function (i) {
        return includeStory(i, options);
      }).map(function (_ref3) {
        var id = _ref3.id;
        return _this2.fromId(id);
      });
    }
  }, {
    key: "extract",
    value: function extract(options) {
      var _this3 = this;

      var stories = Object.entries(this._data); // determine if we should apply a sort to the stories or use default import order

      if (Object.values(this._data).length > 0) {
        var index = Object.keys(this._data).find(function (key) {
          return !!(_this3._data[key] && _this3._data[key].parameters && _this3._data[key].parameters.options);
        });

        if (index && this._data[index].parameters.options.storySort) {
          var sortFn = this._data[index].parameters.options.storySort;

          _stable["default"].inplace(stories, sortFn);
        } else {
          // NOTE: when kinds are HMR'ed they get temporarily removed from the `_data` array
          // and thus lose order. However `_kindOrder` preservers the original load order
          _stable["default"].inplace(stories, function (s1, s2) {
            return _this3._kindOrder[s1[1].kind] - _this3._kindOrder[s2[1].kind];
          });
        }
      } // removes function values from all stories so they are safe to transport over the channel


      return stories.reduce(function (a, _ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            k = _ref5[0],
            v = _ref5[1];

        return includeStory(v, options) ? Object.assign(a, _defineProperty({}, k, toExtracted(v))) : a;
      }, {});
    }
  }, {
    key: "setSelection",
    value: function setSelection(data, error) {
      var _this4 = this;

      this._selection = data === undefined ? this._selection : {
        storyId: data.storyId,
        viewMode: data.viewMode
      };
      this._error = error === undefined ? this._error : error; // Try and emit the STORY_RENDER event synchronously, but if the channel is not ready (RN),
      // we'll try again later.

      var isStarted = false;

      if (this._channel) {
        this._channel.emit(_coreEvents["default"].STORY_RENDER);

        isStarted = true;
      }

      setTimeout(function () {
        if (_this4._channel && !isStarted) {
          _this4._channel.emit(_coreEvents["default"].STORY_RENDER);
        } // should be deprecated in future.


        _this4.emit(_coreEvents["default"].STORY_RENDER);
      }, 1);
    }
  }, {
    key: "addStory",
    value: function addStory(_ref6, _ref7) {
      var id = _ref6.id,
          kind = _ref6.kind,
          name = _ref6.name,
          original = _ref6.storyFn,
          _ref6$parameters = _ref6.parameters,
          parameters = _ref6$parameters === void 0 ? {} : _ref6$parameters;
      var getDecorators = _ref7.getDecorators,
          applyDecorators = _ref7.applyDecorators;
      var _data = this._data;

      if (_data[id]) {
        dist.logger.warn((0, _tsDedent["default"])(_templateObject(), id));
      }

      var identification = {
        id: id,
        kind: kind,
        name: name,
        story: name // legacy

      }; // immutable original storyFn

      var getOriginal = function getOriginal() {
        return original;
      }; // lazily decorate the story when it's loaded


      var getDecorated = (0, _memoizerific["default"])(1)(function () {
        return applyDecorators(getOriginal(), getDecorators());
      });
      var hooks = new hooks$1.HooksContext();

      var storyFn = function storyFn(p) {
        return getDecorated()(Object.assign({}, identification, {}, p, {
          hooks: hooks,
          parameters: Object.assign({}, parameters, {}, p && p.parameters)
        }));
      };

      _data[id] = Object.assign({}, identification, {
        hooks: hooks,
        getDecorated: getDecorated,
        getOriginal: getOriginal,
        storyFn: storyFn,
        parameters: parameters
      }); // Don't store docs-only stories in legacy data because
      // existing clients (at the time?!), e.g. storyshots/chromatic
      // are not necessarily equipped to process them

      if (!isStoryDocsOnly(parameters)) {
        this.addLegacyStory({
          kind: kind,
          name: name,
          storyFn: storyFn,
          parameters: parameters
        });
      } // Store 1-based order of kind loading to preserve sorting on HMR


      if (!this._kindOrder[kind]) {
        this._kindOrder[kind] = 1 + Object.keys(this._kindOrder).length;
      } // LET'S SEND IT TO THE MANAGER


      this.pushToManager();
    }
  }, {
    key: "getStoriesForKind",
    // Unlike a bunch of deprecated APIs below, these lookup functions
    // use the `_data` member, which is the new data structure. They should
    // be the preferred way of looking up stories in the future.
    value: function getStoriesForKind(kind) {
      return this.raw().filter(function (story) {
        return story.kind === kind;
      });
    }
  }, {
    key: "getRawStory",
    value: function getRawStory(kind, name) {
      return this.getStoriesForKind(kind).find(function (s) {
        return s.name === name;
      });
    } // OLD apis

  }, {
    key: "getRevision",
    value: function getRevision() {
      return this._revision;
    }
  }, {
    key: "incrementRevision",
    value: function incrementRevision() {
      this._revision += 1;
    }
  }, {
    key: "addLegacyStory",
    value: function addLegacyStory(_ref8) {
      var kind = _ref8.kind,
          name = _ref8.name,
          storyFn = _ref8.storyFn,
          parameters = _ref8.parameters;
      var k = toKey(kind);

      if (!this._legacydata[k]) {
        this._legacydata[k] = {
          kind: kind,
          fileName: parameters.fileName,
          index: getId(),
          stories: {}
        };
      }

      this._legacydata[k].stories[toKey(name)] = {
        name: name,
        // kind,
        index: getId(),
        story: storyFn,
        parameters: parameters
      };
    }
  }, {
    key: "getStoryKinds",
    value: function getStoryKinds() {
      return Object.values(this._legacydata).filter(function (kind) {
        return Object.keys(kind.stories).length > 0;
      }).sort(function (info1, info2) {
        return info1.index - info2.index;
      }).map(function (info) {
        return info.kind;
      });
    }
  }, {
    key: "getStories",
    value: function getStories(kind) {
      var _this5 = this;

      var key = toKey(kind);

      if (!this._legacydata[key]) {
        return [];
      }

      return Object.keys(this._legacydata[key].stories).map(function (name) {
        return _this5._legacydata[key].stories[name];
      }).sort(function (info1, info2) {
        return info1.index - info2.index;
      }).map(function (info) {
        return info.name;
      });
    }
  }, {
    key: "getStoryFileName",
    value: function getStoryFileName(kind) {
      var key = toKey(kind);
      var storiesKind = this._legacydata[key];

      if (!storiesKind) {
        return null;
      }

      return storiesKind.fileName;
    }
  }, {
    key: "getStoryAndParameters",
    value: function getStoryAndParameters(kind, name) {
      if (!kind || !name) {
        return null;
      }

      var storiesKind = this._legacydata[toKey(kind)];

      if (!storiesKind) {
        return null;
      }

      var storyInfo = storiesKind.stories[toKey(name)];

      if (!storyInfo) {
        return null;
      }

      var story = storyInfo.story,
          parameters = storyInfo.parameters;
      return {
        story: story,
        parameters: parameters
      };
    }
  }, {
    key: "getStory",
    value: function getStory(kind, name) {
      var data = this.getStoryAndParameters(kind, name);
      return data && data.story;
    }
  }, {
    key: "getStoryWithContext",
    value: function getStoryWithContext(kind, name) {
      var data = this.getStoryAndParameters(kind, name);

      if (!data) {
        return null;
      }

      var story = data.story;
      return story;
    }
  }, {
    key: "removeStoryKind",
    value: function removeStoryKind(kind) {
      if (this.hasStoryKind(kind)) {
        this._legacydata[toKey(kind)].stories = {};
        this.cleanHooksForKind(kind);
        this._data = Object.entries(this._data).reduce(function (acc, _ref9) {
          var _ref10 = _slicedToArray(_ref9, 2),
              id = _ref10[0],
              story = _ref10[1];

          if (story.kind !== kind) {
            Object.assign(acc, _defineProperty({}, id, story));
          }

          return acc;
        }, {});
        this.pushToManager();
      }
    }
  }, {
    key: "hasStoryKind",
    value: function hasStoryKind(kind) {
      return Boolean(this._legacydata[toKey(kind)]);
    }
  }, {
    key: "hasStory",
    value: function hasStory(kind, name) {
      return Boolean(this.getStory(kind, name));
    }
  }, {
    key: "dumpStoryBook",
    value: function dumpStoryBook() {
      var _this6 = this;

      var data = this.getStoryKinds().map(function (kind) {
        return {
          kind: kind,
          stories: _this6.getStories(kind)
        };
      });
      return data;
    }
  }, {
    key: "size",
    value: function size() {
      return Object.keys(this._legacydata).length;
    }
  }, {
    key: "clean",
    value: function clean() {
      var _this7 = this;

      this.getStoryKinds().forEach(function (kind) {
        return delete _this7._legacydata[toKey(kind)];
      });
    }
  }, {
    key: "cleanHooks",
    value: function cleanHooks(id) {
      if (this._data[id]) {
        this._data[id].hooks.clean();
      }
    }
  }, {
    key: "cleanHooksForKind",
    value: function cleanHooksForKind(kind) {
      var _this8 = this;

      this.getStoriesForKind(kind).map(function (story) {
        return _this8.cleanHooks(story.id);
      });
    }
  }]);

  return StoryStore;
}(_eventemitter["default"]);

exports["default"] = StoryStore;
});

unwrapExports(story_store);

var config_api = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _coreEvents = _interopRequireDefault(dist$3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ConfigApi =
/*#__PURE__*/
function () {
  function ConfigApi(_ref) {
    var _this = this;

    var channel = _ref.channel,
        storyStore = _ref.storyStore,
        clientApi = _ref.clientApi,
        clearDecorators = _ref.clearDecorators;

    _classCallCheck(this, ConfigApi);

    this._channel = void 0;
    this._storyStore = void 0;
    this._clearDecorators = void 0;
    this.clientApi = void 0;

    this.configure = function (loaders, module) {
      var render = function render() {
        var errors = [];

        try {
          if (loaders) {
            loaders();
          }
        } catch (e) {
          errors.push(e);
        }

        if (!errors.length) {
          try {
            _this._renderMain();
          } catch (e) {
            errors.push(e);
          }
        }

        if (errors.length) {
          _this._storyStore.setSelection(undefined, errors[0]);

          throw errors[0];
        } else {
          _this._storyStore.setSelection(undefined, null);
        }
      };

      if (module.hot) {
        module.hot.accept(); // @ts-ignore

        if (!module._StorybookPreserveDecorators) {
          module.hot.dispose(function () {
            _this._clearDecorators();
          });
        }
      }

      if (_this._channel) {
        // in Browser
        render(); // Send a signal to the manager that configure() is done. We do this in a timeout
        // because the story_store sends stories in a debounced function, which results in
        // as setTimeout. We want to ensure this happens after, to avoid a FOUC.

        setTimeout(function () {
          return _this._channel.emit(_coreEvents["default"].STORIES_CONFIGURED);
        }, 0);
      } else {
        // in NodeJS
        loaders();
      }
    };

    // channel can be null when running in node
    // always check whether channel is available
    this._channel = channel;
    this._storyStore = storyStore;
    this._clearDecorators = clearDecorators;
    this.clientApi = clientApi;
  }

  _createClass(ConfigApi, [{
    key: "_renderMain",
    value: function _renderMain() {
      // do initial render of story
      this._storyStore.emit(_coreEvents["default"].STORY_INIT);
    }
  }, {
    key: "_renderError",
    value: function _renderError(err) {
      var stack = err.stack,
          message = err.message;
      var error = {
        stack: stack,
        message: message
      };

      this._storyStore.setSelection(undefined, error);
    }
  }]);

  return ConfigApi;
}();

exports["default"] = ConfigApi;
});

unwrapExports(config_api);

var pathToId_1 = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = pathToId;

function pathToId(path) {
  var match = (path || '').match(/^\/story\/(.+)/);

  if (!match) {
    throw new Error("Invalid path '".concat(path, "',  must start with '/story/'"));
  }

  return match[1];
}
});

unwrapExports(pathToId_1);

// `SameValue` abstract operation
// https://tc39.github.io/ecma262/#sec-samevalue
var sameValue = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

// @@search logic
fixRegexpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative(nativeSearch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regexpExecAbstract(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

var has$2 = Object.prototype.hasOwnProperty;
var isArray$1 = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray$1(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    /* eslint no-param-reassign: 0 */
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray$1(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has$2.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray$1(target) && !isArray$1(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray$1(target) && isArray$1(source)) {
        source.forEach(function (item, i) {
            if (has$2.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has$2.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = str;
    if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str);
    } else if (typeof str !== 'string') {
        string = String(str);
    }

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

var maybeMap = function maybeMap(val, fn) {
    if (isArray$1(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
            mapped.push(fn(val[i]));
        }
        return mapped;
    }
    return fn(val);
};

var utils = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    maybeMap: maybeMap,
    merge: merge
};

var replace = String.prototype.replace;
var percentTwenties = /%20/g;



var Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

var formats = utils.assign(
    {
        'default': Format.RFC3986,
        formatters: {
            RFC1738: function (value) {
                return replace.call(value, percentTwenties, '+');
            },
            RFC3986: function (value) {
                return String(value);
            }
        }
    },
    Format
);

var has$3 = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var isArray$2 = Array.isArray;
var push$1 = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push$1.apply(arr, isArray$2(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaultFormat = formats['default'];
var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: formats.formatters[defaultFormat],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
    return typeof v === 'string'
        || typeof v === 'number'
        || typeof v === 'boolean'
        || typeof v === 'symbol'
        || typeof v === 'bigint';
};

var stringify = function stringify(
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly,
    charset
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray$2(obj)) {
        obj = utils.maybeMap(obj, function (value) {
            if (value instanceof Date) {
                return serializeDate(value);
            }
            return value;
        }).join(',');
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key') : prefix;
        }

        obj = '';
    }

    if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key');
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value'))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (isArray$2(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        var value = obj[key];

        if (skipNulls && value === null) {
            continue;
        }

        var keyPrefix = isArray$2(obj)
            ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix
            : prefix + (allowDots ? '.' + key : '[' + key + ']');

        pushToArray(values, stringify(
            value,
            keyPrefix,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly,
            charset
        ));
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has$3.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray$2(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

var stringify_1 = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray$2(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.formatter,
            options.encodeValuesOnly,
            options.charset
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};

var has$4 = Object.prototype.hasOwnProperty;
var isArray$3 = Array.isArray;

var defaults$1 = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

var parseArrayValue = function (val, options) {
    if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
        return val.split(',');
    }

    return val;
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults$1.decoder, charset, 'key');
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults$1.decoder, charset, 'key');
            val = utils.maybeMap(
                parseArrayValue(part.slice(pos + 1), options),
                function (encodedVal) {
                    return options.decoder(encodedVal, defaults$1.decoder, charset, 'value');
                }
            );
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (part.indexOf('[]=') > -1) {
            val = isArray$3(val) ? [val] : val;
        }

        if (has$4.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options, valuesParsed) {
    var leaf = valuesParsed ? val : parseArrayValue(val, options);

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj; // eslint-disable-line no-param-reassign
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = options.depth > 0 && brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has$4.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has$4.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options, valuesParsed);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults$1;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults$1.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults$1.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults$1.allowPrototypes,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults$1.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$1.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults$1.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults$1.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults$1.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults$1.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults$1.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults$1.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults$1.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$1.strictNullHandling
    };
};

var parse = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};

var lib = {
    formats: formats,
    parse: parse,
    stringify: stringify_1
};

var queryparams = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueryParam = exports.getQueryParams = void 0;



var _qs = _interopRequireDefault(lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getQueryParams = function getQueryParams() {
  // document.location is not defined in react-native
  if (window_1.document && window_1.document.location && window_1.document.location.search) {
    return _qs["default"].parse(window_1.document.location.search, {
      ignoreQueryPrefix: true
    });
  }

  return {};
};

exports.getQueryParams = getQueryParams;

var getQueryParam = function getQueryParam(key) {
  var params = getQueryParams();
  return params[key];
};

exports.getQueryParam = getQueryParam;
});

unwrapExports(queryparams);

var dist$6 = createCommonjsModule(function (module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ClientApi: true,
  defaultDecorateStory: true,
  addDecorator: true,
  addParameters: true,
  StoryStore: true,
  ConfigApi: true,
  subscriptionsStore: true,
  pathToId: true,
  getQueryParams: true,
  getQueryParam: true
};
Object.defineProperty(exports, "ClientApi", {
  enumerable: true,
  get: function get() {
    return _client_api["default"];
  }
});
Object.defineProperty(exports, "defaultDecorateStory", {
  enumerable: true,
  get: function get() {
    return _client_api.defaultDecorateStory;
  }
});
Object.defineProperty(exports, "addDecorator", {
  enumerable: true,
  get: function get() {
    return _client_api.addDecorator;
  }
});
Object.defineProperty(exports, "addParameters", {
  enumerable: true,
  get: function get() {
    return _client_api.addParameters;
  }
});
Object.defineProperty(exports, "StoryStore", {
  enumerable: true,
  get: function get() {
    return _story_store["default"];
  }
});
Object.defineProperty(exports, "ConfigApi", {
  enumerable: true,
  get: function get() {
    return _config_api["default"];
  }
});
Object.defineProperty(exports, "subscriptionsStore", {
  enumerable: true,
  get: function get() {
    return _subscriptions_store["default"];
  }
});
Object.defineProperty(exports, "pathToId", {
  enumerable: true,
  get: function get() {
    return _pathToId["default"];
  }
});
Object.defineProperty(exports, "getQueryParams", {
  enumerable: true,
  get: function get() {
    return queryparams.getQueryParams;
  }
});
Object.defineProperty(exports, "getQueryParam", {
  enumerable: true,
  get: function get() {
    return queryparams.getQueryParam;
  }
});

var _client_api = _interopRequireWildcard(client_api);

var _story_store = _interopRequireDefault(story_store);

var _config_api = _interopRequireDefault(config_api);

var _subscriptions_store = _interopRequireDefault(subscriptions_store);

var _pathToId = _interopRequireDefault(pathToId_1);





Object.keys(hooks$1).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return hooks$1[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
});

unwrapExports(dist$6);

var $indexOf = arrayIncludes.indexOf;



var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD$5 = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH$9 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$5 || !USES_TO_LENGTH$9 }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */

/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Module exports.
 * @public
 */

var escapeHtml_1 = escapeHtml;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html;
}

var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH$a = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

var max$3 = Math.max;
var min$3 = Math.min;
var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 || !USES_TO_LENGTH$a }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min$3(max$3(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

var KnobStore_1 = createCommonjsModule(function (module, exports) {

















Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var callArg = function callArg(fn) {
  return fn();
};

var callAll = function callAll(fns) {
  return fns.forEach(callArg);
};

var KnobStore =
/*#__PURE__*/
function () {
  function KnobStore() {
    _classCallCheck(this, KnobStore);

    this.store = {};
    this.callbacks = [];
    this.timer = void 0;
  }

  _createClass(KnobStore, [{
    key: "has",
    value: function has(key) {
      return this.store[key] !== undefined;
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this.store[key] = Object.assign({}, value, {
        used: true,
        groupId: value.groupId
      }); // debounce the execution of the callbacks for 50 milliseconds

      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(callAll, 50, this.callbacks);
    }
  }, {
    key: "update",
    value: function update(key, options) {
      this.store[key] = Object.assign({}, this.store[key], {}, options);
    }
  }, {
    key: "get",
    value: function get(key) {
      var knob = this.store[key];

      if (knob) {
        knob.used = true;
      }

      return knob;
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this.store;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.store = {};
    }
  }, {
    key: "markAllUnused",
    value: function markAllUnused() {
      var _this = this;

      Object.keys(this.store).forEach(function (knobName) {
        _this.store[knobName].used = false;
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe(cb) {
      this.callbacks.push(cb);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(cb) {
      var index = this.callbacks.indexOf(cb);
      this.callbacks.splice(index, 1);
    }
  }]);

  return KnobStore;
}();

exports["default"] = KnobStore;
});

unwrapExports(KnobStore_1);

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod$5 = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod$5(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod$5(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod$5(3)
};

var trim = stringTrim.trim;


var $parseFloat = global_1.parseFloat;
var FORCED$4 = 1 / $parseFloat(whitespaces + '-0') !== -Infinity;

// `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string
var numberParseFloat = FORCED$4 ? function parseFloat(string) {
  var trimmedString = trim(String(string));
  var result = $parseFloat(trimmedString);
  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

// `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string
_export({ global: true, forced: parseFloat != numberParseFloat }, {
  parseFloat: numberParseFloat
});

var arrayPush = [].push;
var min$4 = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegexp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = min$4(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SUPPORTS_Y);

var converters_1 = createCommonjsModule(function (module, exports) {











Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deserializers = exports.serializers = exports.converters = void 0;

var unconvertable = function unconvertable() {
  return undefined;
};

var converters = {
  jsonParse: function jsonParse(value) {
    return JSON.parse(value);
  },
  jsonStringify: function jsonStringify(value) {
    return JSON.stringify(value);
  },
  simple: function simple(value) {
    return value;
  },
  stringifyIfSet: function stringifyIfSet(value) {
    return value === null || value === undefined ? '' : String(value);
  },
  stringifyIfTruthy: function stringifyIfTruthy(value) {
    return value ? String(value) : null;
  },
  toArray: function toArray(value) {
    if (Array.isArray(value)) {
      return value;
    }

    return value.split(',');
  },
  toBoolean: function toBoolean(value) {
    return value === 'true';
  },
  toDate: function toDate(value) {
    return new Date(value).getTime() || new Date().getTime();
  },
  toFloat: function toFloat(value) {
    return value === '' ? null : parseFloat(value);
  }
};
exports.converters = converters;
var serializers = {
  array: converters.simple,
  "boolean": converters.stringifyIfTruthy,
  button: unconvertable,
  checkbox: converters.simple,
  color: converters.simple,
  date: converters.toDate,
  files: unconvertable,
  number: converters.stringifyIfSet,
  object: converters.jsonStringify,
  options: converters.simple,
  radios: converters.simple,
  select: converters.simple,
  text: converters.simple
};
exports.serializers = serializers;
var deserializers = {
  array: converters.toArray,
  "boolean": converters.toBoolean,
  button: unconvertable,
  checkbox: converters.simple,
  color: converters.simple,
  date: converters.toDate,
  files: unconvertable,
  number: converters.toFloat,
  object: converters.jsonParse,
  options: converters.simple,
  radios: converters.simple,
  select: converters.simple,
  text: converters.simple
};
exports.deserializers = deserializers;
});

unwrapExports(converters_1);

var KnobManager_1 = createCommonjsModule(function (module, exports) {

















































Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;



var _escapeHtml = _interopRequireDefault(escapeHtml_1);



var _KnobStore = _interopRequireDefault(KnobStore_1);





function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var knobValuesFromUrl = Object.entries((0, dist$6.getQueryParams)()).reduce(function (acc, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      k = _ref2[0],
      v = _ref2[1];

  if (k.includes('knob-')) {
    return Object.assign({}, acc, _defineProperty({}, k.replace('knob-', ''), v));
  }

  return acc;
}, {}); // This is used by _mayCallChannel to determine how long to wait to before triggering a panel update

var PANEL_UPDATE_INTERVAL = 400;

function escapeStrings(obj) {
  if (typeof obj === 'string') {
    return (0, _escapeHtml["default"])(obj);
  }

  if (obj == null || _typeof(obj) !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    var newArray = obj.map(escapeStrings);
    var didChange = newArray.some(function (newValue, key) {
      return newValue !== obj[key];
    });
    return didChange ? newArray : obj;
  }

  return Object.entries(obj).reduce(function (acc, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        oldValue = _ref4[1];

    var newValue = escapeStrings(oldValue);
    return newValue === oldValue ? acc : Object.assign({}, acc, _defineProperty({}, key, newValue));
  }, obj);
}

var KnobManager =
/*#__PURE__*/
function () {
  function KnobManager() {
    _classCallCheck(this, KnobManager);

    this.knobStore = new _KnobStore["default"]();
    this.channel = void 0;
    this.options = {};
    this.calling = false;
  }

  _createClass(KnobManager, [{
    key: "setChannel",
    value: function setChannel(channel) {
      this.channel = channel;
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      this.options = options;
    }
  }, {
    key: "getKnobValue",
    value: function getKnobValue(_ref5) {
      var value = _ref5.value;
      return this.options.escapeHTML ? escapeStrings(value) : value;
    }
  }, {
    key: "knob",
    value: function knob(name, options) {
      this._mayCallChannel();

      var knobName = options.groupId ? "".concat(name, "_").concat(options.groupId) : name;
      var knobStore = this.knobStore;
      var existingKnob = knobStore.get(knobName); // We need to return the value set by the knob editor via this.
      // Normally the knobs are reset and so re-use is safe as long as the types match
      // when in storyshots, though the change event isn't called and so the knobs aren't reset, making this code fail
      // so always create a new knob when in storyshots

      if (existingKnob && options.type === existingKnob.type && window_1.navigator && ( // userAgent is not set in react-native
      !window_1.navigator.userAgent || !window_1.navigator.userAgent.includes('jsdom'))) {
        var restOptions = _objectWithoutProperties(options, ["value"]);

        knobStore.update(knobName, restOptions);
        return this.getKnobValue(existingKnob);
      }

      var knobInfo = Object.assign({}, options, {
        name: knobName,
        label: name
      });

      if (knobValuesFromUrl[knobName]) {
        var _value = converters_1.deserializers[options.type](knobValuesFromUrl[knobName]);

        knobInfo.defaultValue = _value;
        knobInfo.value = _value;
        delete knobValuesFromUrl[knobName];
      } else {
        knobInfo.defaultValue = options.value;
      }

      knobStore.set(knobName, knobInfo);
      return this.getKnobValue(knobStore.get(knobName));
    }
  }, {
    key: "_mayCallChannel",
    value: function _mayCallChannel() {
      var _this = this;

      // Re rendering of the story may cause changes to the knobStore. Some new knobs maybe added and
      // Some knobs may go unused. So we need to update the panel accordingly. For example remove the
      // unused knobs from the panel. This function sends the `setKnobs` message to the channel
      // triggering a panel re-render.
      if (!this.channel) {
        // to prevent call to undefined channel and therefore throwing TypeError
        return;
      }

      if (this.calling) {
        // If a call to channel has already registered ignore this call.
        // Once the previous call is completed all the changes to knobStore including the one that
        // triggered this, will be added to the panel.
        // This avoids emitting to the channel within very short periods of time.
        return;
      }

      this.calling = true;
      var timestamp = +new Date();
      setTimeout(function () {
        _this.calling = false; // emit to the channel and trigger a panel re-render

        if (_this.channel) _this.channel.emit(shared$1.SET, {
          knobs: _this.knobStore.getAll(),
          timestamp: timestamp
        });
      }, PANEL_UPDATE_INTERVAL);
    }
  }]);

  return KnobManager;
}();

exports["default"] = KnobManager;
});

unwrapExports(KnobManager_1);

var registerKnobs_1 = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerKnobs = registerKnobs;
exports.manager = void 0;

var _addons = _interopRequireDefault(public_api);





var _debounce = _interopRequireDefault(debounce);

var _KnobManager = _interopRequireDefault(KnobManager_1);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var manager = new _KnobManager["default"]();
exports.manager = manager;
var knobStore = manager.knobStore;
var COMPONENT_FORCE_RENDER_DEBOUNCE_DELAY_MS = 325;

function forceReRender() {
  _addons["default"].getChannel().emit(dist$3.FORCE_RE_RENDER);
}

function setPaneKnobs() {
  var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : +new Date();

  var channel = _addons["default"].getChannel();

  channel.emit(shared$1.SET, {
    knobs: knobStore.getAll(),
    timestamp: timestamp
  });
}

var resetAndForceUpdate = function resetAndForceUpdate() {
  knobStore.markAllUnused();
  forceReRender();
}; // Increase performance by reducing how frequently the story is recreated during knob changes


var debouncedResetAndForceUpdate = (0, _debounce["default"])(resetAndForceUpdate, COMPONENT_FORCE_RENDER_DEBOUNCE_DELAY_MS);

function knobChanged(change) {
  var name = change.name;
  var value = change.value; // Update the related knob and it's value.

  var knobOptions = knobStore.get(name);
  knobOptions.value = value;

  if (!manager.options.disableDebounce) {
    debouncedResetAndForceUpdate();
  } else {
    resetAndForceUpdate();
  }
}

function knobClicked(clicked) {
  var knobOptions = knobStore.get(clicked.name);

  if (knobOptions.callback && knobOptions.callback() !== false) {
    forceReRender();
  }
}

function resetKnobs() {
  knobStore.reset();
  setPaneKnobs(false);
}

function resetKnobsAndForceReRender() {
  knobStore.reset();
  forceReRender();
  setPaneKnobs(false);
}

function disconnectCallbacks() {
  var channel = _addons["default"].getChannel();

  channel.removeListener(shared$1.CHANGE, knobChanged);
  channel.removeListener(shared$1.CLICK, knobClicked);
  channel.removeListener(dist$3.STORY_CHANGED, resetKnobs);
  channel.removeListener(shared$1.RESET, resetKnobsAndForceReRender);
  knobStore.unsubscribe(setPaneKnobs);
}

function connectCallbacks() {
  var channel = _addons["default"].getChannel();

  channel.on(shared$1.CHANGE, knobChanged);
  channel.on(shared$1.CLICK, knobClicked);
  channel.on(dist$3.STORY_CHANGED, resetKnobs);
  channel.on(shared$1.RESET, resetKnobsAndForceReRender);
  knobStore.subscribe(setPaneKnobs);
  return disconnectCallbacks;
}

function registerKnobs() {
  (0, dist$6.useEffect)(connectCallbacks, []);
}
});

unwrapExports(registerKnobs_1);

var dist$7 = createCommonjsModule(function (module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }





Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  knob: true,
  text: true,
  "boolean": true,
  number: true,
  color: true,
  object: true,
  select: true,
  radios: true,
  array: true,
  date: true,
  button: true,
  files: true,
  optionsKnob: true,
  withKnobs: true
};
exports.knob = knob;
exports.text = text;
exports["boolean"] = _boolean;
exports.number = number;
exports.color = color;
exports.object = object;
exports.select = select;
exports.radios = radios;
exports.array = array;
exports.date = date;
exports.button = button;
exports.files = files;
exports.optionsKnob = optionsKnob;
exports.withKnobs = void 0;

var _addons = _interopRequireWildcard(public_api);



Object.keys(shared$1).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return shared$1[key];
    }
  });
});



function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function knob(name, options) {
  return registerKnobs_1.manager.knob(name, options);
}

function text(name, value, groupId) {
  return registerKnobs_1.manager.knob(name, {
    type: 'text',
    value: value,
    groupId: groupId
  });
}

function _boolean(name, value, groupId) {
  return registerKnobs_1.manager.knob(name, {
    type: 'boolean',
    value: value,
    groupId: groupId
  });
}

function number(name, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var groupId = arguments.length > 3 ? arguments[3] : undefined;
  var rangeDefaults = {
    min: 0,
    max: 10,
    step: 1
  };
  var mergedOptions = options.range ? Object.assign({}, rangeDefaults, {}, options) : options;
  var finalOptions = Object.assign({
    type: 'number'
  }, mergedOptions, {
    value: value,
    groupId: groupId
  });
  return registerKnobs_1.manager.knob(name, finalOptions);
}

function color(name, value, groupId) {
  return registerKnobs_1.manager.knob(name, {
    type: 'color',
    value: value,
    groupId: groupId
  });
}

function object(name, value, groupId) {
  return registerKnobs_1.manager.knob(name, {
    type: 'object',
    value: value,
    groupId: groupId
  });
}

function select(name, options, value, groupId) {
  return registerKnobs_1.manager.knob(name, {
    type: 'select',
    selectV2: true,
    options: options,
    value: value,
    groupId: groupId
  });
}

function radios(name, options, value, groupId) {
  return registerKnobs_1.manager.knob(name, {
    type: 'radios',
    options: options,
    value: value,
    groupId: groupId
  });
}

function array(name, value) {
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';
  var groupId = arguments.length > 3 ? arguments[3] : undefined;
  return registerKnobs_1.manager.knob(name, {
    type: 'array',
    value: value,
    separator: separator,
    groupId: groupId
  });
}

function date(name) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var groupId = arguments.length > 2 ? arguments[2] : undefined;
  var proxyValue = value ? value.getTime() : new Date().getTime();
  return registerKnobs_1.manager.knob(name, {
    type: 'date',
    value: proxyValue,
    groupId: groupId
  });
}

function button(name, callback, groupId) {
  return registerKnobs_1.manager.knob(name, {
    type: 'button',
    callback: callback,
    hideLabel: true,
    groupId: groupId
  });
}

function files(name, accept) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var groupId = arguments.length > 3 ? arguments[3] : undefined;
  return registerKnobs_1.manager.knob(name, {
    type: 'files',
    accept: accept,
    value: value,
    groupId: groupId
  });
}

function optionsKnob(name, valuesObj, value, optionsObj, groupId) {
  return registerKnobs_1.manager.knob(name, {
    type: 'options',
    options: valuesObj,
    value: value,
    optionsObj: optionsObj,
    groupId: groupId
  });
}

var defaultOptions = {
  escapeHTML: true
};
var withKnobs = (0, _addons.makeDecorator)({
  name: 'withKnobs',
  parameterName: 'knobs',
  skipIfNoParametersOrOptions: false,
  allowDeprecatedUsage: true,
  wrapper: function wrapper(getStory, context, _ref) {
    var options = _ref.options,
        parameters = _ref.parameters;
    var storyOptions = parameters || options;
    var allOptions = Object.assign({}, defaultOptions, {}, storyOptions);

    var channel = _addons["default"].getChannel();

    registerKnobs_1.manager.setChannel(channel);

    registerKnobs_1.manager.setOptions(allOptions);

    channel.emit(shared$1.SET_OPTIONS, allOptions);
    (0, registerKnobs_1.registerKnobs)();
    return getStory(context);
  }
});
exports.withKnobs = withKnobs;

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
});

unwrapExports(dist$7);
var dist_5 = dist$7.object;

const defaultSettings = [{
  value: 0,
  label: 'Surface'
}, {
  value: 1,
  label: '100m 330 ft'
}, {
  value: 2,
  label: '400hPa'
}, {
  value: 3,
  label: '500hPa'
}, {
  value: 4,
  label: '600hPa'
}, {
  value: 5,
  label: '700hPa'
}, {
  value: 6,
  label: '800hPa'
}, {
  value: 7,
  label: '850hPa'
}, {
  value: 8,
  label: '900hPa'
}, {
  value: 9,
  label: '925hPa'
}, {
  value: 10,
  label: '950hPa'
}];
const VerticalSlider = () => {
  return /*#__PURE__*/React.createElement(MuiThemeProvider, {
    theme: theme$1
  }, /*#__PURE__*/React.createElement(DiscreteSlider$1, {
    options: dist_5('Settings', defaultSettings),
    orientation: "vertical"
  }));
};

const drawerWidth$2 = 300;
const xlDrawerWidth$2 = 350;
const useStyles$k = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  contentClass: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginLeft: drawerWidth$2
  },
  '@media (max-width: 767px)': {
    contentClass: {
      marginLeft: 0
    }
  },
  '@media (min-width: 1459px)': {
    contentClass: {
      marginLeft: xlDrawerWidth$2
    }
  }
}));
const ShyftWxStatic = ({
  index,
  forecast,
  level,
  product,
  region,
  run,
  onForecastSelect,
  onLevelSelect,
  onProductSelect,
  onRegionSelect,
  onRunSelect
}) => {
  const classes = useStyles$k();

  const getSelectedLevel = () => {
    return index.datasets[0].run.levels.filter(lvl => lvl.name === level)[0];
  };

  const getSelectedProduct = () => {
    return getSelectedLevel().products.filter(p => p.name === product)[0];
  };

  const handleProductSelect = product => {
    onLevelSelect(product.level);
    onProductSelect(product.product);
    onForecastSelect(getSelectedProduct().forecasts[0].hour);
  };

  const handleRunSelect = buttonText => {
    console.log(buttonText);
  };

  const compare = (a, b) => {
    const valA = Number(a.hour);
    const valB = Number(b.hour);
    let comparison = 0;

    if (valA > valB) {
      comparison = 1;
    } else if (valA < valB) {
      comparison = -1;
    }

    return comparison;
  };

  const onSliderNavigationNext = () => {
    const forecasts = getSelectedProduct().forecasts;
    forecasts.sort(compare);
    const forecastIndex = forecasts.findIndex(f => f.hour === forecast);

    if (forecastIndex + 1 === forecasts.length) {
      onForecastSelect(forecasts[0].hour);
    } else {
      onForecastSelect(forecasts[forecastIndex + 1].hour);
    }
  };

  const onSliderNavigationBack = () => {
    const forecasts = getSelectedProduct().forecasts;
    forecasts.sort(compare);
    const forecastIndex = forecasts.findIndex(f => f.hour === forecast);

    if (forecastIndex - 1 < 0) {
      onForecastSelect(forecasts[forecasts.length - 1].hour);
    } else {
      onForecastSelect(forecasts[forecastIndex - 1].hour);
    }
  };

  const onSliderNavigation = value => {
    value -= +index.datasets[0].run.name;
    const forecasts = getSelectedProduct().forecasts;
    forecasts.sort(compare);
    const forecastIndex = forecasts.findIndex(f => +f.hour === +value);
    onForecastSelect(forecasts[forecastIndex].hour);
  };

  const onToggleToPlay = isRunning => {
    const forecasts = getSelectedProduct().forecasts;
    forecasts.sort(compare);

    if (!isRunning) {
      onForecastSelect(forecasts[0].hour);
    } else {
      const forecastIndex = forecasts.findIndex(f => f.hour === forecast);

      if (forecast === forecasts[forecasts.length - 1].hour) {
        onForecastSelect(forecasts[0].hour);
      } else {
        onForecastSelect(forecasts[forecastIndex + 1].hour);
      }
    }
  };

  const getValidTime = () => {
    const validTime = moment.unix(+index.datasets[0].run.name + +forecast).utc().format('MM/DD HH:mm[Z]');
    return validTime;
  };

  const generateContent = () => {
    const selectedProduct = getSelectedProduct();
    const levelProductVals = index.datasets[0].run.levels.map((lvl, index) => {
      return {
        name: lvl.name,
        open: index === 0,
        products: lvl.products
      };
    });
    const sliderVals = selectedProduct.forecasts.map(f => {
      return {
        value: +f.hour + +index.datasets[0].run.name,
        label: moment.unix(+f.hour + +index.datasets[0].run.name).utc().format('MM/DD HH:mm[Z]')
      };
    });
    const activeForecastLayer = selectedProduct.forecasts.filter(f => f.hour === forecast)[0].image;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Grid, {
      container: true
    }, /*#__PURE__*/React.createElement(SideMenu, {
      "data-cy": "product-selector",
      categories: levelProductVals,
      action: handleProductSelect,
      options: [index.datasets[0].dataset]
    })), /*#__PURE__*/React.createElement("main", {
      className: classes.contentClass
    }, /*#__PURE__*/React.createElement(Hidden, {
      smUp: true
    }, /*#__PURE__*/React.createElement("div", {
      className: classes.toolbar
    })), /*#__PURE__*/React.createElement(Grid, {
      container: true,
      justify: "space-between",
      spacing: 1
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: true,
      md: true
    }, /*#__PURE__*/React.createElement(RegionSelector, {
      "data-cy": "region-selector",
      options: [index.datasets[0].region.name],
      action: () => {}
    })), /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: true,
      sm: true,
      md: true
    }, /*#__PURE__*/React.createElement(RunsSelector, {
      "data-cy": "runs-selector",
      options: [+index.datasets[0].run.name],
      action: handleRunSelect
    })), /*#__PURE__*/React.createElement(Hidden, {
      xsDown: true
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: 12,
      md: true
    }, /*#__PURE__*/React.createElement(ValidTime, {
      time: getValidTime()
    }))), /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: 1
    })), /*#__PURE__*/React.createElement(Grid, {
      container: true,
      direction: "column",
      spacing: 1
    }, /*#__PURE__*/React.createElement(Grid, {
      container: true,
      direction: "row"
    }, /*#__PURE__*/React.createElement(Grid, {
      container: true,
      justify: "center",
      item: true,
      xs: 11,
      style: {
        backgroundColor: 'white'
      }
    }, /*#__PURE__*/React.createElement(ImageViewer, {
      image: activeForecastLayer
    })), /*#__PURE__*/React.createElement(Grid, {
      container: true,
      item: true,
      xs: 1,
      alignItems: "flex-end"
    }, /*#__PURE__*/React.createElement(VerticalSlider, null))), /*#__PURE__*/React.createElement(Grid, {
      container: true,
      item: true,
      justify: "center",
      alignItems: "center"
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true,
      md: 3,
      sm: 5,
      xs: 5
    }, /*#__PURE__*/React.createElement(TimeControl, {
      "data-cy": "time-control",
      onBack: onSliderNavigationBack,
      onNext: onSliderNavigationNext,
      onToggle: onToggleToPlay
    })), /*#__PURE__*/React.createElement(Grid, {
      item: true,
      md: 8,
      sm: 10,
      xs: 12
    }, /*#__PURE__*/React.createElement(DiscreteSlider, {
      "data-cy": "slider",
      options: sliderVals,
      selected: +forecast + +index.datasets[0].run.name,
      action: onSliderNavigation
    })), /*#__PURE__*/React.createElement(Grid, {
      item: true,
      sm: 1
    })), /*#__PURE__*/React.createElement(Hidden, {
      smUp: true
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: 12
    }, /*#__PURE__*/React.createElement(ValidTime, {
      time: getValidTime()
    }))))));
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, generateContent());
};

const ShyftWx = props => {
  const {
    dataset,
    url,
    customer,
    themeOverride,
    dynamicFeatures
  } = props;
  const [status, setStatus] = React.useState(AppStatus.Okay);
  const [loading, setLoading] = React.useState(true);
  const [index, setIndex] = React.useState({
    datasets: []
  });
  const [selectedProduct, setSelectedProduct] = React.useState('');
  const [selectedLevel, setSelectedLevel] = React.useState('');
  const [selectedForecast, setSelectedForecast] = React.useState('');
  const [selectedRegion, setSelectedRegion] = React.useState('');
  const [selectedRun, setSelectedRun] = React.useState('');
  const isDynamic = React.useRef(false);

  if (dynamicFeatures && dynamicFeatures.length !== 0) {
    isDynamic.current = true;
  }

  const urlParams = React.useRef(new URLSearchParams(window.location.search));
  const customerId = React.useRef(customer || urlParams.current.get('customer') || '');
  const datasetId = React.useRef(dataset || urlParams.current.get('model') || '');
  React.useEffect(() => {
    loadAsync();
  }, []);

  const loadAsync = async () => {
    setLoading(true);
    const appStatus = await validateAppAsync(url, customerId.current, datasetId.current);

    if (appStatus !== AppStatus.Okay) {
      setStatus(appStatus);
      setLoading(false);
      return;
    }

    const indexData = await getIndexAsync(url, customerId.current, datasetId.current);

    if (!indexData || indexData.datasets.length === 0) {
      setStatus(AppStatus.NoData);
      setLoading(false);
      return;
    }

    const arr = {
      datasets: []
    };

    for (let i = 0; i < indexData.datasets.length; i++) {
      const dataset = indexData.datasets[i];
      const datasetRegionRun = {
        dataset: dataset.name,
        region: dataset.region,
        run: {
          name: dataset.run,
          levels: []
        }
      };
      const runRegionData = await getProductDataAsync(url, customerId.current, datasetId.current, dataset.region.name, dataset.run);
      const items = runRegionData.items;
      let uniqueLevels = [];
      uniqueLevels = items.map(i => i.level).filter((v, i, a) => a.indexOf(v) === i).map(l => {
        return {
          name: l,
          products: []
        };
      });
      uniqueLevels.forEach(lvl => {
        lvl.products = items.filter(item => item.level === lvl.name).map(i => i.product).filter((v, i, a) => a.indexOf(v) === i).map(product => {
          return {
            name: product,
            forecasts: []
          };
        });
      });
      uniqueLevels.forEach(lvl => {
        lvl.products.forEach(product => {
          product.forecasts = items.filter(item => item.level === lvl.name && item.product === product.name).map(item => {
            return {
              hour: item.forecast,
              image: item.url
            };
          });
        });
      });
      datasetRegionRun.run.levels = uniqueLevels;
      const indexes = {
        datasets: [datasetRegionRun]
      };
      arr.datasets.push(datasetRegionRun);

      if (i === 0) {
        setSelectedLevel(indexes.datasets[0].run.levels[0].name);
        setSelectedProduct(indexes.datasets[0].run.levels[0].products[0].name);
        setSelectedForecast(indexes.datasets[0].run.levels[0].products[0].forecasts[0].hour);
      }
    }

    setIndex(arr);
    setLoading(false);
  };

  const handleStatusChange = newStatus => {
    setStatus(newStatus);
  };

  const generateContent = () => {
    if (status !== AppStatus.Okay) {
      return /*#__PURE__*/React.createElement(LandingPage, {
        url: url,
        customerId: customerId.current,
        datasetId: datasetId.current,
        appStatus: status,
        onStatusChange: handleStatusChange
      });
    }

    if (loading) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          paddingTop: '50vh'
        }
      }, /*#__PURE__*/React.createElement(CircularProgress, null));
    }

    if (isDynamic.current && dynamicFeatures) {
      return /*#__PURE__*/React.createElement(ShyftWxDynamic, {
        dynamicFeatures: dynamicFeatures,
        index: index,
        forecast: selectedForecast,
        level: selectedLevel,
        product: selectedProduct,
        region: selectedRegion,
        run: selectedRun,
        onForecastSelect: setSelectedForecast,
        onLevelSelect: setSelectedLevel,
        onProductSelect: setSelectedProduct,
        onRegionSelect: setSelectedRegion,
        onRunSelect: setSelectedRun
      });
    } else {
      return /*#__PURE__*/React.createElement(ShyftWxStatic, {
        index: index,
        forecast: selectedForecast,
        level: selectedLevel,
        product: selectedProduct,
        region: selectedRegion,
        run: selectedRun,
        onForecastSelect: setSelectedForecast,
        onLevelSelect: setSelectedLevel,
        onProductSelect: setSelectedProduct,
        onRegionSelect: setSelectedRegion,
        onRunSelect: setSelectedRun
      });
    }
  };

  return /*#__PURE__*/React.createElement(MuiThemeProvider, {
    theme: themeOverride || theme$1
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row",
    justify: "center",
    alignItems: "center",
    spacing: 3
  }, generateContent()));
};

const useStyles$l = makeStyles(theme => ({
  root: {
    height: '40vw',
    width: '100%'
  },
  paddingMiddle: {
    marginLeft: 15,
    marginBottom: 20,
    marginTop: 15
  }
}));
const BaseWxViewer = ({
  layers,
  neBounds,
  swBounds
}) => {
  const classes = useStyles$l();
  const bounds = latLngBounds(swBounds, neBounds);

  const generateLayers = () => {
    const results = [];
    layers && layers.forEach(layer => {
      if (layer.type === 'metar') {
        const metar = layer;
        results.push( /*#__PURE__*/React.createElement(Marker, {
          position: metar.coordinates,
          icon: new Icon({
            iconUrl: 'logo192.png',
            iconSize: [20, 20]
          })
        }, /*#__PURE__*/React.createElement(Popup, null, JSON.stringify(metar))));
      }
    });
    return results;
  };

  return /*#__PURE__*/React.createElement(Map$1, {
    bounds: bounds,
    className: classes.root,
    dragging: false,
    zoomControl: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    keyboard: false,
    touchZoom: false
  }, generateLayers(), /*#__PURE__*/React.createElement(TileLayer, {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "\xA9 <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"
  }));
};

export { BackButton, BaseWxViewer, ForwardButton, GroupedButtons, LandingPage, ModelSelector, ProductMenu, RegionSelector, RunsSelector, ShyftWx, SideMenu, DiscreteSlider as Slider, StartStopButton, TimeControl, index as apis, theme$1 as theme };
//# sourceMappingURL=index.modern.js.map
