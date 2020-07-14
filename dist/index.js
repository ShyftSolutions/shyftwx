function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var NavigateBeforeIcon = _interopDefault(require('@material-ui/icons/NavigateBefore'));
var Button = _interopDefault(require('@material-ui/core/Button'));
var core = require('@material-ui/core');
require('leaflet/dist/leaflet.css');
var reactLeaflet = require('react-leaflet');
var leaflet = require('leaflet');
var NavigateNextIcon = _interopDefault(require('@material-ui/icons/NavigateNext'));
var _ = require('@material-ui/core/');
var icons = require('@material-ui/icons');
var reactFontawesome = require('@fortawesome/react-fontawesome');
var freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');
var MenuIcon = _interopDefault(require('@material-ui/icons/Menu'));
var FormControl = _interopDefault(require('@material-ui/core/FormControl'));
var MenuItem = _interopDefault(require('@material-ui/core/MenuItem'));
var Select = _interopDefault(require('@material-ui/core/Select'));
var styles = require('@material-ui/core/styles');
var moment = _interopDefault(require('moment'));
var Slider = _interopDefault(require('@material-ui/core/Slider'));
var Tooltip = _interopDefault(require('@material-ui/core/Tooltip'));
var PlayArrowIcon = _interopDefault(require('@material-ui/icons/PlayArrow'));
var PauseIcon = _interopDefault(require('@material-ui/icons/Pause'));

var getIndexAsync = function getIndexAsync(url) {
  return fetch(url).then(function (response) {
    return response.json();
  });
};
var getProductDataAsync = function getProductDataAsync(url, region, run) {
  url = url + "/" + run + "-" + region;
  return fetch(url).then(function (response) {
    return response.json();
  });
};

var index = {
    __proto__: null,
    getIndexAsync: getIndexAsync,
    getProductDataAsync: getProductDataAsync
};

var useStyles = core.makeStyles(function (theme) {
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
  var classes = useStyles();
  return /*#__PURE__*/React__default.createElement(Button, {
    onClick: action,
    className: classes.root,
    variant: "outlined",
    color: "primary"
  }, /*#__PURE__*/React__default.createElement(NavigateBeforeIcon, null));
};

var useStyles$1 = core.makeStyles(function (theme) {
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
  var classes = useStyles$1();
  var bounds = leaflet.latLngBounds(swBounds, neBounds);
  return /*#__PURE__*/React__default.createElement(reactLeaflet.Map, {
    bounds: bounds,
    className: classes.root,
    dragging: false,
    zoomControl: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    keyboard: false,
    touchZoom: false
  }, /*#__PURE__*/React__default.createElement(reactLeaflet.ImageOverlay, {
    url: layers,
    bounds: bounds,
    opacity: 0.5
  }), /*#__PURE__*/React__default.createElement(reactLeaflet.TileLayer, {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "\xA9 <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"
  }));
};

var useStyles$2 = core.makeStyles(function (theme) {
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
  var classes = useStyles$2();
  return /*#__PURE__*/React__default.createElement(core.Button, {
    onClick: action,
    className: classes.root,
    variant: "outlined",
    color: "primary"
  }, /*#__PURE__*/React__default.createElement(NavigateNextIcon, null));
};

var useStyles$3 = core.makeStyles(function (theme) {
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
  var classes = useStyles$3();

  var _useState = React.useState(options[0]),
      selected = _useState[0],
      setSelected = _useState[1];

  var handleClick = function handleClick(option) {
    setSelected(option);
    action(option);
  };

  return /*#__PURE__*/React__default.createElement(core.ButtonGroup, {
    className: classes.root
  }, options.map(function (option) {
    return /*#__PURE__*/React__default.createElement(core.Button, {
      key: option,
      name: "group-button",
      onClick: function onClick() {
        return handleClick(option);
      },
      className: selected === option ? classes.selectedButton : classes.defaultButton
    }, option);
  }));
};

var useStyles$4 = core.makeStyles(function (theme) {
  return {
    root: {
      flexGrow: 1,
      maxWidth: '100%'
    }
  };
});
var ModelSelector = function ModelSelector(_ref) {
  var options = _ref.options,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? 'Model' : _ref$label;
  var classes = useStyles$4();

  var handleClick = function handleClick(index) {
    console.log("clicked " + index);
  };

  return (
    /*#__PURE__*/
    React__default.createElement(core.Grid, {
      container: true,
      "data-cy": "model-selector",
      direction: "column",
      className: classes.root
    }, /*#__PURE__*/React__default.createElement(core.Grid, {
      item: true
    }, /*#__PURE__*/React__default.createElement(core.Typography, {
      variant: "h6"
    }, label), /*#__PURE__*/React__default.createElement(GroupedButtons, {
      "data-cy": "model-selector-buttons",
      options: options,
      action: handleClick
    })))
  );
};

var useStyles$5 = core.makeStyles(function (theme) {
  return core.createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      }
    }
  });
});
var BasicButton = function BasicButton(_ref) {
  var action = _ref.action,
      _ref$text = _ref.text,
      text = _ref$text === void 0 ? 'Next' : _ref$text;
  var classes = useStyles$5();
  return /*#__PURE__*/React__default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React__default.createElement(core.Button, {
    variant: "contained",
    color: "primary",
    size: "large",
    onClick: action
  }, text));
};

