import axios from 'axios';
import { makeStyles, ButtonGroup, Button, List, ListItem, ListItemText, Typography, Collapse, ListItemIcon, CssBaseline, AppBar, Toolbar, IconButton, Hidden, Drawer, Divider, createStyles as createStyles$1, Grid, Paper, Fab, createMuiTheme, fade, responsiveFontSizes, MuiThemeProvider, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles as makeStyles$1, createStyles } from '@material-ui/core/styles';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import { makeStyles as makeStyles$2, createStyles as createStyles$2, TextField } from '@material-ui/core/';
import moment from 'moment';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import Button$1 from '@material-ui/core/Button';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { latLngBounds, Icon } from 'leaflet';

var MAPBOX_KEY = 'pk.eyJ1Ijoiam9lMTIzMSIsImEiOiJjanlqMzV5MnAwMXdhM21vZDl4dXFqYmY0In0.02hMgnNRIBws9IM7ZoHsIg';

var MAPBOX_API_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/{SEARCH_TEXT}.json?country=US&access_token=' + MAPBOX_KEY;
var MAPBOX_DIRECTIONS_API_URL = 'https://api.mapbox.com/directions/v5/mapbox/driving-traffic/{COORDS}?geometries=geojson&overview=full&annotations=duration,congestion,speed&access_token=' + MAPBOX_KEY;
var SHYFT_CAR_ROUTE_API_URL = 'https://api.shyftwx.com/v1/product/car_route';
var SHYFT_CAPS_URL = 'https://ogc.shyftwx.com/ogcRestful/layers';
var SHYFT_WCS_ROUTE = 'https://api.shyftwx.com/getwxdata/point';
var getProductUrl = function getProductUrl(baseUrl, customerId, datasetId, region, run) {
  return baseUrl + "/" + customerId + "/" + datasetId + "/products" + (region && run ? "/" + run + "-" + region : '');
};
var getOutputUrl = function getOutputUrl(baseUrl, customerId, datasetId, run) {
  return baseUrl + "/" + customerId + "/" + datasetId + "/outputs" + (run ? "/" + run : '');
};
var getIndexAsync = function getIndexAsync(baseUrl, customerId, datasetId) {
  var url = getProductUrl(baseUrl, customerId, datasetId);
  return fetch(url).then(function (response) {
    return response.json();
  });
};
var getProductDataAsync = function getProductDataAsync(baseUrl, customerId, datasetId, region, run) {
  var url = getProductUrl(baseUrl, customerId, datasetId, region, run);
  return fetch(url).then(function (response) {
    return response.json();
  });
};
var getOutputStatusAsync = function getOutputStatusAsync(baseUrl, customerId, datasetId) {
  var url = getOutputUrl(baseUrl, customerId, datasetId);
  return fetch(url).then(function (response) {
    return response.status !== 200 ? Promise.reject(response) : response.json();
  });
};
var getOutputRunStatusAsync = function getOutputRunStatusAsync(baseUrl, customerId, datasetId, run) {
  var url = getOutputUrl(baseUrl, customerId, datasetId, run);
  return fetch(url).then(function (response) {
    return response.json();
  });
};
function directionsAsync(coords) {
  var stringCoords = '';
  coords.forEach(function (c) {
    stringCoords += c[0] + "," + c[1] + ";";
  });
  stringCoords = stringCoords.slice(0, stringCoords.length - 1);
  var url = MAPBOX_DIRECTIONS_API_URL.replace('{COORDS}', stringCoords);
  return axios.get(url).then(function (response) {
    return response.data;
  });
}
var carRouteAsync = function carRouteAsync(currentRoute, startTime) {
  startTime.setMilliseconds(0);
  startTime.setSeconds(0);
  startTime.setMinutes(0);
  var route = currentRoute.routes[0];
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
  }).then(function (response) {
    return response.data;
  }).then(function (data) {
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

var useStyles = makeStyles(function (theme) {
  return {
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
  };
});
var GroupedButtons = function GroupedButtons(_ref) {
  var _ref$options = _ref.options,
      options = _ref$options === void 0 ? ['1', '2', '3'] : _ref$options,
      action = _ref.action;
  var classes = useStyles();

  var _useState = useState(options[0]),
      selected = _useState[0],
      setSelected = _useState[1];

  var handleClick = function handleClick(option) {
    setSelected(option);
    action(option);
  };

  return /*#__PURE__*/React.createElement(ButtonGroup, {
    className: classes.root
  }, options.map(function (option) {
    return /*#__PURE__*/React.createElement(Button, {
      key: option,
      name: "group-button",
      onClick: function onClick() {
        return handleClick(option);
      },
      className: selected === option ? classes.selectedButton : classes.defaultButton
    }, option);
  }));
};

var useStyles$1 = makeStyles$1(function (theme) {
  return createStyles({
    formControl: {
      boxSizing: 'content-box',
      margin: '28px 14px 28px 14px',
      width: '90%'
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    list: {
      padding: '5px',
      borderRadius: '5px',
      border: '1px solid #e9ecef',
      background: '#e9ecef',
      '& li.Mui-selected': {
        fontWeight: 700,
        borderRadius: '5px',
        borderLeftWidth: '0px'
      },
      '& li.Mui-selected:hover': {
        borderLeftWidth: '0px'
      }
    },
    paper: {
      left: '278px'
    },
    disabled: {
      color: '#212529'
    }
  });
});
var ModelSelector = function ModelSelector(_ref) {
  var options = _ref.options,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? 'Model' : _ref$label,
      action = _ref.action;
  var classes = useStyles$1();

  var _React$useState = React.useState(options[0]),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var handleChange = function handleChange(event) {
    setValue(event.target.value);
    action(event.target.value);
  };

  return /*#__PURE__*/React.createElement(FormControl, {
    variant: "outlined",
    className: classes.formControl
  }, /*#__PURE__*/React.createElement(InputLabel, {
    id: "model-select-input-label"
  }, label), /*#__PURE__*/React.createElement(Select, {
    labelId: "demo-simple-select-outlined-label",
    id: "demo-simple-select-outlined",
    value: value,
    onChange: handleChange,
    disabled: options.length === 1,
    label: label,
    MenuProps: {
      classes: {
        paper: classes.paper,
        list: classes.list
      }
    },
    classes: {
      disabled: classes.disabled
    }
  }, options.map(function (option) {
    return /*#__PURE__*/React.createElement(MenuItem, {
      key: option,
      value: option
    }, option);
  })));
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var useStyles$2 = makeStyles(function (theme) {
  return {
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
  };
});
var ICON_MAP = {
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
var emptyMenu = [{
  name: 'Menu',
  open: true,
  products: [{
    name: 'A'
  }, {
    name: 'B'
  }]
}];
var ProductMenu = function ProductMenu(_ref) {
  var _ref$options = _ref.options,
      options = _ref$options === void 0 ? emptyMenu : _ref$options,
      action = _ref.action,
      sortFn = _ref.sortFn;
  var classes = useStyles$2();

  var _React$useState = React.useState(options[0].name + " " + options[0].products[0].name),
      selectedProduct = _React$useState[0],
      setSelectedProduct = _React$useState[1];

  var _React$useState2 = React.useState(options || []),
      categories = _React$useState2[0],
      setCategories = _React$useState2[1];

  var handleClick = function handleClick(cat) {
    var newCategories = categories.map(function (item) {
      if (item !== cat) {
        return item;
      }

      return _extends({}, item, {
        open: !cat.open
      });
    });
    setCategories(newCategories);
  };

  var handleListItemClick = function handleListItemClick(event, product) {
    setSelectedProduct(product.level + ' ' + product.product);
    action(product);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement("label", {
    className: classes.label
  }, "Products"), categories.sort(sortFn).map(function (cat, index) {
    return /*#__PURE__*/React.createElement(List, {
      key: index,
      style: {
        paddingBottom: '0px'
      }
    }, /*#__PURE__*/React.createElement(ListItem, {
      "data-cy": cat.name,
      button: true,
      onClick: function onClick() {
        return handleClick(cat);
      },
      className: classes.categoryStyle
    }, /*#__PURE__*/React.createElement(ListItemText, {
      primary: /*#__PURE__*/React.createElement(Typography, {
        className: classes.categoryText
      }, cat.name)
    }), cat.open ? /*#__PURE__*/React.createElement(ExpandLess, null) : /*#__PURE__*/React.createElement(ExpandMore, null)), /*#__PURE__*/React.createElement(Collapse, {
      "in": cat.open,
      timeout: "auto",
      unmountOnExit: true
    }, cat.products.map(function (product, index) {
      return /*#__PURE__*/React.createElement(ListItem, {
        "data-cy": cat.name + '-' + product.name,
        key: index,
        button: true,
        className: classes.nested,
        style: index === cat.products.length - 1 ? {
          borderBottom: '1px solid rgba(174, 174, 174, 0.75)'
        } : {},
        selected: selectedProduct === cat.name + ' ' + product.name,
        onClick: function onClick(event) {
          return handleListItemClick(event, {
            level: cat.name,
            product: product.name
          });
        },
        disableRipple: true
      }, ICON_MAP[product.name] !== undefined && /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        className: selectedProduct === cat.name + ' ' + product.name ? classes.selected : classes.icon,
        icon: ICON_MAP[product.name]
      })), /*#__PURE__*/React.createElement(ListItemText, {
        primary: /*#__PURE__*/React.createElement(Typography, {
          className: selectedProduct === cat.name + ' ' + product.name ? classes.selected : classes.text
        }, product.name)
      }));
    })));
  }));
};

var drawerWidth = 300;
var xlDrawerWidth = 350;
var useStyles$3 = makeStyles(function (theme) {
  var _drawer, _appBar, _menuButton, _drawerPaper;

  return {
    root: {
      display: 'flex'
    },
    drawer: (_drawer = {}, _drawer[theme.breakpoints.only('xl')] = {
      width: xlDrawerWidth,
      flexShrink: 0
    }, _drawer[theme.breakpoints.between('sm', 'lg')] = {
      width: drawerWidth,
      flexShrink: 0
    }, _drawer),
    appBar: (_appBar = {}, _appBar[theme.breakpoints.up('sm')] = {
      display: 'none'
    }, _appBar),
    menuButton: (_menuButton = {
      marginRight: theme.spacing(2)
    }, _menuButton[theme.breakpoints.up('sm')] = {
      display: 'none'
    }, _menuButton),
    toolbar: theme.mixins.toolbar,
    drawerPaper: (_drawerPaper = {}, _drawerPaper[theme.breakpoints.only('xl')] = {
      width: xlDrawerWidth
    }, _drawerPaper[theme.breakpoints.down('lg')] = {
      width: drawerWidth
    }, _drawerPaper)
  };
});
var SideMenu = function SideMenu(_ref) {
  var categories = _ref.categories,
      action = _ref.action,
      window = _ref.window,
      options = _ref.options;
  var classes = useStyles$3();

  var _React$useState = React.useState(false),
      mobileOpen = _React$useState[0],
      setMobileOpen = _React$useState[1];

  var _React$useState2 = React.useState(false),
      shouldSort = _React$useState2[0],
      setShouldSort = _React$useState2[1];

  var handleDrawerToggle = function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  };

  var getSortFn = function getSortFn() {
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
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();

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

  var menu = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ModelSelector, {
    options: options,
    action: function action(option) {
      return console.log(option);
    }
  }), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '5px 5% 5px 5px',
      color: shouldSort ? '#329af0' : '#aeaeae'
    }
  }, /*#__PURE__*/React.createElement(SortByAlphaIcon, {
    onClick: function onClick() {
      return setShouldSort(!shouldSort);
    },
    style: {
      fontSize: '16pt'
    }
  })), /*#__PURE__*/React.createElement(ProductMenu, {
    options: categories,
    action: action,
    sortFn: getSortFn()
  }));
  var container = window !== undefined ? function () {
    return window().document.body;
  } : undefined;
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

