import React, { useState } from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Button from '@material-ui/core/Button';
import { makeStyles, Grid, Button as Button$1, ButtonGroup, Typography, List, ListItem, ListItemText, Box, Collapse, ListItemIcon, createMuiTheme, MuiThemeProvider, CircularProgress, Fab } from '@material-ui/core';
import { latLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, ImageOverlay, TileLayer } from 'react-leaflet';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Paper from '@material-ui/core/Paper';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles as makeStyles$1 } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

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

var useStyles = makeStyles(function (theme) {
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
  var classes = useStyles();
  return /*#__PURE__*/React.createElement(Button, {
    className: classes.root
  }, /*#__PURE__*/React.createElement(NavigateBeforeIcon, {
    className: classes.icon
  }));
}

var useStyles$1 = makeStyles(function (theme) {
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
  var classes = useStyles$1();
  var bounds = latLngBounds(swBounds, neBounds);
  return /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 9
  }, /*#__PURE__*/React.createElement(Map, {
    zoom: 10,
    bounds: bounds,
    className: classes.root,
    dragging: false,
    zoomControl: false,
    scrollWheelZoom: false
  }, /*#__PURE__*/React.createElement(ImageOverlay, {
    url: 'https://wxchange-images.s3.us-east-2.amazonaws.com/GFS_2020-05-27T06_Temperature_US_850hPa_01.png.PNG',
    bounds: bounds,
    opacity: 0.5
  }), /*#__PURE__*/React.createElement(TileLayer, {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "\xA9 <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"
  })));
};

var useStyles$2 = makeStyles(function (theme) {
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
  var classes = useStyles$2();
  return /*#__PURE__*/React.createElement(Button$1, {
    className: classes.root
  }, /*#__PURE__*/React.createElement(NavigateNextIcon, {
    className: classes.icon
  }));
}

var useStyles$3 = makeStyles(function (theme) {
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
var GroupedButtons = function GroupedButtons(_ref) {
  var options = _ref.options,
      action = _ref.action;
  var classes = useStyles$3();

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
    return /*#__PURE__*/React.createElement(Button$1, {
      key: option,
      name: "group-button",
      onClick: function onClick() {
        return handleClick(option);
      },
      className: selected === option ? classes.selectedButton : classes.defaultButton
    }, option);
  }));
};

var ModelSelector = function ModelSelector(_ref) {
  var options = _ref.options,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? 'Model' : _ref$label;

  var handleClick = function handleClick(index) {
    console.log("clicked " + index);
  };

  return (
    /*#__PURE__*/
    React.createElement(Grid, {
      container: true,
      direction: "column"
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true
    }, /*#__PURE__*/React.createElement(Typography, {
      variant: "h6"
    }, label)), /*#__PURE__*/React.createElement(Grid, {
      item: true
    }, /*#__PURE__*/React.createElement(GroupedButtons, {
      options: options,
      action: handleClick
    })))
  );
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

var useStyles$4 = makeStyles(function (theme) {
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
  var classes = useStyles$4();
  var options = Props.options;
  var action = Props.action;

  var _React$useState = React.useState(""),
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
    setSelectedProduct(product);
    action(product);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, categories.map(function (cat, index) {
    return /*#__PURE__*/React.createElement(List, {
      key: index
    }, /*#__PURE__*/React.createElement(Paper, {
      className: classes.category
    }, /*#__PURE__*/React.createElement(ListItem, {
      button: true,
      onClick: function onClick() {
        return handleClick(cat);
      }
    }, /*#__PURE__*/React.createElement(ListItemText, {
      disableTypography: true,
      primary: /*#__PURE__*/React.createElement(Typography, null, /*#__PURE__*/React.createElement(Box, {
        fontWeight: 800,
        m: 1,
        letterSpacing: 1,
        fontSize: 16
      }, cat.name))
    }), cat.open ? /*#__PURE__*/React.createElement(ExpandLess, null) : /*#__PURE__*/React.createElement(ExpandMore, null))), /*#__PURE__*/React.createElement(Paper, null, /*#__PURE__*/React.createElement(Collapse, {
      "in": cat.open,
      timeout: "auto",
      unmountOnExit: true
    }, cat.products.map(function (product) {
      return /*#__PURE__*/React.createElement(ListItem, {
        button: true,
        className: classes.nested,
        selected: selectedProduct === cat.name + ' ' + product.name,
        onClick: function onClick(event) {
          return handleListItemClick(event, cat.name + ' ' + product.name);
        }
      }, /*#__PURE__*/React.createElement(ListItemIcon, null, product.icon != undefined && /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        className: selectedProduct === cat.name + ' ' + product.name ? classes.selectedIcon : classes.icon,
        icon: product.icon
      })), /*#__PURE__*/React.createElement(ListItemText, {
        primary: product.name
      }));
    }))));
  }));
};