var useStyles$6 = _.makeStyles(function (theme) {
  return _.createStyles({
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
      helperText = _ref.helperText;
  var classes = useStyles$6();

  var handleChange = function handleChange(event) {
    action(event.target.value);
  };

  var textFieldStates = {
    initial: /*#__PURE__*/React__default.createElement("form", {
      className: classes.root,
      noValidate: true,
      autoComplete: "off"
    }, /*#__PURE__*/React__default.createElement(_.TextField, {
      className: classes.textField,
      id: "outlined-basic",
      label: label,
      variant: "outlined",
      color: "secondary",
      onChange: handleChange,
      helperText: helperText
    })),
    error: /*#__PURE__*/React__default.createElement("form", {
      className: classes.root,
      noValidate: true,
      autoComplete: "off"
    }, /*#__PURE__*/React__default.createElement(_.TextField, {
      error: true,
      id: "outlined-error",
      label: label,
      variant: "outlined",
      onChange: handleChange,
      helperText: helperText
    }))
  };
  return textFieldStates[state];
};

var useStyles$7 = core.makeStyles(function (theme) {
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
  var url = _ref.url;
  var classes = useStyles$7();

  var _React$useState = React__default.useState('initial'),
      state = _React$useState[0],
      setState = _React$useState[1];

  var _React$useState2 = React__default.useState(''),
      customerInput = _React$useState2[0],
      setCustomerInput = _React$useState2[1];

  var _React$useState3 = React__default.useState(''),
      datasetInput = _React$useState3[0],
      setDatasetInput = _React$useState3[1];

  var _React$useState4 = React__default.useState(' '),
      errorMessage = _React$useState4[0],
      setErrorMessage = _React$useState4[1];

  var onClick = function onClick() {
    if (customerInput === '' && datasetInput === '') {
      setState('error');
      setErrorMessage('Enter a customer and dataset id');
    } else if (customerInput === '') {
      setState('error');
      setErrorMessage('Enter a customer id');
    } else if (datasetInput === '') {
      setState('error');
      setErrorMessage('Enter a dataset id');
    } else {
      checkInput();
    }
  };

  var checkInput = function checkInput() {
    try {
      var customerUrl = url + "/" + customerInput + "/" + datasetInput + "/products";
      return Promise.resolve(getIndexAsync(customerUrl)).then(function (indexData) {
        if (indexData.datasets === undefined || indexData.datasets.length === 0) {
          setState('error');
          setErrorMessage('Customer or dataset id does not exist');
        } else {
          window.location.href += "?customer=" + customerInput + "&model=" + datasetInput;
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var updateCustomerValue = function updateCustomerValue(input) {
    setCustomerInput(input);
  };

  var updateDatasetValue = function updateDatasetValue(input) {
    setDatasetInput(input);
  };

  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    spacing: 0,
    direction: "column",
    alignItems: "center",
    justify: "center",
    style: {
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    item: true,
    direction: "column",
    alignItems: "center",
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(core.Paper, {
    className: classes.paper
  }, /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    item: true,
    direction: "column",
    justify: "space-evenly",
    spacing: 2,
    style: {
      minHeight: '40vh',
      minWidth: '40vw'
    }
  }, /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    item: true,
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(core.Paper, {
    className: classes.textPaper,
    elevation: 0
  }, /*#__PURE__*/React__default.createElement(core.Typography, {
    align: "center",
    variant: "h5",
    gutterBottom: true
  }, "Welcome"), /*#__PURE__*/React__default.createElement(core.Typography, {
    variant: "body1",
    color: "textSecondary",
    align: "center"
  }, "Please enter your information below ", /*#__PURE__*/React__default.createElement("br", null), " to access the viewer:"))), /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    item: true,
    alignItems: "center",
    direction: "column"
  }, /*#__PURE__*/React__default.createElement(BasicTextField, {
    label: "Customer ID",
    action: updateCustomerValue,
    state: state
  }), /*#__PURE__*/React__default.createElement(BasicTextField, {
    label: "Dataset ID",
    action: updateDatasetValue,
    state: state,
    helperText: errorMessage
  })), /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    item: true,
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(BasicButton, {
    action: onClick
  })), /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true
  }))))));
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