var useStyles$4 = makeStyles$1(function (theme) {
  var _dropdown;

  return {
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    label: {
      align: 'center'
    },
    dropdown: (_dropdown = {
      backgroundColor: 'white',
      fontSize: '.8em',
      fontWeight: 500
    }, _dropdown[theme.breakpoints.down('sm')] = {
      fontSize: '.7em'
    }, _dropdown.padding = '10px 0px 10px 10px', _dropdown.borderWidth = 2, _dropdown.borderRadius = 8, _dropdown['&:focus'] = {
      background: 'white',
      borderColor: theme.palette.primary
    }, _dropdown),
    items: {
      background: 'white'
    },
    list: {
      paddingTop: 0,
      paddingBottom: 0,
      background: 'white',
      borderLeftWidth: '0px',
      '& li.Mui-selected': {
        fontWeight: 700
      }
    },
    disabled: {
      color: '#212529'
    }
  };
});
var SimpleSelect = function SimpleSelect(_ref) {
  var choices = _ref.choices,
      action = _ref.action,
      label = _ref.label;
  var classes = useStyles$4();

  var _React$useState = React.useState(choices[0]),
      selectedValue = _React$useState[0],
      setSelectedValue = _React$useState[1];

  var handleChange = function handleChange(event) {
    setSelectedValue(event.target.value);
    action(event.target.value);
  };

  var oneChoice = false;

  if (choices.length === 1) {
    oneChoice = true;
  }

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormControl, {
    variant: "outlined",
    style: {
      margin: '5px auto'
    }
  }, /*#__PURE__*/React.createElement(InputLabel, {
    id: "select-input-label"
  }, label), /*#__PURE__*/React.createElement(Select, {
    classes: {
      select: classes.dropdown,
      disabled: classes.disabled
    },
    id: "simple-select",
    value: selectedValue,
    onChange: handleChange,
    disabled: oneChoice,
    label: label,
    MenuProps: {
      classes: {
        list: classes.list
      }
    }
  }, choices.map(function (option) {
    return /*#__PURE__*/React.createElement(MenuItem, {
      color: "primary",
      key: option,
      className: classes.items,
      value: option
    }, option);
  }))));
};

