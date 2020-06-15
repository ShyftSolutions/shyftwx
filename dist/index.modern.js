import React, { useState } from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Button from '@material-ui/core/Button';
import { makeStyles, Button as Button$1, ButtonGroup, Grid, Typography, List, ListItem, ListItemText, Box, Collapse, ListItemIcon, Fab, createMuiTheme, MuiThemeProvider, CircularProgress } from '@material-ui/core';
import 'leaflet/dist/leaflet.css';
import { Map, ImageOverlay, TileLayer } from 'react-leaflet';
import { latLngBounds } from 'leaflet';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Paper from '@material-ui/core/Paper';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles as makeStyles$1 } from '@material-ui/core/styles';
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
      maxWidth: '200%',
      maxHeight: '100%',
      minWidth: '100%',
      minHeight: '100%',
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
var BackButton = function BackButton(_ref) {
  var action = _ref.action;
  var classes = useStyles();
  return /*#__PURE__*/React.createElement(Button, {
    onClick: action,
    className: classes.root
  }, /*#__PURE__*/React.createElement(NavigateBeforeIcon, {
    className: classes.icon
  }));
};

var useStyles$1 = makeStyles(function (theme) {
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
  var bounds = latLngBounds(swBounds, neBounds);
  return /*#__PURE__*/React.createElement(Map, {
    zoom: 10,
    bounds: bounds,
    className: classes.root,
    dragging: false,
    zoomControl: false,
    scrollWheelZoom: true,
    doubleClickZoom: false,
    keyboard: false,
    touchZoom: false
  }, /*#__PURE__*/React.createElement(ImageOverlay, {
    url: layers,
    bounds: bounds,
    opacity: 0.5
  }), /*#__PURE__*/React.createElement(TileLayer, {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "\xA9 <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"
  }));
};

var useStyles$2 = makeStyles(function (theme) {
  return {
    root: {
      maxWidth: '100%',
      maxHeight: '100%',
      minWidth: '100%',
      minHeight: '100%',
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
var ForwardButton = function ForwardButton(_ref) {
  var action = _ref.action;
  var classes = useStyles$2();
  return /*#__PURE__*/React.createElement(Button$1, {
    onClick: action,
    className: classes.root
  }, /*#__PURE__*/React.createElement(NavigateNextIcon, {
    className: classes.icon
  }));
};

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
  var _ref$options = _ref.options,
      options = _ref$options === void 0 ? ['1', '2', '3'] : _ref$options,
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
  var classes = useStyles$4();

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
      primary: /*#__PURE__*/React.createElement(Box, {
        m: 1
      }, /*#__PURE__*/React.createElement(Typography, {
        style: {
          fontWeight: 800,
          fontSize: 16,
          letterSpacing: 1
        }
      }, cat.name))
    }), cat.open ? /*#__PURE__*/React.createElement(ExpandLess, null) : /*#__PURE__*/React.createElement(ExpandMore, null))), /*#__PURE__*/React.createElement(Paper, null, /*#__PURE__*/React.createElement(Collapse, {
      "in": cat.open,
      timeout: "auto",
      unmountOnExit: true
    }, cat.products.map(function (product, index) {
      return /*#__PURE__*/React.createElement(ListItem, {
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
      }, product.icon != undefined && /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
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
      item: true,
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

var toDates = function toDates(options) {
  var dates = [];
  options.map(function (option) {
    var epoch = option * 1000;
    var date = new Date(epoch);
    var time = date.getUTCFullYear() + "-" + date.getUTCMonth() + "-" + date.getUTCDay() + "T " + date.getUTCHours() + ":" + date.getUTCMinutes() + "Z";
    dates.push(time);
  });
  return dates;
};

var RunsSelector = function RunsSelector(_ref) {
  var options = _ref.options,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? 'Runs' : _ref$label;

  var handleClick = function handleClick(index) {
    console.log("clicked " + index);
  };

  var dates = toDates(options);
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
      options: dates,
      action: handleClick
    })))
  );
};

var RunDropdown = function RunDropdown(_ref) {
  var options = _ref.options,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? 'Model Run' : _ref$label;

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
  }, /*#__PURE__*/React.createElement(RunsSelector, {
    options: options,
    action: handleClick
  })));
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