var useStyles$8 = core.makeStyles(function (theme) {
  return {
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
  };
});
var ICON_MAP = {
  Ceiling: freeSolidSvgIcons.fas.faCloud,
  DewpointTemperature: freeSolidSvgIcons.fas.faTint,
  Pressure: freeSolidSvgIcons.fas.faArrowDown,
  RelativeHumidity: freeSolidSvgIcons.fas.faPercent,
  Temperature: freeSolidSvgIcons.fas.faTemperatureHigh,
  TotalPrecipitation: freeSolidSvgIcons.fas.faCloudShowersHeavy,
  Visibility: freeSolidSvgIcons.fas.faEye,
  Wind: freeSolidSvgIcons.fas.faWind
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
      action = _ref.action;
  var classes = useStyles$8();

  var _React$useState = React__default.useState(options[0].name + " " + options[0].products[0].name),
      selectedProduct = _React$useState[0],
      setSelectedProduct = _React$useState[1];

  var _React$useState2 = React__default.useState(options || []),
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

  return /*#__PURE__*/React__default.createElement("div", {
    className: classes.root
  }, categories.map(function (cat, index) {
    return /*#__PURE__*/React__default.createElement(core.List, {
      key: index
    }, /*#__PURE__*/React__default.createElement(core.ListItem, {
      "data-cy": cat.name,
      button: true,
      onClick: function onClick() {
        return handleClick(cat);
      }
    }, /*#__PURE__*/React__default.createElement(core.ListItemText, {
      primary: /*#__PURE__*/React__default.createElement(core.Typography, {
        className: classes.categoryStyle
      }, cat.name)
    }), cat.open ? /*#__PURE__*/React__default.createElement(icons.ExpandLess, null) : /*#__PURE__*/React__default.createElement(icons.ExpandMore, null)), /*#__PURE__*/React__default.createElement(core.Collapse, {
      "in": cat.open,
      timeout: "auto",
      unmountOnExit: true
    }, cat.products.map(function (product, index) {
      return /*#__PURE__*/React__default.createElement(core.ListItem, {
        "data-cy": cat.name + '-' + product.name,
        key: index,
        button: true,
        className: classes.nested,
        selected: selectedProduct === cat.name + ' ' + product.name,
        onClick: function onClick(event) {
          return handleListItemClick(event, {
            level: cat.name,
            product: product.name
          });
        }
      }, ICON_MAP[product.name] !== undefined && /*#__PURE__*/React__default.createElement(core.ListItemIcon, null, /*#__PURE__*/React__default.createElement(reactFontawesome.FontAwesomeIcon, {
        className: selectedProduct === cat.name + ' ' + product.name ? classes.selected : classes.icon,
        icon: ICON_MAP[product.name]
      })), /*#__PURE__*/React__default.createElement(core.ListItemText, {
        primary: /*#__PURE__*/React__default.createElement(core.Typography, {
          className: selectedProduct === cat.name + ' ' + product.name ? classes.selected : classes.text
        }, product.name)
      }));
    })));
  }));
};

