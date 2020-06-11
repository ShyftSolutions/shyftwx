function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var core = require('@material-ui/core');
var leaflet = require('leaflet');
require('leaflet/dist/leaflet.css');
var React = require('react');
var React__default = _interopDefault(React);
var reactLeaflet = require('react-leaflet');
var styles = require('@material-ui/core/styles');
var MenuItem = _interopDefault(require('@material-ui/core/MenuItem'));
var FormControl = _interopDefault(require('@material-ui/core/FormControl'));
var Select = _interopDefault(require('@material-ui/core/Select'));
var Paper = _interopDefault(require('@material-ui/core/Paper'));
var icons = require('@material-ui/icons');
var reactFontawesome = require('@fortawesome/react-fontawesome');
var NavigateBeforeIcon = _interopDefault(require('@material-ui/icons/NavigateBefore'));
var Button = _interopDefault(require('@material-ui/core/Button'));
var NavigateNextIcon = _interopDefault(require('@material-ui/icons/NavigateNext'));
var Slider = _interopDefault(require('@material-ui/core/Slider'));
var Tooltip = _interopDefault(require('@material-ui/core/Tooltip'));
var PlayArrowIcon = _interopDefault(require('@material-ui/icons/PlayArrow'));
var PauseIcon = _interopDefault(require('@material-ui/icons/Pause'));

var useStyles = core.makeStyles(function (theme) {
  return {
    root: {
      height: '70vh',
      width: '70vw'
    },
    paddingMiddle: {
      marginLeft: 15,
      marginBottom: 20,
      marginTop: 15
    }
  };
});
var BaseWxViewer = function BaseWxViewer(_ref) {
  var neBounds = _ref.neBounds,
      swBounds = _ref.swBounds;
  var classes = useStyles();
  var bounds = leaflet.latLngBounds(swBounds, neBounds);
  return /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true,
    xs: 9
  }, /*#__PURE__*/React__default.createElement(reactLeaflet.Map, {
    zoom: 10,
    bounds: bounds,
    className: classes.root,
    dragging: false,
    zoomControl: false,
    scrollWheelZoom: false
  }, /*#__PURE__*/React__default.createElement(reactLeaflet.ImageOverlay, {
    url: 'https://wxchange-images.s3.us-east-2.amazonaws.com/GFS_2020-05-27T06_Temperature_US_850hPa_01.png.PNG',
    bounds: bounds,
    opacity: 0.5
  }), /*#__PURE__*/React__default.createElement(reactLeaflet.TileLayer, {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "\xA9 <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"
  })));
};

var useStyles$1 = core.makeStyles(function (theme) {
  return {
    root: {
      margin: 0,
      boxShadow: theme.shadows[3]
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
var GroupedButtons = function GroupedButtons(Props) {
  var classes = useStyles$1();
  var options = Props.options,
      action = Props.action;

  var _useState = React.useState(options[0]),
      selected = _useState[0],
      setSelected = _useState[1];

  var handleClick = function handleClick(index) {
    setSelected(index);
    action(index);
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

var useStyles$2 = styles.makeStyles(function (theme) {
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
function SimpleSelect(Props) {
  var classes = useStyles$2();
  var options = Props.options;
  var action = Props.action;

  var _React$useState = React__default.useState({
    modelRun: {},
    name: 'Selector'
  }),
      state = _React$useState[0],
      setState = _React$useState[1];

  var handleChange = function handleChange(event) {
    var _extends2;

    var name = event.target.name;
    setState(_extends({}, state, (_extends2 = {}, _extends2[name] = event.target.value, _extends2)));
    action(event.target.value);
  };

  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(FormControl, {
    variant: "outlined",
    className: classes.formControl
  }, /*#__PURE__*/React__default.createElement(Select, {
    classes: {
      select: classes.dropdown
    },
    id: "simple-select",
    defaultValue: options[0],
    onChange: handleChange
  }, options.map(function (option) {
    return /*#__PURE__*/React__default.createElement(MenuItem, {
      color: "primary",
      key: option,
      className: classes.items,
      value: option
    }, option);
  }))));
}

var useStyles$3 = core.makeStyles(function (theme) {
  return {
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
  };
});
var ProductMenu = function ProductMenu(Props) {
  var classes = useStyles$3();
  var options = Props.options;
  var action = Props.action;

  var _React$useState = React__default.useState(""),
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
    setSelectedProduct(product);
    action(product);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: classes.root
  }, categories.map(function (cat, index) {
    return /*#__PURE__*/React__default.createElement(core.List, {
      key: index
    }, /*#__PURE__*/React__default.createElement(Paper, {
      className: classes.category
    }, /*#__PURE__*/React__default.createElement(core.ListItem, {
      button: true,
      onClick: function onClick() {
        return handleClick(cat);
      }
    }, /*#__PURE__*/React__default.createElement(core.ListItemText, {
      disableTypography: true,
      primary: /*#__PURE__*/React__default.createElement(core.Typography, null, /*#__PURE__*/React__default.createElement(core.Box, {
        fontWeight: 800,
        m: 1,
        letterSpacing: 1,
        fontSize: 16
      }, cat.name))
    }), cat.open ? /*#__PURE__*/React__default.createElement(icons.ExpandLess, null) : /*#__PURE__*/React__default.createElement(icons.ExpandMore, null))), /*#__PURE__*/React__default.createElement(Paper, null, /*#__PURE__*/React__default.createElement(core.Collapse, {
      "in": cat.open,
      timeout: "auto",
      unmountOnExit: true
    }, cat.products.map(function (product) {
      return /*#__PURE__*/React__default.createElement(core.ListItem, {
        button: true,
        className: classes.nested,
        selected: selectedProduct === cat.name + ' ' + product.name,
        onClick: function onClick(event) {
          return handleListItemClick(event, cat.name + ' ' + product.name);
        }
      }, /*#__PURE__*/React__default.createElement(core.ListItemIcon, null, product.icon != undefined && /*#__PURE__*/React__default.createElement(reactFontawesome.FontAwesomeIcon, {
        className: selectedProduct === cat.name + ' ' + product.name ? classes.selectedIcon : classes.icon,
        icon: product.icon
      })), /*#__PURE__*/React__default.createElement(core.ListItemText, {
        primary: product.name
      }));
    }))));
  }));
};

var ProductSelector = function ProductSelector(Props) {
  var options = Props.options;
  var action = Props.action;
  var label = Props.label;
  return /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    direction: "column"
  }, /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true
  }, /*#__PURE__*/React__default.createElement(core.Typography, {
    variant: "h6"
  }, label)), /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true
  }, /*#__PURE__*/React__default.createElement(ProductMenu, {
    options: options,
    action: action
  })));
};