var ProductSelector = function ProductSelector(_ref) {
  var categories = _ref.categories,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? 'Products' : _ref$label,
      action = _ref.action;
  return /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "column"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h6"
  }, label)), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ProductMenu, {
    options: categories,
    action: action
  })));
};

var RegionSelector = function RegionSelector(_ref) {
  var options = _ref.options,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? 'Region' : _ref$label;

  var handleClick = function handleClick(index) {
    console.log("clicked " + index);
  };

  return (
    /*#__PURE__*/
    React.createElement(Grid, {
      container: true,
      direction: "column"
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true
    }, /*#__PURE__*/React.createElement(Typography, {
      variant: "h6"
    }, label)), /*#__PURE__*/React.createElement(Grid, {
      item: true
    }, /*#__PURE__*/React.createElement(GroupedButtons, {
      options: options,
      action: handleClick
    })))
  );
};

var useStyles$5 = makeStyles$1(function (theme) {
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
  var options = _ref.options,
      action = _ref.action;
  var classes = useStyles$5();

  var _React$useState = React.useState(options[0]),
      selectedValue = _React$useState[0],
      setSelectedValue = _React$useState[1];

  var handleChange = function handleChange(event) {
    var name = event.target.name;

    if (name) {
      setSelectedValue(name);
      action(name);
    }
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormControl, {
    variant: "outlined",
    className: classes.formControl
  }, /*#__PURE__*/React.createElement(Select, {
    classes: {
      select: classes.dropdown
    },
    id: "simple-select",
    value: selectedValue,
    onChange: handleChange
  }, options.map(function (option) {
    return /*#__PURE__*/React.createElement(MenuItem, {
      color: "primary",
      key: option,
      className: classes.items,
      value: option
    }, option);
  }))));
};

var RunDropdown = function RunDropdown(_ref) {
  var options = _ref.options,
      label = _ref.label;

  var handleClick = function handleClick(index) {
    console.log("clicked " + index);
  };

  return /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "column"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h6"
  }, label)), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(SimpleSelect, {
    options: options,
    action: handleClick
  })));
};

var theme = createMuiTheme({
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

var ShyftContext = React.createContext({});
var ShyftWx = function ShyftWx(_ref) {
  var children = _ref.children,
      indexData = _ref.indexData,
      indexUrl = _ref.indexUrl,
      themeOverride = _ref.themeOverride;

  var _React$useState = React.useState(''),
      error = _React$useState[0],
      setError = _React$useState[1];

  var _React$useState2 = React.useState(true),
      loading = _React$useState2[0],
      setLoading = _React$useState2[1];

  var _React$useState3 = React.useState(),
      index = _React$useState3[0],
      setIndex = _React$useState3[1];

  React.useEffect(function () {
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

  var generateContent = function generateContent() {
    if (error) {
      return /*#__PURE__*/React.createElement(Typography, {
        color: "error"
      }, error);
    }

    if (loading) {
      return /*#__PURE__*/React.createElement(CircularProgress, null);
    }

    return children;
  };

  return /*#__PURE__*/React.createElement(MuiThemeProvider, {
    theme: themeOverride || theme
  }, /*#__PURE__*/React.createElement(ShyftContext.Provider, {
    value: {
      data: index
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row",
    justify: "flex-end",
    alignItems: "flex-start",
    spacing: 3
  }, generateContent())));
};

var useStyles$6 = makeStyles$1(function (theme) {
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
  return /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Tooltip, {
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

  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement(Slider, {
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

var useStyles$7 = makeStyles(function (theme) {
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

  var _useState = useState(false),
      playing = _useState[0],
      setPlaying = _useState[1];

  var handleClick = function handleClick() {
    if (playing) {
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  };

  return playing ? /*#__PURE__*/React.createElement(Fab, {
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

function TimeControl() {
  return /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row",
    justify: "flex-start",
    alignItems: "center",
    spacing: 1
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(BackButton, null)), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(StartStopButton, null)), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ForwardButton, null)));
}

export { BackButton, BaseWxViewer, ForwardButton, GroupedButtons, ModelSelector, ProductMenu, ProductSelector, RegionSelector, RunDropdown, ShyftWx, SimpleSelect, DiscreteSlider as Slider, StartStopButton, TimeControl, index as apis, theme };
//# sourceMappingURL=index.modern.js.map