var drawerWidth = 250;
var xlDrawerWidth = 350;
var useStyles$9 = core.makeStyles(function (theme) {
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
var ProductSelector = function ProductSelector(_ref) {
  var categories = _ref.categories,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? 'Products' : _ref$label,
      action = _ref.action,
      window = _ref.window;
  var classes = useStyles$9();

  var _React$useState = React__default.useState(false),
      mobileOpen = _React$useState[0],
      setMobileOpen = _React$useState[1];

  var handleDrawerToggle = function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  };

  var menu = /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: classes.toolbar
  }), /*#__PURE__*/React__default.createElement(core.Divider, null), /*#__PURE__*/React__default.createElement(core.Typography, {
    variant: "h6",
    style: {
      paddingLeft: '6px'
    }
  }, label), /*#__PURE__*/React__default.createElement(ProductMenu, {
    options: categories,
    action: action
  }));
  var container = window !== undefined ? function () {
    return window().document.body;
  } : undefined;
  return /*#__PURE__*/React__default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React__default.createElement(core.CssBaseline, null), /*#__PURE__*/React__default.createElement(core.AppBar, {
    position: "fixed",
    className: classes.appBar
  }, /*#__PURE__*/React__default.createElement(core.Toolbar, null, /*#__PURE__*/React__default.createElement(core.IconButton, {
    color: "inherit",
    "aria-label": "open drawer",
    edge: "start",
    onClick: handleDrawerToggle,
    className: classes.menuButton
  }, /*#__PURE__*/React__default.createElement(MenuIcon, null)))), /*#__PURE__*/React__default.createElement("nav", {
    className: classes.drawer
  }, /*#__PURE__*/React__default.createElement(core.Hidden, {
    smUp: true,
    implementation: "css"
  }, /*#__PURE__*/React__default.createElement(core.Drawer, {
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
  }, menu)), /*#__PURE__*/React__default.createElement(core.Hidden, {
    xsDown: true,
    implementation: "css"
  }, /*#__PURE__*/React__default.createElement(core.Drawer, {
    classes: {
      paper: classes.drawerPaper
    },
    variant: "permanent",
    open: true
  }, menu))));
};

var useStyles$a = core.makeStyles(function (theme) {
  return {
    root: {
      flexGrow: 1,
      maxWidth: '100%'
    }
  };
});
var RegionSelector = function RegionSelector(_ref) {
  var options = _ref.options,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? 'Region' : _ref$label;
  var classes = useStyles$a();

  var handleClick = function handleClick(index) {
    console.log("clicked " + index);
  };

  return (
    /*#__PURE__*/
    React__default.createElement(core.Grid, {
      container: true,
      item: true,
      className: classes.root
    }, /*#__PURE__*/React__default.createElement(core.Grid, {
      item: true
    }, /*#__PURE__*/React__default.createElement(core.Typography, {
      variant: "h6"
    }, label), /*#__PURE__*/React__default.createElement(GroupedButtons, {
      options: options,
      action: handleClick
    })))
  );
};

var useStyles$b = styles.makeStyles(function (theme) {
  return {
    formControl: {
      minWidth: 120,
      boxShadow: theme.shadows[3]
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    label: {
      align: 'center'
    },
    dropdown: {
      background: theme.palette.primary.contrastText
    },
    items: {
      background: theme.palette.primary.contrastText,
      '&:hover': {
        background: theme.palette.primary.main
      }
    }
  };
});
var SimpleSelect = function SimpleSelect(_ref) {
  var choices = _ref.choices,
      action = _ref.action;
  var classes = useStyles$b();

  var _React$useState = React__default.useState(choices[0]),
      selectedValue = _React$useState[0],
      setSelectedValue = _React$useState[1];

  var handleChange = function handleChange(event) {
    var name = event.target.name;

    if (name) {
      setSelectedValue(name);
      action(name);
    }
  };

  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(FormControl, {
    variant: "outlined",
    className: classes.formControl
  }, /*#__PURE__*/React__default.createElement(Select, {
    classes: {
      select: classes.dropdown
    },
    id: "simple-select",
    value: selectedValue,
    onChange: handleChange
  }, choices.map(function (option) {
    return /*#__PURE__*/React__default.createElement(MenuItem, {
      color: "primary",
      key: option,
      className: classes.items,
      value: option
    }, option);
  }))));
};