var useStyles$5 = makeStyles$1(function (theme) {
  return {
    root: {
      color: theme.palette.primary.dark,
      height: 20
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

var toHour = function toHour(options) {
  options.map(function (option) {
    option.label /= 360;
  });
};

var DiscreteSlider = function DiscreteSlider(Props) {
  var classes = useStyles$5();
  var options = Props.options;
  options.sort(compare);
  toHour(options);
  var stepValue = Number(options[1].value) - Number(options[0].value);
  var defaultValue = Number(options[0].value);
  var maxValue = Number(options[options.length - 1].value);
  console.log(stepValue);

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

var useStyles$6 = makeStyles(function (theme) {
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
var StartStopButton = function StartStopButton(_ref) {
  var onStart = _ref.onStart,
      onStop = _ref.onStop;
  var classes = useStyles$6();

  var _useState = useState(false),
      playing = _useState[0],
      setPlaying = _useState[1];

  var handleClick = function handleClick() {
    if (playing) {
      setPlaying(false);
      onStart();
    } else {
      setPlaying(true);
      onStop();
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

var TimeControl = function TimeControl(_ref) {
  var onBack = _ref.onBack,
      onNext = _ref.onNext,
      onPlay = _ref.onPlay,
      onPause = _ref.onPause;
  return /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row",
    alignItems: "center",
    spacing: 1
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(BackButton, {
    action: onBack
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(StartStopButton, {
    onStart: onPlay,
    onStop: onPause
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ForwardButton, {
    action: onNext
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
  var dataset = _ref.dataset,
      url = _ref.url,
      customer = _ref.customer,
      themeOverride = _ref.themeOverride;

  var _React$useState = React.useState(''),
      error = _React$useState[0],
      setError = _React$useState[1];

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

  var customerUrl = url + "/" + customer + "/" + dataset;

  var loadAsync = function loadAsync() {
    try {
      return Promise.resolve(getIndexAsync(customerUrl)).then(function (indexData) {
        function _temp2() {
          setLoading(false);
        }

        if (!indexData || indexData.datasets.length === 0) {
          setError('No datasets available.');
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
                  return item.level === lvl.name && item.product == product.name;
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

  React.useEffect(function () {
    if (!url) {
      setError('No indexUrl or indexData provided.');
      return;
    }

    setLoading(true);
    loadAsync();
  }, []);

  var getSelectedLevel = function getSelectedLevel() {
    return index.datasets[0].run.levels.filter(function (lvl) {
      return lvl.name == selectedLevel;
    })[0];
  };

  var getSelectedProduct = function getSelectedProduct() {
    return getSelectedLevel().products.filter(function (p) {
      return p.name == selectedProduct;
    })[0];
  };

  var onProductSelect = function onProductSelect(product) {
    setSelectedLevel(product.level);
    setSelectedProduct(product.product);
    setSelectedForecast(getSelectedProduct().forecasts[0].hour);
  };

  var onSliderNavigationNext = function onSliderNavigationNext() {
    var forecasts = getSelectedProduct().forecasts;
    var forecastIndex = forecasts.findIndex(function (f) {
      return f.hour === selectedForecast;
    });

    if (forecastIndex + 1 == forecasts.length) {
      return;
    }

    setSelectedForecast(forecasts[forecastIndex + 1].hour);
  };

  var onSliderNavigationBack = function onSliderNavigationBack() {
    var forecasts = getSelectedProduct().forecasts;
    var forecastIndex = forecasts.findIndex(function (f) {
      return f.hour === selectedForecast;
    });

    if (forecastIndex - 1 < 0) {
      return;
    }

    setSelectedForecast(forecasts[forecastIndex - 1].hour);
  };

  var getOffset = function getOffset() {
    return /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: 3
    });
  };

  var generateContent = function generateContent() {
    if (error) {
      return /*#__PURE__*/React.createElement(Typography, {
        color: "error"
      }, error);
    }

    if (loading) {
      return /*#__PURE__*/React.createElement(CircularProgress, null);
    }

    var selectedProduct = getSelectedProduct();
    var levelProductVals = index.datasets[0].run.levels.map(function (lvl, index) {
      return {
        name: lvl.name,
        open: index == 0,
        products: lvl.products
      };
    });
    var sliderVals = selectedProduct.forecasts.map(function (f) {
      return {
        label: f.hour,
        value: f.hour
      };
    });
    var activeForecastLayer = selectedProduct.forecasts.filter(function (f) {
      return f.hour === selectedForecast;
    })[0].image;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Grid, {
      container: true,
      item: true
    }, /*#__PURE__*/React.createElement(Grid, {
      container: true,
      item: true
    }, getOffset(), /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: 3
    }, /*#__PURE__*/React.createElement(ModelSelector, {
      options: [index.datasets[0].dataset],
      action: function action() {}
    })), /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: 3
    }, /*#__PURE__*/React.createElement(RegionSelector, {
      options: [index.datasets[0].region.name],
      action: function action() {}
    })), /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: 3
    }, /*#__PURE__*/React.createElement(RunsSelector, {
      options: [index.datasets[0].run.name],
      action: function action() {}
    })))), /*#__PURE__*/React.createElement(Grid, {
      container: true,
      item: true,
      xs: 3
    }, /*#__PURE__*/React.createElement(Grid, {
      container: true,
      item: true
    }, /*#__PURE__*/React.createElement(ProductSelector, {
      categories: levelProductVals,
      action: onProductSelect
    }))), /*#__PURE__*/React.createElement(Grid, {
      container: true,
      xs: 9
    }, /*#__PURE__*/React.createElement(Grid, {
      container: true,
      item: true,
      xs: 12
    }, /*#__PURE__*/React.createElement(BaseWxViewer, {
      layers: activeForecastLayer,
      neBounds: [index.datasets[0].region.bbox.ymax, index.datasets[0].region.bbox.xmax],
      swBounds: [index.datasets[0].region.bbox.ymin, index.datasets[0].region.bbox.xmin]
    })), /*#__PURE__*/React.createElement(Grid, {
      container: true,
      item: true,
      xs: 12
    }, /*#__PURE__*/React.createElement(Grid, {
      container: true,
      item: true,
      xs: 2
    }, /*#__PURE__*/React.createElement(TimeControl, {
      onBack: onSliderNavigationBack,
      onNext: onSliderNavigationNext,
      onPlay: function onPlay() {},
      onPause: function onPause() {}
    })), /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: 1
    }), /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: 9
    }, /*#__PURE__*/React.createElement(DiscreteSlider, {
      options: sliderVals
    })))));
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

export { BackButton, BaseWxViewer, ForwardButton, GroupedButtons, ModelSelector, ProductMenu, ProductSelector, RegionSelector, RunDropdown, ShyftWx, RunsSelector as SimpleSelect, DiscreteSlider as Slider, StartStopButton, TimeControl, index as apis, theme };
//# sourceMappingURL=index.modern.js.map