var useStyles$4 = core.makeStyles(function (theme) {
  return {
    root: {
      maxWidth: '35px',
      maxHeight: '30px',
      minWidth: '35px',
      minHeight: '30px',
      variant: 'contained',
      backgroundColor: theme.palette.primary.dark,
      boxShadow: theme.shadows[3],
      '&:hover': {
        backgroundColor: theme.palette.primary.dark
      },
      ariaLabel: "back"
    },
    icon: {
      color: theme.palette.primary.contrastText
    }
  };
});
function BackButton() {
  var classes = useStyles$4();
  return /*#__PURE__*/React__default.createElement(Button, {
    className: classes.root
  }, /*#__PURE__*/React__default.createElement(NavigateBeforeIcon, {
    className: classes.icon
  }));
}

var useStyles$5 = core.makeStyles(function (theme) {
  return {
    root: {
      maxWidth: '35px',
      maxHeight: '30px',
      minWidth: '35px',
      minHeight: '30px',
      variant: 'contained',
      backgroundColor: theme.palette.primary.dark,
      boxShadow: theme.shadows[3],
      '&:hover': {
        backgroundColor: theme.palette.primary.dark
      },
      ariaLabel: "forward"
    },
    icon: {
      color: theme.palette.primary.contrastText
    }
  };
});
function ForwardButton() {
  var classes = useStyles$5();
  return /*#__PURE__*/React__default.createElement(core.Button, {
    className: classes.root
  }, /*#__PURE__*/React__default.createElement(NavigateNextIcon, {
    className: classes.icon
  }));
}

var useStyles$6 = styles.makeStyles(function (theme) {
  return {
    root: {
      width: 600,
      color: theme.palette.primary.dark,
      height: 20,
      margin: 0
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: theme.palette.primary.contrastText,
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit'
      }
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)'
    },
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
      padding: 12
    },
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
  return /*#__PURE__*/React__default.createElement("span", null, /*#__PURE__*/React__default.createElement(Tooltip, {
    open: open,
    enterTouchDelay: 0,
    placement: "top",
    title: value + ' + Model Run'
  }, children));
}

var DiscreteSlider = function DiscreteSlider(Props) {
  var options = Props.options;
  var classes = useStyles$6();
  var stepValue = options[1].value - options[0].value;
  var defaultValue = options[0].value;
  var maxValue = options[options.length - 1].value;

  return /*#__PURE__*/React__default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React__default.createElement(Slider, {
    classes: classes,
    valueLabelDisplay: "auto",
    "aria-label": "pretty slider",
    track: false,
    step: stepValue,
    marks: options,
    defaultValue: defaultValue,
    max: maxValue,
    ValueLabelComponent: ValueLabelComponent
  }));
};

var useStyles$7 = core.makeStyles(function (theme) {
  return {
    play: {
      label: 'play',
      boxShadow: theme.shadows[3],
      background: theme.palette.secondary.dark,
      '&:hover': {
        background: theme.palette.secondary.dark
      }
    },
    pause: {
      label: 'pause',
      boxShadow: theme.shadows[3],
      background: theme.palette.secondary.dark,
      '&:hover': {
        background: theme.palette.secondary.dark
      }
    },
    icon: {
      color: theme.palette.primary.contrastText
    }
  };
});
var StartStopButton = function StartStopButton() {
  var classes = useStyles$7();

  var _useState = React.useState(false),
      playing = _useState[0],
      setPlaying = _useState[1];

  var handleClick = function handleClick() {
    if (playing) {
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  };

  return playing ? /*#__PURE__*/React__default.createElement(core.Fab, {
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

function TimeControl() {
  return /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    direction: "row",
    justify: "flex-start",
    alignItems: "center",
    spacing: 1
  }, /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true
  }, /*#__PURE__*/React__default.createElement(BackButton, null)), /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true
  }, /*#__PURE__*/React__default.createElement(StartStopButton, null)), /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true
  }, /*#__PURE__*/React__default.createElement(ForwardButton, null)));
}