var useStyles$c = core.makeStyles(function (theme) {
  return {
    root: {
      flexGrow: 1,
      maxWidth: '100%'
    }
  };
});
var RunsSelector = function RunsSelector(_ref) {
  var options = _ref.options,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? 'Runs' : _ref$label,
      action = _ref.action;
  var classes = useStyles$c();
  var newOptions = options.map(function (option) {
    return moment.unix(option).utc().format('YYYY-MM-DD[T] hh:mm[Z]');
  });
  return (
    /*#__PURE__*/
    React__default.createElement(core.Grid, {
      container: true,
      item: true,
      className: classes.root
    }, /*#__PURE__*/React__default.createElement(core.Grid, {
      item: true
    }, /*#__PURE__*/React__default.createElement(core.Typography, {
      variant: "h6"
    }, label), newOptions.length === 1 ? /*#__PURE__*/React__default.createElement(GroupedButtons, {
      options: newOptions,
      action: action
    }) : /*#__PURE__*/React__default.createElement(SimpleSelect, {
      choices: newOptions,
      action: action
    })))
  );
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

var useStyles$d = core.makeStyles(function (theme) {
  var _media;

  return {
    media: (_media = {}, _media[theme.breakpoints.up('md')] = {
      height: '40vw'
    }, _media[theme.breakpoints.down('sm')] = {
      width: '100%'
    }, _media)
  };
});
var ImageViewer = function ImageViewer(_ref) {
  var image = _ref.image;
  var classes = useStyles$d();
  return /*#__PURE__*/React__default.createElement("img", {
    className: classes.media,
    src: image,
    alt: "weather viewer"
  });
};

var useStyles$e = styles.makeStyles(function (theme) {
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
  return /*#__PURE__*/React__default.createElement("span", null, /*#__PURE__*/React__default.createElement(core.CssBaseline, null), /*#__PURE__*/React__default.createElement(core.Hidden, {
    smDown: true
  }, /*#__PURE__*/React__default.createElement(Tooltip, {
    open: open,
    enterTouchDelay: 0,
    title: validTime,
    placement: "top"
  }, children)), /*#__PURE__*/React__default.createElement(core.Hidden, {
    mdUp: true
  }, /*#__PURE__*/React__default.createElement(Tooltip, {
    open: open,
    enterTouchDelay: 0,
    title: validTime,
    placement: "bottom"
  }, children)));
}

var compare = function compare(a, b) {
  var valA = Number(a.value);
  var valB = Number(b.value);
  var comparison = 0;

  if (valA > valB) {
    comparison = 1;
  } else if (valA < valB) {
    comparison = -1;
  }

  return comparison;
};

var DiscreteSlider = function DiscreteSlider(_ref) {
  var options = _ref.options,
      action = _ref.action,
      selected = _ref.selected;
  var classes = useStyles$e();
  options.sort(compare);
  var stepValue = options[1].value - options[0].value;
  var maxValue = options[options.length - 1].value;
  var minValue = options[0].value;

  var handleChangeCommitted = function handleChangeCommitted(e, value) {
    action(value);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React__default.createElement(core.CssBaseline, null), /*#__PURE__*/React__default.createElement(core.Hidden, {
    xsDown: true
  }, /*#__PURE__*/React__default.createElement(Slider, {
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
  })), /*#__PURE__*/React__default.createElement(core.Hidden, {
    smUp: true
  }, /*#__PURE__*/React__default.createElement(Slider, {
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

var useTimer = function useTimer(interval) {
  var _React$useState = React__default.useState(0),
      ticks = _React$useState[0],
      setTicks = _React$useState[1];

  var _React$useState2 = React__default.useState(false),
      isRunning = _React$useState2[0],
      setIsRunning = _React$useState2[1];

  React__default.useEffect(function () {
    if (isRunning) {
      var timerId = window.setTimeout(function () {
        setTicks(ticks + 1);
      }, interval);
      return function () {
        return window.clearTimeout(timerId);
      };
    }

    return;
  }, [ticks, isRunning]);
  return [ticks, isRunning, setIsRunning];
};

var useStyles$f = core.makeStyles(function (theme) {
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
  var classes = useStyles$f();

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

  React__default.useEffect(function () {
    onToggle(isRunning);
  }, [tick]);
  return isRunning ? /*#__PURE__*/React__default.createElement(core.Fab, {
    onClick: handleClick,
    className: classes.pause
  }, /*#__PURE__*/React__default.createElement(PauseIcon, {
    className: classes.icon
  })) : /*#__PURE__*/React__default.createElement(core.Fab, {
    onClick: handleClick,
    className: classes.play
  }, /*#__PURE__*/React__default.createElement(PlayArrowIcon, {
    className: classes.icon
  }));
};

var useStyles$g = core.makeStyles(function (theme) {
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
  var classes = useStyles$g();
  return /*#__PURE__*/React__default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    item: true,
    direction: "row",
    alignItems: "center",
    justify: "center",
    wrap: "nowrap",
    spacing: 1
  }, /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true,
    xs: true,
    className: classes.offset
  }), /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true,
    xs: 3
  }, /*#__PURE__*/React__default.createElement(BackButton, {
    "data-cy": "back-button",
    action: onBack
  })), /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true,
    container: true,
    xs: true,
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(StartStopButton, {
    "data-cy": "play-button",
    onToggle: onToggle
  })), /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true,
    xs: 3
  }, /*#__PURE__*/React__default.createElement(ForwardButton, {
    "data-cy": "forward-button",
    action: onNext
  })), /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true,
    xs: true
  })));
};