var RegionSelector = function RegionSelector(_ref) {
  var options = _ref.options,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? 'Region' : _ref$label;

  var handleClick = function handleClick(index) {
    console.log(index);
  };

  return /*#__PURE__*/React.createElement(SimpleSelect, {
    choices: options,
    action: handleClick,
    label: label
  });
};

var validateAppAsync = function validateAppAsync(baseUrl, customerId, datasetId) {
  try {
    if (!baseUrl) {
      return Promise.resolve(AppStatus.NoBaseUrl);
    }

    if (!customerId || !datasetId) {
      return Promise.resolve(AppStatus.Unknown);
    }

    return Promise.resolve(getOutputStatusAsync(baseUrl, customerId, datasetId)["catch"](function () {
      return undefined;
    })).then(function (outputStatus) {
      return outputStatus && outputStatus.runs ? outputStatus.runs.length === 0 ? AppStatus.NoData : Promise.resolve(getOutputRunStatusAsync(baseUrl, customerId, datasetId, outputStatus.runs[0])).then(function (outputRunStatus) {
        return outputRunStatus && outputRunStatus.total_available > 0 ? AppStatus.Okay : AppStatus.NoData;
      }) : AppStatus.Unknown;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var AppStatus;

(function (AppStatus) {
  AppStatus[AppStatus["Unknown"] = 0] = "Unknown";
  AppStatus[AppStatus["Okay"] = 1] = "Okay";
  AppStatus[AppStatus["NoBaseUrl"] = 2] = "NoBaseUrl";
  AppStatus[AppStatus["NoData"] = 3] = "NoData";
  AppStatus[AppStatus["Error"] = 4] = "Error";
})(AppStatus || (AppStatus = {}));

var useStyles$5 = makeStyles(function (theme) {
  return createStyles$1({
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
  });
});
var BasicButton = function BasicButton(_ref) {
  var action = _ref.action,
      _ref$text = _ref.text,
      text = _ref$text === void 0 ? 'Next' : _ref$text,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'blue' : _ref$type;
  var classes = useStyles$5();
  var buttonStyles = {
    blue: /*#__PURE__*/React.createElement(Button, {
      variant: "contained",
      color: "primary",
      size: "large",
      onClick: action
    }, text),
    disabled: /*#__PURE__*/React.createElement(Button, {
      variant: "contained",
      color: "primary",
      size: "large",
      disabled: true
    }, text),
    gradient: /*#__PURE__*/React.createElement(Button, {
      className: classes.gradient,
      size: "large",
      onClick: action
    }, text),
    disabledGradient: /*#__PURE__*/React.createElement(Button, {
      className: classes.disabled,
      variant: "contained",
      size: "large",
      disabled: true
    }, text)
  };
  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, buttonStyles[type]);
};

var useStyles$6 = makeStyles$2(function (theme) {
  return createStyles$2({
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
  });
});
var BasicTextField = function BasicTextField(_ref) {
  var action = _ref.action,
      label = _ref.label,
      state = _ref.state,
      helperText = _ref.helperText,
      defaultValue = _ref.defaultValue;
  var classes = useStyles$6();

  var handleChange = function handleChange(event) {
    action(event.target.value);
  };

  var textFieldStates = {
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

var useStyles$7 = makeStyles(function (theme) {
  var _paper;

  return {
    paper: (_paper = {}, _paper[theme.breakpoints.down('sm')] = {
      minHeight: '40vh',
      minWidth: '60vw'
    }, _paper[theme.breakpoints.up('md')] = {
      minHeight: '40vh',
      minWidth: '40vw'
    }, _paper),
    textPaper: {
      paddingTop: 20
    },
    text: {
      color: theme.palette.secondary.contrastText
    },
    subtitle: {
      color: theme.palette.secondary.dark
    }
  };
});
var LandingPage = function LandingPage(_ref) {
  var url = _ref.url,
      _ref$customerId = _ref.customerId,
      customerId = _ref$customerId === void 0 ? '' : _ref$customerId,
      _ref$datasetId = _ref.datasetId,
      datasetId = _ref$datasetId === void 0 ? '' : _ref$datasetId,
      _ref$appStatus = _ref.appStatus,
      appStatus = _ref$appStatus === void 0 ? AppStatus.Okay : _ref$appStatus,
      onStatusChange = _ref.onStatusChange;
  var classes = useStyles$7();

  var _React$useState = React.useState('initial'),
      state = _React$useState[0],
      setState = _React$useState[1];

  var _React$useState2 = React.useState(customerId),
      customerInput = _React$useState2[0],
      setCustomerInput = _React$useState2[1];

  var _React$useState3 = React.useState(datasetId),
      datasetInput = _React$useState3[0],
      setDatasetInput = _React$useState3[1];

  var _React$useState4 = React.useState(''),
      errorMessage = _React$useState4[0],
      setErrorMessage = _React$useState4[1];

  React.useEffect(function () {
    setStateFromStatus(appStatus);
  }, []);

  var onClick = function onClick() {
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

  var updateCustomerValue = function updateCustomerValue(input) {
    setCustomerInput(input);
  };

  var updateDatasetValue = function updateDatasetValue(input) {
    setDatasetInput(input);
  };

  var validateComponentAsync = function validateComponentAsync() {
    try {
      return Promise.resolve(validateAppAsync(url, customerInput, datasetInput)).then(function (status) {
        if (status === AppStatus.Okay) {
          onStatusChange && onStatusChange(AppStatus.Okay);
        } else {
          setStateFromStatus(status);
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var setStateFromStatus = function setStateFromStatus(status) {
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
    defaultValue: customerId
  }), /*#__PURE__*/React.createElement(BasicTextField, {
    label: "Dataset ID",
    action: updateDatasetValue,
    state: state,
    helperText: errorMessage,
    defaultValue: datasetId
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

var useStyles$8 = makeStyles$1(function (theme) {
  var _root, _markLabel;

  return {
    root: (_root = {
      color: theme.palette.primary.main,
      height: 20
    }, _root[theme.breakpoints.down('xs')] = {
      marginBottom: 20
    }, _root),
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
    markLabel: (_markLabel = {
      fontWeight: 500,
      padding: 12
    }, _markLabel[theme.breakpoints.down('xs')] = {
      display: 'none'
    }, _markLabel),
    mark: {
      backgroundColor: theme.palette.primary.dark,
      height: 5
    }
  };
});

function ValueLabelComponent(props) {
  var children = props.children,
      open = props.open,
      value = props.value;
  var validTime = moment.unix(value).utc().format('MM/DD HH:mm[Z]');
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

var DiscreteSlider = function DiscreteSlider(_ref) {
  var options = _ref.options,
      action = _ref.action,
      selected = _ref.selected;
  var classes = useStyles$8();
  var optionsCount = React.useRef(options.length);
  var maxValue = options[options.length - 1].value;
  var minValue = options[0].value;

  var handleChangeCommitted = function handleChangeCommitted(_, value) {
    action(value);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement(CssBaseline, null), /*#__PURE__*/React.createElement(Hidden, {
    xsDown: true
  }, optionsCount.current >= 16 ? options.forEach(function (option, index) {
    if (!(index === 0 || index === optionsCount.current - 1 || index % 4 === 0 && index <= optionsCount.current - 4)) {
      option.label = '';
    }
  }) : undefined, /*#__PURE__*/React.createElement(Slider, {
    classes: classes,
    valueLabelDisplay: "auto",
    "aria-label": "pretty slider",
    track: false,
    step: null,
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
    step: null,
    marks: options,
    max: maxValue,
    onChange: handleChangeCommitted,
    value: selected,
    min: minValue
  })));
};

var useStyles$9 = makeStyles(function (theme) {
  return {
    root: {
      textAlign: 'right',
      flexGrow: 1,
      maxWidth: '100%',
      paddingTop: 5
    },
    mobilePaper: {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.main,
      border: '1px solid currentColor',
      padding: 5
    },
    timeLabel: {
      color: '#F76707',
      display: 'inline',
      fontWeight: 800,
      fontSize: '16px',
      letterSpacing: '1px',
      marginBottom: '0px'
    },
    time: {
      display: 'inline',
      fontWeight: 400
    },
    text: {
      color: theme.palette.secondary.main
    }
  };
});
var ValidTime = function ValidTime(_ref) {
  var time = _ref.time;
  var classes = useStyles$9();
  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement(CssBaseline, null), /*#__PURE__*/React.createElement(Hidden, {
    xsDown: true
  }, /*#__PURE__*/React.createElement("h3", {
    className: classes.timeLabel
  }, "Valid Time: "), /*#__PURE__*/React.createElement("h4", {
    className: classes.time
  }, time)), /*#__PURE__*/React.createElement(Hidden, {
    smUp: true
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

var RunsSelector = function RunsSelector(_ref) {
  var options = _ref.options,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? 'Run' : _ref$label,
      action = _ref.action;
  var newOptions = options.map(function (option) {
    return moment.unix(option).utc().format('YYYY-MM-DD[T] hh:mm[Z]');
  });
  return /*#__PURE__*/React.createElement(SimpleSelect, {
    choices: newOptions,
    action: action,
    label: label
  });
};

var useStyles$a = makeStyles(function (theme) {
  return {
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
  };
});
var BackButton = function BackButton(_ref) {
  var action = _ref.action;
  var classes = useStyles$a();
  return /*#__PURE__*/React.createElement(Button$1, {
    onClick: action,
    className: classes.root,
    variant: "outlined",
    color: "primary"
  }, /*#__PURE__*/React.createElement(NavigateBeforeIcon, null));
};

var useStyles$b = makeStyles(function (theme) {
  return {
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
  };
});
var ForwardButton = function ForwardButton(_ref) {
  var action = _ref.action;
  var classes = useStyles$b();
  return /*#__PURE__*/React.createElement(Button, {
    onClick: action,
    className: classes.root,
    variant: "outlined",
    color: "primary"
  }, /*#__PURE__*/React.createElement(NavigateNextIcon, null));
};

var useTimer = function useTimer(interval) {
  var _React$useState = React.useState(0),
      ticks = _React$useState[0],
      setTicks = _React$useState[1];

  var _React$useState2 = React.useState(false),
      isRunning = _React$useState2[0],
      setIsRunning = _React$useState2[1];

  React.useEffect(function () {
    if (isRunning) {
      var timerId = window.setTimeout(function () {
        setTicks(ticks + 1);
      }, interval);
      return function () {
        return window.clearTimeout(timerId);
      };
    }
  }, [ticks, isRunning]);
  return [ticks, isRunning, setIsRunning];
};

var useStyles$c = makeStyles(function (theme) {
  return {
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
  };
});
var StartStopButton = function StartStopButton(_ref) {
  var onToggle = _ref.onToggle;
  var classes = useStyles$c();

  var _useTimer = useTimer(600),
      tick = _useTimer[0],
      isRunning = _useTimer[1],
      setIsRunning = _useTimer[2];

  var handleClick = function handleClick() {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };

  React.useEffect(function () {
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

var useStyles$d = makeStyles(function (theme) {
  var _offset;

  return {
    root: {
      flexGrow: 1
    },
    offset: (_offset = {}, _offset[theme.breakpoints.up('md')] = {
      display: 'none'
    }, _offset)
  };
});
var TimeControl = function TimeControl(_ref) {
  var onBack = _ref.onBack,
      onNext = _ref.onNext,
      onToggle = _ref.onToggle;
  var classes = useStyles$d();
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

var useStyles$e = makeStyles(function (theme) {
  var _media;

  return {
    media: (_media = {}, _media[theme.breakpoints.up('md')] = {
      height: '41vw'
    }, _media[theme.breakpoints.down('sm')] = {
      width: '100%'
    }, _media)
  };
});
var ImageViewer = function ImageViewer(_ref) {
  var image = _ref.image;
  var classes = useStyles$e();
  return /*#__PURE__*/React.createElement("img", {
    className: classes.media,
    src: image,
    alt: "weather viewer"
  });
};

var useStyles$f = makeStyles$1(function (theme) {
  var _markLabel;

  return {
    root: {
      color: theme.palette.primary.main,
      height: '50%',
      display: 'inline-flex'
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
    markLabel: (_markLabel = {
      fontWeight: 500,
      padding: 10,
      fontSize: '.8em'
    }, _markLabel[theme.breakpoints.down('sm')] = {}, _markLabel),
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
  };
});
var VerticalSlider = function VerticalSlider(_ref) {
  var options = _ref.options,
      action = _ref.action,
      selected = _ref.selected,
      _ref$increase = _ref.increase,
      increase = _ref$increase === void 0 ? true : _ref$increase;
  var classes = useStyles$f();
  var marks = [];
  options.forEach(function (option, index) {
    if (increase) {
      marks.push({
        value: index,
        label: option
      });
    } else {
      marks.push({
        value: options.length - index - 1,
        label: option
      });
    }
  });

  var handleChangeCommitted = function handleChangeCommitted(e, value) {
    action(options[value]);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement(Slider, {
    classes: classes,
    valueLabelDisplay: "off",
    "aria-label": "vertical slider",
    track: false,
    step: null,
    marks: marks,
    max: options.length - 1,
    onChange: handleChangeCommitted,
    value: options.indexOf(selected),
    min: 0,
    orientation: "vertical"
  }));
};

var drawerWidth$1 = 300;
var xlDrawerWidth$1 = 350;
var useStyles$g = makeStyles(function (theme) {
  return {
    toolbar: theme.mixins.toolbar,
    contentClass: {
      flexGrow: 1,
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(2),
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
  };
});
var ShyftWxStatic = function ShyftWxStatic(_ref) {
  var index = _ref.index,
      forecast = _ref.forecast,
      level = _ref.level,
      product = _ref.product,
      onForecastSelect = _ref.onForecastSelect,
      onLevelSelect = _ref.onLevelSelect,
      onProductSelect = _ref.onProductSelect,
      getLevels = _ref.getLevels;
  var classes = useStyles$g();

  var _React$useState = React.useState(getLevels(product)),
      levels = _React$useState[0],
      setLevels = _React$useState[1];

  var getSelectedLevel = function getSelectedLevel() {
    return index.datasets[0].run.levels.filter(function (lvl) {
      return lvl.name === level;
    })[0];
  };

  var getSelectedProduct = function getSelectedProduct() {
    return getSelectedLevel().products.filter(function (p) {
      return p.name === product;
    })[0];
  };

  var handleProductSelect = function handleProductSelect(product) {
    onLevelSelect(product.level);
    onProductSelect(product.product);
    onForecastSelect(getSelectedProduct().forecasts[0].hour);
    setLevels(getLevels(product.product));
  };

  var handleRunSelect = function handleRunSelect(buttonText) {
    console.log(buttonText);
  };

  var compare = function compare(a, b) {
    var valA = Number(a.hour);
    var valB = Number(b.hour);
    var comparison = 0;

    if (valA > valB) {
      comparison = 1;
    } else if (valA < valB) {
      comparison = -1;
    }

    return comparison;
  };

  var onSliderNavigationNext = function onSliderNavigationNext() {
    var forecasts = getSelectedProduct().forecasts;
    forecasts.sort(compare);
    var forecastIndex = forecasts.findIndex(function (f) {
      return f.hour === forecast;
    });

    if (forecastIndex + 1 === forecasts.length) {
      onForecastSelect(forecasts[0].hour);
    } else {
      onForecastSelect(forecasts[forecastIndex + 1].hour);
    }
  };

  var onSliderNavigationBack = function onSliderNavigationBack() {
    var forecasts = getSelectedProduct().forecasts;
    forecasts.sort(compare);
    var forecastIndex = forecasts.findIndex(function (f) {
      return f.hour === forecast;
    });

    if (forecastIndex - 1 < 0) {
      onForecastSelect(forecasts[forecasts.length - 1].hour);
    } else {
      onForecastSelect(forecasts[forecastIndex - 1].hour);
    }
  };

  var onSliderNavigation = function onSliderNavigation(value) {
    value -= +index.datasets[0].run.name;
    var forecasts = getSelectedProduct().forecasts;
    forecasts.sort(compare);
    var forecastIndex = forecasts.findIndex(function (f) {
      return +f.hour === +value;
    });
    onForecastSelect(forecasts[forecastIndex].hour);
  };

  var onLevelSliderChange = function onLevelSliderChange(value) {
    onLevelSelect(value);
  };

  var onToggleToPlay = function onToggleToPlay(isRunning) {
    var forecasts = getSelectedProduct().forecasts;
    forecasts.sort(compare);

    if (!isRunning) {
      onForecastSelect(forecasts[0].hour);
    } else {
      var forecastIndex = forecasts.findIndex(function (f) {
        return f.hour === forecast;
      });

      if (forecast === forecasts[forecasts.length - 1].hour) {
        onForecastSelect(forecasts[0].hour);
      } else {
        onForecastSelect(forecasts[forecastIndex + 1].hour);
      }
    }
  };

  var getValidTime = function getValidTime() {
    var validTime = moment.unix(+index.datasets[0].run.name + +forecast).utc().format('MM/DD HH:mm[Z]');
    return validTime;
  };

  var generateContent = function generateContent() {
    console.log(index);
    var selectedProduct = getSelectedProduct();
    var levelProductVals = index.datasets[0].run.levels.map(function (lvl, index) {
      return {
        name: lvl.name,
        open: index === 0,
        products: lvl.products
      };
    });
    var sliderVals = selectedProduct.forecasts.map(function (f) {
      return {
        value: +f.hour + +index.datasets[0].run.name,
        label: moment.unix(+f.hour + +index.datasets[0].run.name).utc().format('MM/DD HH:mm[Z]')
      };
    });
    var activeForecastLayer = selectedProduct.forecasts.filter(function (f) {
      return f.hour === forecast;
    })[0].image;
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
      container: true,
      item: true,
      xs: true,
      md: true,
      alignItems: "center"
    }, /*#__PURE__*/React.createElement(RegionSelector, {
      "data-cy": "region-selector",
      options: [index.datasets[0].region.name],
      action: function action() {}
    })), /*#__PURE__*/React.createElement(Grid, {
      container: true,
      item: true,
      xs: true,
      sm: true,
      md: true,
      alignItems: "center"
    }, /*#__PURE__*/React.createElement(RunsSelector, {
      "data-cy": "runs-selector",
      options: [+index.datasets[0].run.name],
      action: handleRunSelect
    })), /*#__PURE__*/React.createElement(Hidden, {
      xsDown: true
    }, /*#__PURE__*/React.createElement(Grid, {
      container: true,
      item: true,
      sm: true,
      alignItems: "flex-end"
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
    }, levels.length > 1 ? /*#__PURE__*/React.createElement(VerticalSlider, {
      options: levels,
      selected: level,
      action: onLevelSliderChange
    }) : /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'none'
      }
    }))), /*#__PURE__*/React.createElement(Grid, {
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

// A type of promise-like that resolves synchronously and supports only one observer
const _Pact = /*#__PURE__*/(function() {
	function _Pact() {}
	_Pact.prototype.then = function(onFulfilled, onRejected) {
		const result = new _Pact();
		const state = this.s;
		if (state) {
			const callback = state & 1 ? onFulfilled : onRejected;
			if (callback) {
				try {
					_settle(result, 1, callback(this.v));
				} catch (e) {
					_settle(result, 2, e);
				}
				return result;
			} else {
				return this;
			}
		}
		this.o = function(_this) {
			try {
				const value = _this.v;
				if (_this.s & 1) {
					_settle(result, 1, onFulfilled ? onFulfilled(value) : value);
				} else if (onRejected) {
					_settle(result, 1, onRejected(value));
				} else {
					_settle(result, 2, value);
				}
			} catch (e) {
				_settle(result, 2, e);
			}
		};
		return result;
	};
	return _Pact;
})();

// Settles a pact synchronously
function _settle(pact, state, value) {
	if (!pact.s) {
		if (value instanceof _Pact) {
			if (value.s) {
				if (state & 1) {
					state = value.s;
				}
				value = value.v;
			} else {
				value.o = _settle.bind(null, pact, state);
				return;
			}
		}
		if (value && value.then) {
			value.then(_settle.bind(null, pact, state), _settle.bind(null, pact, 2));
			return;
		}
		pact.s = state;
		pact.v = value;
		const observer = pact.o;
		if (observer) {
			observer(pact);
		}
	}
}

function _isSettledPact(thenable) {
	return thenable instanceof _Pact && thenable.s & 1;
}

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously implement a generic for loop
function _for(test, update, body) {
	var stage;
	for (;;) {
		var shouldContinue = test();
		if (_isSettledPact(shouldContinue)) {
			shouldContinue = shouldContinue.v;
		}
		if (!shouldContinue) {
			return result;
		}
		if (shouldContinue.then) {
			stage = 0;
			break;
		}
		var result = body();
		if (result && result.then) {
			if (_isSettledPact(result)) {
				result = result.s;
			} else {
				stage = 1;
				break;
			}
		}
		if (update) {
			var updateValue = update();
			if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
				stage = 2;
				break;
			}
		}
	}
	var pact = new _Pact();
	var reject = _settle.bind(null, pact, 2);
	(stage === 0 ? shouldContinue.then(_resumeAfterTest) : stage === 1 ? result.then(_resumeAfterBody) : updateValue.then(_resumeAfterUpdate)).then(void 0, reject);
	return pact;
	function _resumeAfterBody(value) {
		result = value;
		do {
			if (update) {
				updateValue = update();
				if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
					updateValue.then(_resumeAfterUpdate).then(void 0, reject);
					return;
				}
			}
			shouldContinue = test();
			if (!shouldContinue || (_isSettledPact(shouldContinue) && !shouldContinue.v)) {
				_settle(pact, 1, result);
				return;
			}
			if (shouldContinue.then) {
				shouldContinue.then(_resumeAfterTest).then(void 0, reject);
				return;
			}
			result = body();
			if (_isSettledPact(result)) {
				result = result.v;
			}
		} while (!result || !result.then);
		result.then(_resumeAfterBody).then(void 0, reject);
	}
	function _resumeAfterTest(shouldContinue) {
		if (shouldContinue) {
			result = body();
			if (result && result.then) {
				result.then(_resumeAfterBody).then(void 0, reject);
			} else {
				_resumeAfterBody(result);
			}
		} else {
			_settle(pact, 1, result);
		}
	}
	function _resumeAfterUpdate() {
		if (shouldContinue = test()) {
			if (shouldContinue.then) {
				shouldContinue.then(_resumeAfterTest).then(void 0, reject);
			} else {
				_resumeAfterTest(shouldContinue);
			}
		} else {
			_settle(pact, 1, result);
		}
	}
}

var theme = createMuiTheme({
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
    MuiInputLabel: {
      root: {
        color: '#F76707',
        fontSize: '17px',
        fontWeight: 800,
        letterSpacing: '1px'
      }
    },
    MuiListItem: {
      root: {
        '&$selected, &$selected:hover': {
          backgroundColor: '#329af0',
          color: '#f8f9fa',
          borderLeft: '7px solid #1c7cd6'
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
    MuiSelect: {
      icon: {
        '&$disabled': {
          display: 'none'
        }
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
var options = {
  disableAlign: true,
  factor: 5
};
theme = responsiveFontSizes(theme, options);
var theme$1 = theme;

var ShyftContext = React.createContext({});
var drawerWidth$2 = 300;
var xlDrawerWidth$2 = 350;
var useStyles$h = makeStyles(function (theme) {
  return {
    toolbar: theme.mixins.toolbar,
    contentClass: {
      flexGrow: 1,
      padding: theme.spacing(3),
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
  };
});
var ShyftWxDynamic = function ShyftWxDynamic(_ref) {
  var index = _ref.index,
      forecast = _ref.forecast,
      level = _ref.level,
      product = _ref.product,
      onForecastSelect = _ref.onForecastSelect,
      onLevelSelect = _ref.onLevelSelect,
      onProductSelect = _ref.onProductSelect;
  var classes = useStyles$h();

  var getSelectedLevel = function getSelectedLevel() {
    return index.datasets[0].run.levels.filter(function (lvl) {
      return lvl.name === level;
    })[0];
  };

  var getSelectedProduct = function getSelectedProduct() {
    return getSelectedLevel().products.filter(function (p) {
      return p.name === product;
    })[0];
  };

  var handleProductSelect = function handleProductSelect(product) {
    onLevelSelect(product.level);
    onProductSelect(product.product);
    onForecastSelect(getSelectedProduct().forecasts[0].hour);
  };

  var handleRunSelect = function handleRunSelect(buttonText) {
    console.log(buttonText);
  };

  var compare = function compare(a, b) {
    var valA = Number(a.hour);
    var valB = Number(b.hour);
    var comparison = 0;

    if (valA > valB) {
      comparison = 1;
    } else if (valA < valB) {
      comparison = -1;
    }

    return comparison;
  };

  var onSliderNavigationNext = function onSliderNavigationNext() {
    var forecasts = getSelectedProduct().forecasts;
    forecasts.sort(compare);
    var forecastIndex = forecasts.findIndex(function (f) {
      return f.hour === forecast;
    });

    if (forecastIndex + 1 === forecasts.length) {
      onForecastSelect(forecasts[0].hour);
    } else {
      onForecastSelect(forecasts[forecastIndex + 1].hour);
    }
  };

  var onSliderNavigationBack = function onSliderNavigationBack() {
    var forecasts = getSelectedProduct().forecasts;
    forecasts.sort(compare);
    var forecastIndex = forecasts.findIndex(function (f) {
      return f.hour === forecast;
    });

    if (forecastIndex - 1 < 0) {
      onForecastSelect(forecasts[forecasts.length - 1].hour);
    } else {
      onForecastSelect(forecasts[forecastIndex - 1].hour);
    }
  };

  var onSliderNavigation = function onSliderNavigation(value) {
    value -= +index.datasets[0].run.name;
    var forecasts = getSelectedProduct().forecasts;
    forecasts.sort(compare);
    var forecastIndex = forecasts.findIndex(function (f) {
      return +f.hour === +value;
    });
    onForecastSelect(forecasts[forecastIndex].hour);
  };

  var onToggleToPlay = function onToggleToPlay(isRunning) {
    var forecasts = getSelectedProduct().forecasts;
    forecasts.sort(compare);

    if (!isRunning) {
      onForecastSelect(forecasts[0].hour);
    } else {
      var forecastIndex = forecasts.findIndex(function (f) {
        return f.hour === forecast;
      });

      if (forecast === forecasts[forecasts.length - 1].hour) {
        onForecastSelect(forecasts[0].hour);
      } else {
        onForecastSelect(forecasts[forecastIndex + 1].hour);
      }
    }
  };

  var getValidTime = function getValidTime() {
    var validTime = moment.unix(+index.datasets[0].run.name + +forecast).utc().format('MM/DD HH:mm[Z]');
    return validTime;
  };

  var generateContent = function generateContent() {
    var selectedProduct = getSelectedProduct();
    var levelProductVals = index.datasets[0].run.levels.map(function (lvl, index) {
      return {
        name: lvl.name,
        open: index === 0,
        products: lvl.products
      };
    });
    var sliderVals = selectedProduct.forecasts.map(function (f) {
      return {
        value: +f.hour + +index.datasets[0].run.name,
        label: moment.unix(+f.hour + +index.datasets[0].run.name).utc().format('MM/DD HH:mm[Z]')
      };
    });
    var activeForecastLayer = selectedProduct.forecasts.filter(function (f) {
      return f.hour === forecast;
    })[0].image;
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
      action: function action() {}
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

var ShyftWx = function ShyftWx(props) {
  var dataset = props.dataset,
      url = props.url,
      customer = props.customer,
      themeOverride = props.themeOverride,
      dynamicFeatures = props.dynamicFeatures;

  var _React$useState = React.useState(AppStatus.Okay),
      status = _React$useState[0],
      setStatus = _React$useState[1];

  var _React$useState2 = React.useState(true),
      loading = _React$useState2[0],
      setLoading = _React$useState2[1];

  var _React$useState3 = React.useState({
    datasets: []
  }),
      index = _React$useState3[0],
      setIndex = _React$useState3[1];

  var _React$useState4 = React.useState(''),
      selectedProduct = _React$useState4[0],
      setSelectedProduct = _React$useState4[1];

  var _React$useState5 = React.useState(''),
      selectedLevel = _React$useState5[0],
      setSelectedLevel = _React$useState5[1];

  var _React$useState6 = React.useState(''),
      selectedForecast = _React$useState6[0],
      setSelectedForecast = _React$useState6[1];

  var _React$useState7 = React.useState(''),
      selectedRegion = _React$useState7[0],
      setSelectedRegion = _React$useState7[1];

  var _React$useState8 = React.useState(''),
      selectedRun = _React$useState8[0],
      setSelectedRun = _React$useState8[1];

  var _React$useState9 = React.useState([]),
      levelsAndProducts = _React$useState9[0],
      setLevelsAndProducts = _React$useState9[1];

  var isDynamic = React.useRef(false);

  if (dynamicFeatures && dynamicFeatures.length !== 0) {
    isDynamic.current = true;
  }

  var urlParams = React.useRef(new URLSearchParams(window.location.search));
  var customerId = React.useRef(customer || urlParams.current.get('customer') || '');
  var datasetId = React.useRef(dataset || urlParams.current.get('model') || '');
  React.useEffect(function () {
    loadAsync();
  }, []);

  var loadAsync = function loadAsync() {
    try {
      setLoading(true);
      return Promise.resolve(validateAppAsync(url, customerId.current, datasetId.current)).then(function (appStatus) {
        if (appStatus !== AppStatus.Okay) {
          setStatus(appStatus);
          setLoading(false);
          return;
        }

        return Promise.resolve(getIndexAsync(url, customerId.current, datasetId.current)).then(function (indexData) {
          function _temp2() {
            setIndex(arr);
            setLoading(false);
          }

          if (!indexData || indexData['run-regions'].length === 0) {
            setStatus(AppStatus.NoData);
            setLoading(false);
            return;
          }

          var arr = {
            datasets: []
          };
          var i = 0;

          var _temp = _for(function () {
            return i < indexData['run-regions'].length;
          }, function () {
            return i++;
          }, function () {
            var dataset = indexData['run-regions'][i];
            var datasetRegionRun = {
              dataset: dataset.dataset_name,
              region: dataset.region,
              run: {
                name: dataset.run,
                levels: []
              }
            };
            return Promise.resolve(getProductDataAsync(url, customerId.current, datasetId.current, dataset.region.name, dataset.run)).then(function (runRegionData) {
              var items = runRegionData.items;
              var uniqueLevels = [];
              uniqueLevels = items.map(function (i) {
                return i.level;
              }).filter(function (v, i, a) {
                return a.indexOf(v) === i;
              }).map(function (l) {
                return {
                  name: l,
                  products: []
                };
              });
              uniqueLevels.forEach(function (lvl) {
                lvl.products = items.filter(function (item) {
                  return item.level === lvl.name;
                }).map(function (i) {
                  return i.product;
                }).filter(function (v, i, a) {
                  return a.indexOf(v) === i;
                }).map(function (product) {
                  return {
                    name: product,
                    metadata: [],
                    forecasts: []
                  };
                });
              });
              uniqueLevels.forEach(function (lvl) {
                lvl.products.forEach(function (product) {
                  product.metadata = items.filter(function (item) {
                    return item.level === lvl.name && item.product === product.name && item.forecast === '0';
                  }).map(function (item) {
                    return item.item_metadata;
                  });
                });
              });
              uniqueLevels.forEach(function (lvl) {
                lvl.products.forEach(function (product) {
                  product.forecasts = items.filter(function (item) {
                    return item.level === lvl.name && item.product === product.name;
                  }).map(function (item) {
                    return {
                      hour: item.forecast,
                      image: item.url
                    };
                  });
                });
              });
              var uniqueProducts = [];
              uniqueProducts = items.map(function (i) {
                return i.product;
              }).filter(function (v, i, a) {
                return a.indexOf(v) === i;
              }).map(function (l) {
                return {
                  name: l,
                  levels: []
                };
              });
              uniqueProducts.forEach(function (product) {
                product.levels = items.filter(function (item) {
                  return item.product === product.name;
                }).map(function (i) {
                  return i.level;
                }).filter(function (v, i, a) {
                  return a.indexOf(v) === i;
                }).map(function (level) {
                  return level;
                });
              });
              setLevelsAndProducts(uniqueProducts);
              datasetRegionRun.run.levels = uniqueLevels;
              var indexes = {
                datasets: [datasetRegionRun]
              };
              arr.datasets.push(datasetRegionRun);

              if (i === 0) {
                setSelectedLevel(indexes.datasets[0].run.levels[0].name);
                setSelectedProduct(indexes.datasets[0].run.levels[0].products[0].name);
                setSelectedForecast(indexes.datasets[0].run.levels[0].products[0].forecasts[0].hour);
              }
            });
          });

          return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var getLevels = function getLevels(value) {
    var obj = levelsAndProducts.find(function (o) {
      return o.name === value;
    });

    if (obj) {
      return obj.levels;
    } else {
      return [];
    }
  };

  var handleStatusChange = function handleStatusChange(newStatus) {
    setStatus(newStatus);
  };

  var generateContent = function generateContent() {
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
        onRunSelect: setSelectedRun,
        getLevels: getLevels
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
        onRunSelect: setSelectedRun,
        getLevels: getLevels
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

var useStyles$i = makeStyles(function (theme) {
  return {
    root: {
      height: '40vw',
      width: '100%'
    },
    paddingMiddle: {
      marginLeft: 15,
      marginBottom: 20,
      marginTop: 15
    }
  };
});
var BaseWxViewer = function BaseWxViewer(_ref) {
  var layers = _ref.layers,
      neBounds = _ref.neBounds,
      swBounds = _ref.swBounds;
  var classes = useStyles$i();
  var bounds = latLngBounds(swBounds, neBounds);

  var generateLayers = function generateLayers() {
    var results = [];
    layers && layers.forEach(function (layer) {
      if (layer.type === 'metar') {
        var metar = layer;
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

  return /*#__PURE__*/React.createElement(Map, {
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

export { BackButton, BaseWxViewer, ForwardButton, GroupedButtons, LandingPage, ModelSelector, ProductMenu, RegionSelector, RunsSelector, ShyftWx, ShyftWxStatic, SideMenu, DiscreteSlider as Slider, StartStopButton, TimeControl, VerticalSlider, index as apis, theme$1 as theme };
//# sourceMappingURL=index.modern.js.map