var getIndexAsync = function getIndexAsync(url) {
  return fetch(url).then(function (response) {
    return response.json();
  });
};

var index = {
    __proto__: null,
    getIndexAsync: getIndexAsync
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
      light: '#e9ecef',
      main: '#ff922b',
      dark: '#868e96',
      contrastText: '#474545'
    }
  },
  overrides: {
    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: '#E9ECEF',
          '&:hover': {
            backgroundColor: '#E9ECEF'
          },
          color: '#868e96'
        }
      }
    },
    MuiListItemIcon: {
      root: {
        color: '#000000'
      }
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#329af0',
        color: '#f8f9fa',
        fontSize: 16
      }
    }
  },
  spacing: 8
});

var ShyftWx = function ShyftWx(_ref) {
  var children = _ref.children,
      indexData = _ref.indexData,
      indexUrl = _ref.indexUrl,
      themeOverride = _ref.themeOverride;

  var _useState = React.useState(''),
      error = _useState[0],
      setError = _useState[1];

  var _useState2 = React.useState(true),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = React.useState(),
      index = _useState3[0],
      setIndex = _useState3[1];

  React__default.useEffect(function () {
    if (indexUrl) {
      getIndexAsync(indexUrl).then(function (data) {
        setIndex(data);
        setLoading(false);
      });
    } else if (indexData) {
      setIndex(indexData);
      setLoading(false);
    } else {
      setError('No indexUrl or indexData provided.');
    }
  }, []);

  if (error) {
    return /*#__PURE__*/React__default.createElement("p", null, error);
  }

  if (loading) {
    return /*#__PURE__*/React__default.createElement("p", null, "LOADING");
  }

  return /*#__PURE__*/React__default.createElement(core.MuiThemeProvider, {
    theme: themeOverride || theme
  }, /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    direction: "row",
    justify: "flex-end",
    alignItems: "flex-start",
    spacing: 3
  }, React.Children.map(children, function (child) {
    return React.cloneElement(child, {
      index: index
    });
  })));
};

var ShyftModel = function ShyftModel(Props) {
  var options = Props.options;
  var label = Props.label;

  var handleClick = function handleClick(index) {
    console.log("clicked " + index);
  };

  return (
    /*#__PURE__*/
    React__default.createElement(core.Grid, {
      container: true,
      direction: "column"
    }, /*#__PURE__*/React__default.createElement(core.Grid, {
      item: true
    }, /*#__PURE__*/React__default.createElement(core.Typography, {
      variant: "h6"
    }, label)), /*#__PURE__*/React__default.createElement(core.Grid, {
      item: true
    }, /*#__PURE__*/React__default.createElement(GroupedButtons, {
      options: options,
      action: handleClick
    })))
  );
};

var RegionSelector = function RegionSelector(Props) {
  var options = Props.options;
  var label = Props.label;

  var handleClick = function handleClick(index) {
    console.log("clicked " + index);
  };

  return (
    /*#__PURE__*/
    React__default.createElement(core.Grid, {
      container: true,
      direction: "column"
    }, /*#__PURE__*/React__default.createElement(core.Grid, {
      item: true
    }, /*#__PURE__*/React__default.createElement(core.Typography, {
      variant: "h6"
    }, label)), /*#__PURE__*/React__default.createElement(core.Grid, {
      item: true
    }, /*#__PURE__*/React__default.createElement(GroupedButtons, {
      options: options,
      action: handleClick
    })))
  );
};

var RunDropdown = function RunDropdown(props) {
  var options = props.options,
      label = props.label;

  var handleClick = function handleClick(index) {
    console.log("clicked " + index);
  };

  return /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    direction: "column"
  }, /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true
  }, /*#__PURE__*/React__default.createElement(core.Typography, {
    variant: "h6"
  }, label)), /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true
  }, /*#__PURE__*/React__default.createElement(SimpleSelect, {
    options: options,
    action: handleClick
  })));
};

exports.BackButton = BackButton;
exports.BaseWxViewer = BaseWxViewer;
exports.ForwardButton = ForwardButton;
exports.GroupedButtons = GroupedButtons;
exports.ProductMenu = ProductMenu;
exports.ProductSelector = ProductSelector;
exports.RegionSelector = RegionSelector;
exports.RunDropdown = RunDropdown;
exports.ShyftModel = ShyftModel;
exports.ShyftWx = ShyftWx;
exports.SimpleSelect = SimpleSelect;
exports.Slider = DiscreteSlider;
exports.StartStopButton = StartStopButton;
exports.TimeControl = TimeControl;
exports.apis = index;
exports.theme = theme;
//# sourceMappingURL=index.js.map