var useStyles$h = core.makeStyles(function (theme) {
  return {
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
  };
});
var ValidTime = function ValidTime(_ref) {
  var time = _ref.time;
  var classes = useStyles$h();
  return /*#__PURE__*/React__default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React__default.createElement(core.CssBaseline, null), /*#__PURE__*/React__default.createElement(core.Hidden, {
    smDown: true
  }, /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    direction: "row",
    justify: "flex-end",
    alignItems: "center"
  }, /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true
  }, /*#__PURE__*/React__default.createElement(core.Typography, {
    variant: "h6"
  }, "Valid Time"), /*#__PURE__*/React__default.createElement(core.Paper, {
    className: classes.paper
  }, /*#__PURE__*/React__default.createElement(core.Typography, {
    variant: "button"
  }, time))))), /*#__PURE__*/React__default.createElement(core.Hidden, {
    mdUp: true
  }, /*#__PURE__*/React__default.createElement(core.Paper, {
    className: classes.mobilePaper
  }, /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    item: true,
    xs: 12,
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(core.Typography, {
    className: classes.text,
    variant: "h6"
  }, time)))));
};

var theme = core.createMuiTheme({
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
    }
  },
  spacing: 10
});
var options = {
  disableAlign: true,
  factor: 5
};
theme = core.responsiveFontSizes(theme, options);
var theme$1 = theme;

var ShyftContext = React__default.createContext({});
var drawerWidth$1 = 250;
var xlDrawerWidth$1 = 350;
var useStyles$i = core.makeStyles(function (theme) {
  return {
    toolbar: theme.mixins.toolbar,
    contentClass: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginLeft: drawerWidth$1
    },
    '@media (max-width: 768px)': {
      contentClass: {
        marginLeft: 0
      }
    },
    '@media (min-width: 1460px)': {
      contentClass: {
        marginLeft: xlDrawerWidth$1
      }
    }
  };
});
var ShyftWx = function ShyftWx(_ref) {
  var dataset = _ref.dataset,
      url = _ref.url,
      customer = _ref.customer,
      themeOverride = _ref.themeOverride;
  var classes = useStyles$i();

  var _React$useState = React__default.useState(true),
      loading = _React$useState[0],
      setLoading = _React$useState[1];

  var _React$useState2 = React__default.useState({
    datasets: []
  }),
      index = _React$useState2[0],
      setIndex = _React$useState2[1];

  var _React$useState3 = React__default.useState(''),
      selectedProduct = _React$useState3[0],
      setSelectedProduct = _React$useState3[1];

  var _React$useState4 = React__default.useState(''),
      selectedLevel = _React$useState4[0],
      setSelectedLevel = _React$useState4[1];

  var _React$useState5 = React__default.useState(''),
      selectedForecast = _React$useState5[0],
      setSelectedForecast = _React$useState5[1];

  var _React$useState6 = React__default.useState('');

  var _React$useState7 = React__default.useState(false),
      landingPage = _React$useState7[0],
      setLandingPage = _React$useState7[1];

  var urlParams = React__default.useRef(new URLSearchParams(window.location.search));
  customer = customer || urlParams.current.get('customer') || '';
  dataset = dataset || urlParams.current.get('model') || '';
  var customerUrl = url + "/" + customer + "/" + dataset + "/products";

  var loadAsync = function loadAsync() {
    try {
      return Promise.resolve(getIndexAsync(customerUrl)).then(function (indexData) {
        function _temp2() {
          setLoading(false);
        }

        if (!indexData || indexData.datasets.length === 0) {
          setLandingPage(true);
          return;
        }

        var i = 0;

        var _temp = _for(function () {
          return i < indexData.datasets.length;
        }, function () {
          return i++;
        }, function () {
          var dataset = indexData.datasets[i];
          var datasetRegionRun = {
            dataset: dataset.name,
            region: dataset.region,
            run: {
              name: dataset.run,
              levels: []
            }
          };
          var runRegion = dataset.run + "-" + dataset.region.name;
          var datasetUrl = customerUrl + "/" + runRegion;
          return Promise.resolve(getIndexAsync(datasetUrl)).then(function (runRegionData) {
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
                  forecasts: []
                };
              });
            });
            uniqueLevels.forEach(function (lvl) {
              lvl.products.forEach(function (product) {
                product.forecasts = items.filter(function (item) {
                  return item.level === lvl.name && item.product === product.name;
                }).map(function (item) {
                  return {
                    hour: item.forecast,
                    image: item.filename
                  };
                });
              });
            });
            datasetRegionRun.run.levels = uniqueLevels;
            var indexes = {
              datasets: [datasetRegionRun]
            };
            setIndex(indexes);

            if (i === 0) {
              setSelectedLevel(indexes.datasets[0].run.levels[0].name);
              setSelectedProduct(indexes.datasets[0].run.levels[0].products[0].name);
              setSelectedForecast(indexes.datasets[0].run.levels[0].products[0].forecasts[0].hour);
            }
          });
        });

        return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  React__default.useEffect(function () {
    if (!url) {
      setLandingPage(true);
      return;
    }

    if (!customer || !dataset) {
      setLandingPage(true);
    }

    setLoading(true);
    loadAsync();
  }, []);

  var getSelectedLevel = function getSelectedLevel() {
    return index.datasets[0].run.levels.filter(function (lvl) {
      return lvl.name === selectedLevel;
    })[0];
  };

  var getSelectedProduct = function getSelectedProduct() {
    return getSelectedLevel().products.filter(function (p) {
      return p.name === selectedProduct;
    })[0];
  };

  var onProductSelect = function onProductSelect(product) {
    setSelectedLevel(product.level);
    setSelectedProduct(product.product);
    setSelectedForecast(getSelectedProduct().forecasts[0].hour);
  };

  var onRunSelect = function onRunSelect(buttonText) {
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
      return f.hour === selectedForecast;
    });

    if (forecastIndex + 1 === forecasts.length) {
      setSelectedForecast(forecasts[0].hour);
    } else {
      setSelectedForecast(forecasts[forecastIndex + 1].hour);
    }
  };

  var onSliderNavigationBack = function onSliderNavigationBack() {
    var forecasts = getSelectedProduct().forecasts;
    forecasts.sort(compare);
    var forecastIndex = forecasts.findIndex(function (f) {
      return f.hour === selectedForecast;
    });

    if (forecastIndex - 1 < 0) {
      setSelectedForecast(forecasts[forecasts.length - 1].hour);
    } else {
      setSelectedForecast(forecasts[forecastIndex - 1].hour);
    }
  };

  var onSliderNavigation = function onSliderNavigation(value) {
    value -= +index.datasets[0].run.name;
    var forecasts = getSelectedProduct().forecasts;
    forecasts.sort(compare);
    var forecastIndex = forecasts.findIndex(function (f) {
      return +f.hour === +value;
    });
    setSelectedForecast(forecasts[forecastIndex].hour);
  };

  var onToggleToPlay = function onToggleToPlay(isRunning) {
    var forecasts = getSelectedProduct().forecasts;
    forecasts.sort(compare);

    if (!isRunning) {
      setSelectedForecast(forecasts[0].hour);
    } else {
      var forecastIndex = forecasts.findIndex(function (f) {
        return f.hour === selectedForecast;
      });

      if (selectedForecast === forecasts[forecasts.length - 1].hour) {
        setSelectedForecast(forecasts[0].hour);
      } else {
        setSelectedForecast(forecasts[forecastIndex + 1].hour);
      }
    }
  };

  var getValidTime = function getValidTime() {
    var validTime = moment.unix(+index.datasets[0].run.name + +selectedForecast).utc().format('MM/DD HH:mm[Z]');
    return validTime;
  };

  var generateContent = function generateContent() {
    if (landingPage) {
      return /*#__PURE__*/React__default.createElement(LandingPage, {
        url: url
      });
    }

    if (loading) {
      return /*#__PURE__*/React__default.createElement(core.CircularProgress, null);
    }

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
      return f.hour === selectedForecast;
    })[0].image;
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(core.Grid, {
      container: true
    }, /*#__PURE__*/React__default.createElement(ProductSelector, {
      "data-cy": "product-selector",
      categories: levelProductVals,
      action: onProductSelect
    })), /*#__PURE__*/React__default.createElement("main", {
      className: classes.contentClass
    }, /*#__PURE__*/React__default.createElement(core.Hidden, {
      smUp: true
    }, /*#__PURE__*/React__default.createElement("div", {
      className: classes.toolbar
    })), /*#__PURE__*/React__default.createElement(core.Grid, {
      container: true,
      justify: "space-between",
      spacing: 1
    }, /*#__PURE__*/React__default.createElement(core.Grid, {
      item: true,
      xs: true,
      sm: true,
      md: true
    }, /*#__PURE__*/React__default.createElement(ModelSelector, {
      "data-cy": "model-selector",
      options: [index.datasets[0].dataset],
      action: function action() {}
    })), /*#__PURE__*/React__default.createElement(core.Grid, {
      item: true,
      xs: true,
      md: true
    }, /*#__PURE__*/React__default.createElement(RegionSelector, {
      "data-cy": "region-selector",
      options: [index.datasets[0].region.name],
      action: function action() {}
    })), /*#__PURE__*/React__default.createElement(core.Grid, {
      item: true,
      xs: true,
      sm: true,
      md: true
    }, /*#__PURE__*/React__default.createElement(RunsSelector, {
      "data-cy": "runs-selector",
      options: [+index.datasets[0].run.name],
      action: onRunSelect
    })), /*#__PURE__*/React__default.createElement(core.Hidden, {
      xsDown: true
    }, /*#__PURE__*/React__default.createElement(core.Grid, {
      item: true,
      xs: 12,
      md: true
    }, /*#__PURE__*/React__default.createElement(ValidTime, {
      time: getValidTime()
    })))), /*#__PURE__*/React__default.createElement(core.Grid, {
      container: true,
      direction: "column",
      spacing: 1
    }, /*#__PURE__*/React__default.createElement(core.Grid, {
      container: true,
      justify: "center",
      item: true,
      xs: 12
    }, /*#__PURE__*/React__default.createElement(ImageViewer, {
      image: activeForecastLayer
    })), /*#__PURE__*/React__default.createElement(core.Grid, {
      container: true,
      item: true,
      justify: "center",
      alignItems: "center"
    }, /*#__PURE__*/React__default.createElement(core.Grid, {
      item: true,
      md: 3,
      sm: 5,
      xs: 5
    }, /*#__PURE__*/React__default.createElement(TimeControl, {
      "data-cy": "time-control",
      onBack: onSliderNavigationBack,
      onNext: onSliderNavigationNext,
      onToggle: onToggleToPlay
    })), /*#__PURE__*/React__default.createElement(core.Grid, {
      item: true,
      md: 9,
      sm: 11,
      xs: 12
    }, /*#__PURE__*/React__default.createElement(DiscreteSlider, {
      "data-cy": "slider",
      options: sliderVals,
      selected: +selectedForecast + +index.datasets[0].run.name,
      action: onSliderNavigation
    }))), /*#__PURE__*/React__default.createElement(core.Hidden, {
      smUp: true
    }, /*#__PURE__*/React__default.createElement(core.Grid, {
      item: true,
      xs: 12
    }, /*#__PURE__*/React__default.createElement(ValidTime, {
      time: getValidTime()
    }))))));
  };

  return /*#__PURE__*/React__default.createElement(core.MuiThemeProvider, {
    theme: themeOverride || theme$1
  }, /*#__PURE__*/React__default.createElement(ShyftContext.Provider, {
    value: {
      data: index
    }
  }, /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    direction: "row",
    justify: "center",
    alignItems: "center",
    spacing: 3
  }, generateContent())));
};

exports.BackButton = BackButton;
exports.BaseWxViewer = BaseWxViewer;
exports.ForwardButton = ForwardButton;
exports.GroupedButtons = GroupedButtons;
exports.LandingPage = LandingPage;
exports.ModelSelector = ModelSelector;
exports.ProductMenu = ProductMenu;
exports.ProductSelector = ProductSelector;
exports.RegionSelector = RegionSelector;
exports.RunsSelector = RunsSelector;
exports.ShyftWx = ShyftWx;
exports.Slider = DiscreteSlider;
exports.StartStopButton = StartStopButton;
exports.TimeControl = TimeControl;
exports.apis = index;
exports.theme = theme$1;
//# sourceMappingURL=index.js.map
